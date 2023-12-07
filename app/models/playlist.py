from .db import db, environment, SCHEMA, add_prefix_for_prod
from .song_playlist import SongPlaylist
from .like import Like

class Playlist(db.Model):
    __tablename__ = 'playlists'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    playlist_name = db.Column(db.String)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    owner = db.relationship('User', back_populates='playlists')

    songs_playlist = db.relationship('SongPlaylist', back_populates='playlists', cascade="all, delete-orphan")

    likes = db.relationship('Like', lazy=True, primaryjoin='and_(Like.likable_type=="playlist", foreign(Like.likable_id)==Playlist.id)', back_populates='playlists', cascade="all, delete-orphan")


    def to_dict(self):
        return {
            'id': self.id,
            'playlist_name': self.playlist_name,
            'owner_id': self.owner_id,
            'owner_name': self.owner.username,
            'likable_type': [like.likable_type for like in self.likes] if self.likes else None,
            'likable_id': [like.id for like in self.likes] if self.likes else [],
            'liked_user_id':[like.user_id for like in self.likes] if self.likes else [],
            'user_id': [like.user_id for like in self.likes] if self.likes else [],
            'songs': [songs.to_dict() for songs in self.songs_playlist] if self.songs_playlist else []
        }

    def player_dict(self):
        return {
            'songs': [song.player_dict() for song in self.songs_playlist] if self.songs_playlist else []
        }
