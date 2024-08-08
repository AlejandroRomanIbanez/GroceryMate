import React, { useState, useEffect } from 'react';
import './ProductGrid.css';
import Pagination from '../ProductPagination/ProductPagination';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import notfound from '../../Assets/no-product-found.png';
import ProductGridSkeleton from '../../Skeleton/ProductGridSkeleton';

const ProductGrid = ({ products, isFav, basket, setBasket, filterByCategory, resetPage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [favProductIds, setFavProductIds] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const productsPerPage = 12;
  const totalPages = Math.ceil(products.length / productsPerPage);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/api/me/favorites`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setFavProductIds(response.data.map(product => product._id));
      } catch (error) {
        console.error('Failed to fetch favorites:', error);
      }
    };

    const fetchBasket = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/api/me/basket`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setBasket(response.data);
      } catch (error) {
        console.error('Failed to fetch basket:', error);
      }
    };

    fetchFavorites();
    fetchBasket();
  }, [setBasket]);

  useEffect(() => {
    setCurrentPage(1);
  }, [resetPage]);

  useEffect(() => {
    if (products.length > 0 || !loading) {
      setLoading(false);
    }
  }, [products, loading]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleAddToFavorites = async (productId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/auth');
      return;
    }
    if (favProductIds.includes(productId)) {
      // Remove from favorites
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_SERVER}/api/me/favorites/remove`,
          { product_id: productId },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        if (response.status === 200) {
          setFavProductIds(favProductIds.filter(id => id !== productId));
        }
      } catch (error) {
        console.error('Failed to remove from favorites:', error);
      }
    } else {
      // Add to favorites
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_SERVER}/api/me/favorites`,
          { product_id: productId },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        if (response.status === 201) {
          setFavProductIds([...favProductIds, productId]);
        }
      } catch (error) {
        console.error('Failed to add to favorites:', error);
      }
    }
  };

  const handleQuantityChange = (productId, quantity) => {
    setQuantities({
      ...quantities,
      [productId]: quantity,
    });
  };

  const handleAddToCart = async (product) => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/auth');
      return;
    }
    const quantity = quantities[product._id] || 1;
    const newBasket = [...basket];
    const productIndex = newBasket.findIndex(item => item.product_id === product._id);
    if (productIndex > -1) {
      newBasket[productIndex].quantity += quantity;
    } else {
      newBasket.push({ product_id: product._id, quantity });
    }
    setBasket(newBasket);

    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_SERVER}/api/me/basket`,
        newBasket,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
    } catch (error) {
      console.error('Failed to update basket:', error);
    }
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div className="container">
      <div className="product-grid">
        {loading ? (
          <ProductGridSkeleton />
        ) : currentProducts.length > 0 ? (
          currentProducts.map(product => (
            <div className="product-card" key={product._id}>
              <div className="card">
                <div className="card-header">
                  <p className="lead">{product.name}</p>
                </div>
                <img src={product.image_url} alt={product.name} className="card-img-top" />
                <div className="card-body">
                  <div className="content">
                    <p className="category">
                      <a
                        href="#!"
                        className="text-muted"
                        onClick={(e) => {
                          e.preventDefault();
                          filterByCategory(product.category);
                        }}
                      >
                        {product.category}
                      </a>
                    </p>
                  </div>
                  <div className="content">
                    <h5 className="discount-price">{product.price}€</h5>
                  </div>
                  <div className="button-area">
                    <div className="row">
                      <div className="col-3">
                        <input
                          type="number"
                          name={`quantity_${product._id}`}
                          className="quantity"
                          value={quantities[product._id] || 1}
                          min="1"
                          onChange={(e) => handleQuantityChange(product._id, parseInt(e.target.value))}
                        />
                      </div>
                      <div className="col-7">
                        <button
                          className="btn btn-primary btn-cart"
                          onClick={() => handleAddToCart(product)}
                        >
                          Add to Cart
                        </button>
                      </div>
                      <div className="col-1">
                        <button
                          className={`btn btn-outline-dark ${favProductIds.includes(product._id) ? 'btn-favorite' : ''}`}
                          onClick={() => handleAddToFavorites(product._id)}
                        >
                          ❤
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          !loading && (
            <div className="no-products-card">
              <div className="card">
                <div className="card-body">
                  <img src={notfound} alt="No products found" className="no-products-image" />
                  <h2>No products found</h2>
                  <p>There are no products matching your filters at the moment. We are working on bringing more products to the store. Please check back later.</p>
                </div>
              </div>
            </div>
          )
        )}
      </div>
      {products.length > productsPerPage && (
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      )}
    </div>
  );
};

export default ProductGrid;
