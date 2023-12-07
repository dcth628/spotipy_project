from app.models import db, Playlist, environment, SCHEMA
from sqlalchemy.sql import text

# Add playlists

playlist_1 = Playlist(
        playlist_name='Work out',
        owner_id = 1
    )

playlist_2 = Playlist(
        playlist_name='Meditation',
        owner_id = 2
    )

playlist_3 = Playlist(
        playlist_name='Dinner time',
        owner_id = 3
    )
def seed_playlists():

    db.session.add(playlist_1)
    db.session.add(playlist_2)
    db.session.add(playlist_3)
    db.session.commit()


def undo_playlists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.playlists RESTART IDENTITY CASCADE;")
    else:
        db.session.delete(playlist_1)
        db.session.delete(playlist_2)
        db.session.delete(playlist_3)
        db.session.execute(text("DELETE FROM playlist"))

    db.session.commit()
