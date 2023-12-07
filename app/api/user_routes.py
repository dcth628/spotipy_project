from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, Like, db
from flask_login import current_user

user_routes = Blueprint('users', __name__)
# api/users/


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

# ALL OF CURRENT USERS LIKED USERS
@user_routes.route('/likes')
def user_liked_users():
    user_id = current_user.id
    liked_users = Like.query.filter_by(user_id = user_id, likable_type='user').all()

    user_display = []
    if liked_users:
        for like in liked_users:
            id = like.likable_id
            user = User.query.get(id)
            user_display.append(user.to_dict())

    return user_display


# LIKE/UNLIKE A USER
@user_routes.route('/<int:user_id>/likes', methods=['POST', 'DELETE'])
@login_required
def user_likes(user_id):
    curr_user_id = current_user.id
    like_exists = Like.query.filter_by(user_id = curr_user_id, likable_id = user_id, likable_type = 'user').first()

    if request.method == 'DELETE':
        if like_exists:
            db.session.delete(like_exists)
            db.session.commit()
            return f"User {curr_user_id}'s user like has been removed."
        return f"User {curr_user_id} has not liked this user."

    if like_exists:
        return like_exists.exists_to_dict()

    new_like = Like(
        user_id = curr_user_id,
        likable_type = 'user',
        likable_id = user_id
    )

    db.session.add(new_like)
    db.session.commit()
    return new_like.to_dict()
