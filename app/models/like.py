from .db import db, environment, SCHEMA, add_prefix_for_prod


class Like(db.Model):
    __tablename__ = 'likes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    likable_type = db.Column(db.Enum(
        'user', 'album', 'playlist', 'song', name='likable_type'), nullable=False)
    likable_id = db.Column(db.Integer, nullable=False)

    # __mapper_args__ = {
    #     'polymorphic_identity': 'likes',
    #     'with_polymorphic': '*',
    #     "polymorphic_on": likable_type
    # }

    users = db.relationship('User', back_populates='user_likes')

    albums = db.relationship(
        'Album', primaryjoin='and_(Like.likable_type=="album", foreign(Like.likable_id)==Album.id)')

    playlists = db.relationship(
        'Playlist', primaryjoin='and_(Like.likable_type=="playlist", foreign(Like.likable_id)==Playlist.id)', back_populates='likes')

    songs = db.relationship(
        'Song', primaryjoin='and_(Like.likable_type=="song", foreign(Like.likable_id)==Song.id)')

    user_follow = db.relationship(
        'User', primaryjoin='and_(Like.likable_type=="user", foreign(Like.likable_id)==User.id)')

    def to_album(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'likable_type': self.likable_type,
            'likable_id': self.likable_id,
            'album_id' : self.albums.id,
            'album_name' : self.albums.album_name,
            'year_recorded' : self.albums.year_recorded,
            'album_img': self.albums.album_img
        }

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'likable_type': self.likable_type,
            'likable_id': self.likable_id,
        }

    def exists_to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'likable_type': self.likable_type,
            'likable_id': self.likable_id,
            'Exists': 'True'
        }

    def song_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'likable_id': self.likable_id,
            'likable_type': self.likable_type,
            'song_id': self.songs.id,
            'song_name': self.songs.song_name,
            'song_length': self.songs.song_length,
            'song_src' : self.songs.song_src,
            'album_id' : self.songs.album_id
        }

    def playlist_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'likable_id': self.likable_id,
            'likable_type': self.likable_type,
            'playlist_id': self.playlists.id,
            'playlist_name': self.playlists.playlist_name,
        }
