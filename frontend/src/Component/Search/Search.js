import React, { useState, useEffect } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import './Search.css';

// Mock data for products
{/*const mockProducts = [
    { _id: '1', name: 'Apple', description: 'Fresh Red Apple', price: 1.99 },
    { _id: '2', name: 'Banana', description: 'Ripe Yellow Banana', price: 0.99 },
    { _id: '3', name: 'Cherry', description: 'Sweet Red Cherry', price: 2.99 },
    { _id: '4', name: 'Date', description: 'Delicious Dates', price: 3.99 },
    { _id: '5', name: 'Elderberry', description: 'Healthy Elderberry', price: 4.99 },
    { _id: '6', name: 'Fig', description: 'Nutritious Fig', price: 2.49 },
    { _id: '7', name: 'Grape', description: 'Juicy Purple Grapes', price: 2.99 },
    { _id: '8', name: 'Honeydew', description: 'Refreshing Honeydew Melon', price: 3.49 },
];*/}

const Search = ({ products }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        const fetchSuggestions = () => {
            if (query.length > 1) {
                const filteredSuggestions = products.filter(product =>
                    product.name.toLowerCase().includes(query.toLowerCase())
                );
                setSuggestions(filteredSuggestions);
            } else {
                setSuggestions([]);
            }
        };

        const delayDebounceFn = setTimeout(() => {
            fetchSuggestions();
        }, 500); // Adjust delay for debounce

        return () => clearTimeout(delayDebounceFn);
    }, [query, products]);

    return (
        <div className='search-cont'>
            <BiSearchAlt className='icon' />
            <input
                type="text"
                placeholder='Search Products'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            {suggestions.length > 0 && (
                <div className='suggestions'>
                    {suggestions.map((suggestion) => (
                        <div key={suggestion._id} className='suggestion-item'>
                            <p><strong>{suggestion.name}</strong></p>
                            <p>{suggestion.description}</p>
                            <p>${suggestion.price.toFixed(2)}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Search;
