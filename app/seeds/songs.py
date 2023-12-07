from app.models import db, Song, environment, SCHEMA
from sqlalchemy.sql import text

# Add few songs
song_1 = Song(
        song_name='Manj Khammaj',
        song_length= 157,
        song_src='https://res.cloudinary.com/djclmc80y/video/upload/v1683000699/Manj_Khammaj_-_Teental_-_Aditya_Verma_Subir_Dev_awrwio.mp3',
        album_id = 1
    )

song_2 = Song(
        song_name='Shake it',
        song_length=214,
        song_src='https://res.cloudinary.com/djclmc80y/video/upload/v1683000816/Shake_It_-_Aakash_Gandhi_rarfem.mp3',
        album_id= 2
    )

song_3 = Song(
        song_name='Train of thoughts',
        song_length=192,
        song_src='https://res.cloudinary.com/djclmc80y/video/upload/v1683000871/Train_Of_Thoughts_-_Hanu_Dixit_ambltx.mp3',
        album_id= 3
    )
song_4 = Song(
        song_name='All you need is love',
        song_length=231,
        song_src='https://res.cloudinary.com/djclmc80y/video/upload/v1683000871/Train_Of_Thoughts_-_Hanu_Dixit_ambltx.mp3',
        album_id= 1
    )
song_5 = Song(
        song_name='Names',
        song_length=168,
        song_src='https://res.cloudinary.com/djclmc80y/video/upload/v1683000871/Train_Of_Thoughts_-_Hanu_Dixit_ambltx.mp3',
        album_id= 1
    )
song_6 = Song(
        song_name='I Am the Best',
        song_length=246,
        song_src='https://res.cloudinary.com/djclmc80y/video/upload/v1683000871/Train_Of_Thoughts_-_Hanu_Dixit_ambltx.mp3',
        album_id= 1
    )


def seed_songs():

    db.session.add(song_1)
    db.session.add(song_2)
    db.session.add(song_3)
    db.session.add(song_4)
    db.session.add(song_5)
    db.session.add(song_6)
    db.session.commit()


def undo_songs():

    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.songs RESTART IDENTITY CASCADE;")
    else:
        db.session.delete(song_1)
        db.session.delete(song_2)
        db.session.delete(song_3)
        db.session.delete(song_4)
        db.session.delete(song_5)
        db.session.delete(song_6)
        db.session.execute(text("DELETE FROM songs"))

    db.session.commit()
