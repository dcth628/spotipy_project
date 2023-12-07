from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', first_name='T', last_name='J',user_image='https://res.cloudinary.com/dtcuw5i2e/image/upload/v1684000820/Demo_i4g1cz.png', date_of_birth=datetime.strptime('1988/02/02', '%Y/%m/%d').date())
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password', first_name='S', last_name='C',user_image='https://res.cloudinary.com/dtcuw5i2e/image/upload/v1684001098/marnie_kg64zg.jpg', date_of_birth=datetime.strptime('1988/02/02', '%Y/%m/%d').date())
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password', first_name='H', last_name='D',user_image='https://res.cloudinary.com/dtcuw5i2e/image/upload/v1684001100/bobbie_a7bzoi.png', date_of_birth=datetime.strptime('1988/02/02', '%Y/%m/%d').date())

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
