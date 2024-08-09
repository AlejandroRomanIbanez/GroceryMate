from flask import jsonify, request

from app.models.product_model import ReviewModel
from app.services.product_service import get_all_products, get_product_by_id, add_review_to_product, \
    remove_review_from_product, update_product_review
from flask_jwt_extended import jwt_required, get_jwt_identity

from app.services.user_service import get_user_info


def fetch_all_products():
    """
    Fetches all products from the database and returns them in JSON format.

    Returns:
        JSON: A JSON response containing a list of all products.
    """
    products = get_all_products()
    return jsonify(products)


def get_single_product(product_id):
    """
    Fetches a single product by its ID and returns it in JSON format.

    Args:
        product_id (str): The ID of the product to fetch.

    Returns:
        JSON: A JSON response containing the product if found,
              otherwise an error message with a 404 status code.
    """
    product = get_product_by_id(product_id)
    if product:
        return jsonify(product)
    return jsonify({'error': 'Product not found'}), 404


@jwt_required()
def add_review(product_id):
    """
    Endpoint to add a review for a product.

    Args:
        product_id (str): The ID of the product.

    Returns:
        JSON: A JSON response indicating the result of the review submission.
    """
    try:
        # Get user ID from JWT
        user_id = get_jwt_identity()
        user_info = get_user_info(user_id)

        if not user_info:
            return jsonify({"error": "User not found"}), 404

        # Prepare review data with the author's name
        review_data = request.json
        review_data['Author'] = user_info.get('username', 'Anonymous')

        # Create a ReviewModel instance
        review_model = ReviewModel(**review_data)

        # Add review to the product
        response = add_review_to_product(product_id, review_model)
        return jsonify(response), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@jwt_required()
def delete_review(product_id):
    try:
        review_index = int(request.args.get('index'))
        author_name = request.args.get('author_name')
        response = remove_review_from_product(product_id, review_index, author_name)
        return jsonify(response), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@jwt_required()
def update_review(product_id):
    try:
        review_index = int(request.args.get('index'))
        author_name = request.args.get('author_name')
        updated_data = ReviewModel(**request.json)
        response = update_product_review(product_id, review_index, author_name, updated_data)
        return jsonify(response), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400