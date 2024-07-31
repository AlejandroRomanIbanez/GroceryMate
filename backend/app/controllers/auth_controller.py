from flask import request, jsonify
from flask_jwt_extended import create_access_token
from app.models.user_model import UserRegistration, UserLogin
from app.services.auth_service import register_user, login_user


def register():
    data = UserRegistration(**request.get_json())
    response, status = register_user(data)
    return jsonify(response), status


def login():
    data = UserLogin(**request.get_json())
    user = login_user(data)
    if 'error' in user:
        return jsonify(user), 401

    access_token = create_access_token(identity=str(user['_id']))
    return jsonify({'access_token': access_token}), 200
