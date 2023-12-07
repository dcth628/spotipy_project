from flask import Blueprint, request
from flask_login import login_required, current_user

from app.models import Song, Like, Album, db
from app.forms.song_form import SongForm


songs_routes = Blueprint('songs', __name__)
# api/songs/

# THIS IS JUST TO VERIFY THE FUNCTIONALITY OF THE LIKES AND DELETES
@songs_routes.route('')
def all_songs():
    songs = Song.query.all()
    return {song.id: song.song_like_dict() for song in songs}

@songs_routes.route('/<int:id>')
def song_detail(id):
    user_id = current_user.get_id()
    song = Song.query.get(id)
    return song.song_detail_dict()

# CREATE A SONG
@songs_routes.route('/new', methods=['POST'])
@login_required
def add_song():
    form = SongForm()
    owner_id = current_user.get_id()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_song = Song(
            song_name = form.data['song_name'],
            song_length = form.data['song_length'],
            song_src = form.data['song_src'],
            album_id = form.data['album_id']
        )
        db.session.add(new_song)
        db.session.commit()
        return new_song.song_detail_dict()

    return "Error form did not validate"

# DELETE SONG
@songs_routes.route('/<int:song_id>', methods=['DELETE'])
@login_required
def delete_song(song_id):
    song = Song.query.get(song_id)

    if song:
        db.session.delete(song)
        db.session.commit()
        return song.to_dict()

    return song_detail(song_id)


# # CREATE A LIKE/ DELETE A LIKE
# @songs_routes.route('/<int:song_id>/likes', methods=['GET','POST','DELETE'])
# @login_required
# def song_likes(song_id):
#     user_id = current_user.id
#     like_exists = Like.query.filter_by(user_id = user_id, likable_id = song_id, likable_type = 'song').first()

#     if request.method == 'GET':
#         if like_exists:
#             return like_exists.exists_to_dict()
#         return like_exists.song_dict()

#     if request.method == 'DELETE':
#         if like_exists:
#             db.session.delete(like_exists)
#             db.session.commit()
#             return like_exists.song_dict()
#         return like_exists.song_dict()

#     if like_exists:
#         return like_exists.exists_to_dict()

#     new_like = Like(
#         user_id = user_id,
#         likable_type = 'song',
#         likable_id = song_id
#     )

#     db.session.add(new_like)
#     db.session.commit()
#     return new_like.song_dict()

# Like an song
@songs_routes.route('/<int:id>/likes', methods=['GET','POST'])
@login_required
def like_song(id):
    user_id = current_user.get_id()
    songs = Song.query.select_from(Like).filter(Song.id == id, Like.likable_type == 'song', Like.likable_id == id, Like.user_id == user_id).first()
    if songs and request.method == 'POST':
        return {"eorror":"You have liked this song"}
    elif songs and request.method == 'GET':
        return songs.song_album_dict()


    liked_song = Like(
        user_id=user_id,
        likable_type='song',
        likable_id=id
    )
    db.session.add(liked_song)
    db.session.commit()
    return liked_song.song_dict()


# Delete a liked song
@songs_routes.route('/<int:id>/likes', methods=['DELETE'])
@login_required
def delete_like_song(id):
    user_id = current_user.get_id()
    liked_song = Like.query.select_from(Song).filter(Song.id == id, Like.likable_type =='song', Like.likable_id == id, Like.user_id == user_id ).first()
    if liked_song:
        db.session.delete(liked_song)
        db.session.commit()
        return liked_song.song_dict()
    return song_detail(id)

# ROUTE TO ADD A SONG TO MUSIC PLAYER
@songs_routes.route('/<int:song_id>/player', methods=['GET'])
@login_required
def player_route(song_id):
    song = Song.query.get(song_id)

    if song:
        return {'songs': [song.player_dict()]}
    return {'error': 'Song not found'}
