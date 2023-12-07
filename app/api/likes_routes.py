from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Like

likes_routes = Blueprint('likes', __name__)

@likes_routes.route('/albums')
@login_required
def liked_albums():
    user_id = current_user.get_id()
    liked_album = Like.query.filter_by(user_id = user_id, likable_type = "album")
    liked_song = Like.query.filter_by(user_id = user_id, likable_type = "song")
    liked_playlist = Like.query.filter_by(user_id = user_id, likable_type = "playlist")
    return {album.id: album.to_album() for album in liked_album}

@likes_routes.route('/songs')
@login_required
def liked_songs():
    user_id = current_user.get_id()
    liked_song = Like.query.filter_by(user_id = user_id, likable_type = "song")
    liked_playlist = Like.query.filter_by(user_id = user_id, likable_type = "playlist")
    return {song.id: song.song_dict() for song in liked_song}

@likes_routes.route('/playlists')
@login_required
def liked_playlists():
    user_id = current_user.get_id()
    liked_playlist = Like.query.filter_by(user_id = user_id, likable_type = "playlist")
    return {playlist.id: playlist.playlist_dict() for playlist in liked_playlist}
