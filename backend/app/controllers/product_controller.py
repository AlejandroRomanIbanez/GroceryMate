from flask import jsonify
from app.services.product_service import get_all_products, get_product_by_id


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
