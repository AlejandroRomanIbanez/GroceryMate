from flask import jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required
from app.services.user_service import add_to_favorites, get_user_favorites, remove_from_favorites, sync_basket_service, get_user_basket


@jwt_required()
def add_favorite():
    user_id = get_jwt_identity()
    product_id = request.json.get("product_id")

    result = add_to_favorites(user_id, product_id)
    if result['nModified'] == 1:
        return jsonify({"message": "Product added to favorites"}), 201
    return jsonify({"error": "Product not added"}), 400


@jwt_required()
def remove_favorite():
    user_id = get_jwt_identity()
    product_id = request.json.get("product_id")
    result = remove_from_favorites(user_id, product_id)
    if result['nModified'] == 1:
        return jsonify({"message": "Product removed from favorites"}), 200
    return jsonify({"error": "Product not removed"}), 400


@jwt_required()
def get_favorites():
    user_id = get_jwt_identity()
    favorites = get_user_favorites(user_id)
    return jsonify(favorites), 200


@jwt_required()
def sync_basket():
    user_id = get_jwt_identity()
    basket = request.get_json()

    result = sync_basket_service(user_id, basket)
    return jsonify(result), 200


@jwt_required()
def get_basket():
    user_id = get_jwt_identity()
    basket = get_user_basket(user_id)
    return jsonify([item for item in basket]), 200
