from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.schema import ForeignKey
from flask_login import current_user
from .like import Like


class Album(db.Model):
    __tablename__ = 'albums'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    album_name = db.Column(db.String, nullable=False)
    year_recorded = db.Column(db.Integer, nullable=False)
    album_img = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    owners = db.relationship('User', back_populates='albums')

    likes = db.relationship(
        'Like', lazy=True, primaryjoin='and_(Like.likable_type=="album", foreign(Like.likable_id)==Album.id)', back_populates='albums', cascade="all, delete-orphan")

    songs = db.relationship('Song', back_populates='albums', cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'album_name': self.album_name,
            'year_recorded': self.year_recorded,
            'album_img': self.album_img,
            'user_id': self.user_id,
            'likable_type': [like.likable_type for like in self.likes] if self.likes else [],
            'likable_id': [like.id for like in self.likes] if self.likes else []
        }

    def to_like(self):
        return {
            'id': self.id,
            'album_name': self.album_name,
            'year_recorded': self.year_recorded,
            'album_img': self.album_img,
            'user_id': self.user_id,
            'username': self.owners.username,
            'songs':[song.song_like_dict() for song in self.songs] if self.songs else [],
            # 'liked':[like.to_dict for like in self.likes] if self.likes else 'No like',
            'likable_type': [like.likable_type for like in self.likes] if self.likes else [],
            'likable_id': [like.likable_id for like in self.likes] if self.likes else [],
            'liked_user_id':[like.user_id for like in self.likes] if self.likes else [],
        }

    def liked_album_dict(self):
        return {
            'id': self.id,
            'album_name': self.album_name,
            'year_recorded': self.year_recorded,
            'album_img': self.album_img,
        }

    def player_dict(self):
        return {
            'songs': [song.player_dict() for song in self.songs] if self.songs else []
        }
