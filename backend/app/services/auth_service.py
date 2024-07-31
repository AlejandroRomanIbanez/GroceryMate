from werkzeug.security import generate_password_hash, check_password_hash
from app import mongo


def register_user(data):
    username = data.username
    password = generate_password_hash(data.password)

    if mongo.db.users.find_one({'username': username}):
        return {'error': 'Username already exists'}, 400

    mongo.db.users.insert_one({'username': username, 'password': password, 'basket': [], 'fav_products': []})
    return {'message': 'User registered successfully'}, 201


def login_user(data):
    username = data.username
    password = data.password

    user = mongo.db.users.find_one({'username': username})
    if not user or not check_password_hash(user['password'], password):
        return {'error': 'Invalid username or password'}, 401

    return user
