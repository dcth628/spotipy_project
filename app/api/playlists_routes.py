from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import Playlist, Like, Song, db
from app.models.song_playlist import SongPlaylist, db
from app.forms.playlist_form import PlaylistForm;


playlists_routes = Blueprint('playlists', __name__)

#Get all playlists
@playlists_routes.route('')
def all_playlists():
    playlists = Playlist.query.all()
    return {playlist.id: playlist.to_dict() for playlist in playlists}

# Get all playlist for the current user.
@playlists_routes.route('/current')
@login_required
def user_playlist():
    """
    Queries for all playlist for the user and returns them in a list of playlists dictionaries
    """
    user_id = current_user.id
    playlists = Playlist.query.filter_by(owner_id = user_id)
    return {playlist.id: playlist.to_dict() for playlist in playlists}


# Get details of a playlist by the id
@playlists_routes.route('/<int:id>')
def playlist_details(id):

    """
    Queries for a playlist using the id and returns the detials in a dictionary.
    """
    playlist = Playlist.query.get(id)
    return playlist.to_dict()

# Create a playlist
@playlists_routes.route('/new', methods=['POST'])
@login_required
def create_playlist():
    """
    Creates a new playlist and redirects them to the playlist details
    """
    form = PlaylistForm()
    owner_id = current_user.get_id()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_playlist = Playlist(
            playlist_name = form.data['playlist_name'],
            owner_id = owner_id
        )
        db.session.add(new_playlist)
        db.session.commit()
        return new_playlist.to_dict()


# Update a playlist
@playlists_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_playlist(id):
    """
    Query for a playlist based off playlist id and make changes.
    """

    form = PlaylistForm()
    playlist = Playlist.query.get_or_404(id)


    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        playlist.playlist_name = form.data['playlist_name']

        db.session.commit()
        return playlist.to_dict()


# Delete a playlist
@playlists_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def deletePlaylist(id):
    """
    Query for playlist by id and remove from database
    """
    playlist = Playlist.query.get(id)
    playlist.songs_playlist.clear()
    db.session.delete(playlist)
    db.session.commit()

    return playlist.to_dict()


# Like/Get all likes for a playlist.

@playlists_routes.route('/<int:id>/likes', methods=['GET', 'POST'])
@login_required
def like_playlist(id):
    user_id = current_user.get_id()
    playlist = Playlist.query.select_from(Like).filter(Like.likable_type == 'playlist', Like.likable_id == id, Like.user_id == user_id).first()

    if playlist and request.method == 'GET':
        if playlist:
            return playlist.to_dict()

    if playlist and request.method == 'POST':
        return {"error": "You have liked this playlist"}

    liked_playlist = Like(
        user_id = user_id,
        likable_type = 'playlist',
        likable_id = id
    )

    db.session.add(liked_playlist)
    db.session.commit()
    return liked_playlist.to_dict()

# unlike a playlist
@playlists_routes.route('/<int:id>/likes', methods=['DELETE'])
@login_required
def delete_like_playlist(id):
    user_id = current_user.get_id()
    liked_playlist = Like.query.select_from(Playlist).filter(Playlist.id == id, Like.likable_type == 'playlist', Like.likable_id == id, Like.user_id == user_id).first()

    if liked_playlist:
        db.session.delete(liked_playlist)
        db.session.commit()
        return liked_playlist.to_dict()

    return playlist_details(id)

# ROUTE TO PULL SONGS IN LIST FOR THE PLAYER
@playlists_routes.route('<int:playlist_id>/player')
@login_required
def player_route(playlist_id):
    playlist = Playlist.query.get(playlist_id)

    if (playlist):
        return playlist.player_dict()

    return 'Playlist not found'

# Remove playlist song by id.
@playlists_routes.route('/<int:playlist_id>/songs/<int:song_id>', methods=['DELETE'])
@login_required
def remove_playlist_song(playlist_id, song_id):
    song_playlist = SongPlaylist.query.get(song_id)

    if not song_playlist:
        return jsonify({'error': 'Song not found in playlist.'}), 404

    db.session.delete(song_playlist)
    db.session.commit()
    return {'message': 'Sucessfully Deleted'}

@playlists_routes.route('/<int:playlist_id>/songs/<int:song_id>', methods=['POST'])
@login_required
def add_playlist_song(playlist_id, song_id):
    playlist = Playlist.query.get(playlist_id)
    song = Song.query.get(song_id)

    if not playlist or not song:
        return jsonify({'error': 'Playlist or song not found.'}), 404

    song_playlist = SongPlaylist.query.filter_by(
        playlist_id=playlist_id, song_id=song_id
    ).first()

    if song_playlist:
        return jsonify({'error': 'Song was already added'})

    new_song = SongPlaylist(
        playlist_id = playlist_id,
        song_id = song_id
    )

    playlist.songs_playlist.append(new_song)
    db.session.add(new_song)
    db.session.commit()
    return playlist.to_dict()
