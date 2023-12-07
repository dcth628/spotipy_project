from flask.cli import AppGroup
from .users import seed_users, undo_users
from .albums import seed_albums, undo_albums
from .likes import seed_likes, undo_likes
from .playlists import seed_playlists, undo_playlists
from .songs import seed_songs, undo_songs
from .songs_playlists import seed_song_playlist, undo_song_playlist

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
        undo_albums()
        undo_playlists()
        undo_songs()
        undo_song_playlist()
        undo_likes()
    seed_users()
    seed_albums()
    seed_playlists()
    seed_songs()
    seed_song_playlist()
    seed_likes()

    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_albums()
    undo_playlists()
    undo_songs()
    undo_song_playlist()
    undo_likes()
    # Add other undo functions here
