from app.models.song_playlist import db, SongPlaylist , environment, SCHEMA
from sqlalchemy.sql import text

song_playlist_1 = SongPlaylist(
    playlist_id = 1,
    song_id = 1
)
song_playlist_2 = SongPlaylist(
    playlist_id = 2,
    song_id = 2
)
song_playlist_3 = SongPlaylist(
    playlist_id = 3,
    song_id = 3
)
song_playlist_4 = SongPlaylist(
    playlist_id = 1,
    song_id = 2
)
song_playlist_5 = SongPlaylist(
    playlist_id = 2,
    song_id = 3
)
song_playlist_6 = SongPlaylist(
    playlist_id = 3,
    song_id = 1
)

def seed_song_playlist():
    db.session.add(song_playlist_1)
    db.session.add(song_playlist_2)
    db.session.add(song_playlist_3)
    db.session.add(song_playlist_4)
    db.session.add(song_playlist_5)
    db.session.add(song_playlist_6)
    db.session.commit()

def undo_song_playlist():

    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.song_playlist RESTART IDENTITY CASCADE;")
    else:
        db.session.delete(song_playlist_1)
        db.session.delete(song_playlist_1)
        db.session.delete(song_playlist_1)
        db.session.delete(song_playlist_1)
        db.session.delete(song_playlist_1)
        db.session.delete(song_playlist_1)
        db.session.execute(text("DELETE FROM song_playlist"))

    db.session.commit()
