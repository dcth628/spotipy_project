from app.models import db, Album, environment, SCHEMA
from sqlalchemy.sql import text

album_1 = Album(
    album_name='Teental',
    year_recorded = 2022,
    album_img = 'https://res.cloudinary.com/dtcuw5i2e/image/upload/v1684000329/Teental_Image_bjfi8a.jpg',
    user_id = 1
)

album_2 = Album(
    album_name='Aakash Gandhi rarfem',
    year_recorded = 2019,
    album_img = 'https://res.cloudinary.com/dtcuw5i2e/image/upload/v1684000336/Aakash_Gandhi_e7lfsh.jpg',
    user_id = 2
)

album_3 = Album(
    album_name='Hanu Dixit Ambltx',
    year_recorded = 2011,
    album_img = 'https://res.cloudinary.com/dtcuw5i2e/image/upload/v1684000333/Hanu_Dixit_lcoyx5.jpg',
    user_id = 3
)

def seed_albums():

    db.session.add(album_1)
    db.session.add(album_2)
    db.session.add(album_3)
    db.session.commit()


def undo_albums():

    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.albums RESTART IDENTITY CASCADE;")
    else:
        db.session.delete(album_1)
        db.session.delete(album_2)
        db.session.delete(album_3)
        db.session.execute(text("DELETE FROM albums"))

    db.session.commit()
