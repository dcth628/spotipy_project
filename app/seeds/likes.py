from app.models import db, Like, environment, SCHEMA
from sqlalchemy import text

like_1 = Like(
    user_id = 1,
    likable_type = 'user',
    likable_id = 2
)

like_2 = Like(
    user_id = 1,
    likable_type = 'song',
    likable_id = 1
)

like_3 = Like(
    user_id = 1,
    likable_type = 'album',
    likable_id = 3
)

like_4 = Like(
    user_id = 3,
    likable_type = 'playlist',
    likable_id = 1
)

def seed_likes():

    db.session.add(like_1)
    db.session.add(like_2)
    db.session.add(like_3)
    db.session.add(like_4)
    db.session.commit()


def undo_likes():

    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.likes RESTART IDENTITY CASCADE;")
    else:
        db.session.delete(like_1)
        db.session.delete(like_2)
        db.session.delete(like_3)
        db.session.delete(like_4)
        db.session.execute(text("DELETE FROM likes"))

    db.session.commit()
