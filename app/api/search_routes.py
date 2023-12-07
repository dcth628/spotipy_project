from flask import Blueprint, request
from app.models import Album, db, User, Playlist, Song
from app.forms.search_form import SearchForm

search_routes = Blueprint('search', __name__)

# Search
@search_routes.route('/', methods=['POST'])
def search():
        form = SearchForm()
    # if form.validate_on_submit():
        # searched = request.json['searched']
        searched = form.data['searched']
        albums = Album.query.filter(Album.album_name.like(f'%{searched}%')).all()
        users = User.query .filter(User.username.like(f'%{searched}%')).all()
        playlists = Playlist.query.filter(Playlist.playlist_name.like(f'%{searched}%')).all()
        songs = Song.query.filter(Song.song_name.like(f'%{searched}%')).all()
        return {'albums': [album.to_like() for album in albums] if albums else [],
                "users": [user.to_dict() for user in users] if users else [],
                'playlists': [playlist.to_dict() for playlist in playlists] if playlists else [],
                'songs': [song.song_detail_dict() for song in songs] if songs else []
                }
    # data = request.json['input']
    # albums = Album.query.filter(Album.album_name.like(f'%{data}%')).all()
    # return {'albums': [album.to_dict() for album in albums]}
