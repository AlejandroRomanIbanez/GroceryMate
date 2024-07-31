from flask import Blueprint
from app.controllers.user_controller import add_favorite, get_favorites, remove_favorite, sync_basket, get_basket

user_bp = Blueprint('favorite', __name__, url_prefix='/api/me')

user_bp.route('/favorites', methods=['POST'])(add_favorite)
user_bp.route('/favorites/remove', methods=['POST'])(remove_favorite)
user_bp.route('/favorites', methods=['GET'])(get_favorites)

user_bp.route('/basket', methods=['POST'])(sync_basket)
user_bp.route('/basket', methods=['GET'])(get_basket)

