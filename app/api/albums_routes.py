from flask import Blueprint, request
from flask_login import login_required
from app.models import Album, db, Like, Song
from app.forms.album_form import CreateAlbumForm
from app.forms.search_form import SearchForm
from flask_login import current_user
from app.forms.song_form import SongForm




albums_routes = Blueprint('albums', __name__)

# Get All albums
@albums_routes.route('')
def all_albums():
    albums = Album.query.all()
    return {album.id: album.to_like() for album in albums}

# Get all playlist for the current user.
@albums_routes.route('/current')
@login_required
def user_albums():
    """
    Query for all albums for the user and returns them in a list of album dictionaries
    """
    user_id = current_user.id
    albums = Album.query.filter_by(user_id=user_id)
    return {album.id: album.to_like() for album in albums}

# # GET ALL ALBUMS THAT CURRENT USER LIKES
# @albums_routes.route('/likes')
# def user_liked_albums():
#     user_id = current_user.id
#     liked_albums = Like.query.filter_by(user_id = user_id, likable_type='album').all()

#     album_display = []
#     if liked_albums:
#         for like in liked_albums:
#             id = like.likable_id
#             album = Album.query.get(id)
#             album_display.append(album.liked_album_dict())

#         return album_display
#     return album_detail(id)


# Get details of an album by the id.
@albums_routes.route('/<int:id>')
def album_detail(id):
    user_id = current_user.get_id()
    album = Album.query.filter( Album.id == id).first()
    if album:
        return album.to_like()
    return {"error": "can't find album"}


# Create an album
@albums_routes.route('', methods=['POST'])
@login_required
def create_album():
    """
    create an album
    """
    form = CreateAlbumForm()
    user_id = current_user.get_id()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        # new_album = Album(**request.json)
        new_album = Album(
            album_name=form.data['album_name'],
            year_recorded=form.data['year_recorded'],
            album_img=form.data['album_img'],
            user_id=user_id
        )
        db.session.add(new_album)
        db.session.commit()
        return new_album.to_like()


# Update an album
@albums_routes.route('/<int:id>/', methods=["PUT"])
@login_required
def edit_album(id):
    """
    edit an album
    """
    user_id = current_user.get_id()

    form = CreateAlbumForm()
    album = Album.query.get_or_404(id)

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # edited_album = Album(**request.json)

        album_name = form.data['album_name']
        year_recorded = form.data['year_recorded']
        album_img = form.data['album_img']

        album.album_name = album_name
        album.year_recorded = year_recorded
        album.album_img = album_img

        db.session.commit()
        return album.to_dict()

# Delete an album
@albums_routes.route('/<int:id>/', methods=['DELETE'])
def delete_album(id):
    album = Album.query.get(id)
    db.session.delete(album)
    db.session.commit()

    return album.to_dict()

# Like an album
@albums_routes.route('/<int:id>/likes', methods=['GET','POST'])
@login_required
def like_album(id):
    user_id = current_user.get_id()
    albums = Album.query.select_from(Like).filter(Album.id == id, Like.likable_type == 'album', Like.likable_id == id, Like.user_id == user_id).first()
    # albums = Like.query.filter(Like.likable_id == id, Like.likable_type == 'album')
    # return {album.id: album.to_dict() for album in albums}
    if albums and request.method == 'POST':
        return {"error": "You have liked this album"}
    elif albums and request.method == 'GET':
        return albums.to_like()

    liked_album = Like(
        user_id=user_id,
        likable_type='album',
        likable_id=id
    )
    db.session.add(liked_album)
    db.session.commit()
    return liked_album.to_album()


# Delete a liked ablum
@albums_routes.route('/<int:id>/likes', methods=['DELETE'])
@login_required
def delete_like_album(id):
    user_id = current_user.get_id()

    liked_album = Like.query.select_from(Album).filter(Album.id == id, Like.likable_type =='album', Like.likable_id == id, Like.user_id == user_id).first()
    if liked_album:
        db.session.delete(liked_album)
        db.session.commit()
        return liked_album.to_album()
    return album_detail(id)


# CREATE A SONG
@albums_routes.route('/<int:id>/songs', methods=['POST'])
@login_required
def add_song(id):
    # print(request.json)
    form = SongForm()
    owner_id = current_user.get_id()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_song = Song(
            song_name = form.data['song_name'],
            song_length = form.data['song_length'],
            song_src = form.data['song_src'],
            album_id = id
        )
        db.session.add(new_song)
        db.session.commit()
        return new_song.song_detail_dict()

    return "Error form did not validate"

# DELETE SONG
@albums_routes.route('/songs/<int:song_id>', methods=['DELETE'])
@login_required
def delete_song(song_id):
    song = Song.query.get(song_id)

    if song:
        db.session.delete(song)
        db.session.commit()
        return {"Message":"Deleted"}

    return {"error":"Can't find song"}

# ROUTE TO PULL SONGS IN LIST FOR THE PLAYER
@albums_routes.route('<int:album_id>/player')
@login_required
def player_route(album_id):
    playlist = Album.query.get(album_id)

    if (playlist):
        return playlist.player_dict()

    return 'Playlist not found'
