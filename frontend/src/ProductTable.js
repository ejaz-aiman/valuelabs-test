import React, { useState, useEffect } from "react";
import './ProductTable.css';

const ProductTable = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetch('https://dummyjson.com/products')
            .then(response => response.json())
            .then(data => {
                const products = data.products
                setProducts(products);
                setLoading(false)
            })
            .catch(error => {
                console.log('Errro in fetching products', error);
                setError(error)
                setLoading(false)
            })
    }, [])

    if (loading) return <p>loading...</p>
    if (error) return <p>Error loading data.</p>

    return (
        <div className="product-table-container">
            <table className="product-table">
                <thead>
                    <tr>
                        <th>
                            Name
                        </th>
                        <th>
                            Description
                        </th>
                        <th>
                            Image
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {products.length > 0 ?
                        products.map((product, index) => (
                            <tr key={product.id}>
                                <td>{product.title}</td>
                                <td>{product.description}</td>
                                <td>
                                    <img src={product.images[0]} alt={product.title} className="product-image" />
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="3">No products available</td>
                            </tr>
                        )}
                </tbody>
            </table>
        </div>
    )
}

export default ProductTable;