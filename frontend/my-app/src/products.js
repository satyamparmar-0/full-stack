import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ProductsTable() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://eafb-2405-201-301d-f872-a5f7-bfbe-80a9-e3f9.ngrok-free.app/api/getproducts',
           {
          headers: {
            'ngrok-skip-browser-warning': '69420'
          }
        }
        );
        console.log('Response:', response.data);
        setProducts(response.data.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Products</h2>
      <table style={{ border: '1px solid black', borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid black' }}>
            <th style={{ padding: '10px', borderRight: '1px solid black' }}>Item Name</th>
            <th style={{ padding: '10px', borderRight: '1px solid black' }}>Description</th>
            <th style={{ padding: '10px', borderRight: '1px solid black' }}>Base Price</th>
            <th style={{ padding: '10px', borderRight: '1px solid black' }}>Category</th>
            <th style={{ padding: '10px', borderRight: '1px solid black' }}>Subcategory</th>
            <th style={{ padding: '10px', borderRight: '1px solid black' }}>Discount</th>
            <th style={{ padding: '10px', borderRight: '1px solid black' }}>Quantity Available</th>
            <th style={{ padding: '10px', borderRight: '1px solid black' }}>Image</th>
            <th style={{ padding: '10px', borderRight: '1px solid black' }}>Cuisine</th>
            <th style={{ padding: '10px', borderRight: '1px solid black' }}>Food Type</th>
            <th style={{ padding: '10px', borderRight: '1px solid black' }}>Customizations</th>
            <th style={{ padding: '10px' }}>Filters</th>
          </tr>
        </thead>
        <tbody>
          {products && products.length > 0 ? (
            products.map(product => (
              <tr key={product._id} style={{ borderBottom: '1px solid black' }}>
                <td style={{ padding: '10px', borderRight: '1px solid black' }}>{product.itemname}</td>
                <td style={{ padding: '10px', borderRight: '1px solid black' }}>{product.description}</td>
                <td style={{ padding: '10px', borderRight: '1px solid black' }}>{product.baseprice}</td>
                <td style={{ padding: '10px', borderRight: '1px solid black' }}>{product.category}</td>
                <td style={{ padding: '10px', borderRight: '1px solid black' }}>{product.subcategory}</td>
                <td style={{ padding: '10px', borderRight: '1px solid black' }}>{product.discount}</td>
                <td style={{ padding: '10px', borderRight: '1px solid black' }}>{product.quantityavailable}</td>
                <td style={{ padding: '10px', borderRight: '1px solid black' }}>
                <a href={product.image}>images</a>

                </td>
               
                <td style={{ padding: '10px', borderRight: '1px solid black' }}>{product.cuisine}</td>
                <td style={{ padding: '10px', borderRight: '1px solid black' }}>{product.foodtype}</td>
                <td style={{ padding: '10px', borderRight: '1px solid black' }}>
                  
                  {Array.isArray(product.customizations) ? product.customizations.map((custom, index) => (
                    <div key={index}>{custom.type}: {custom.data}</div>
                  )) : product.customizations}
                </td>

                <td style={{ padding: '10px' }}>
                  {product.filters && typeof product.filters === 'object'
                    ? Object.entries(product.filters).map(([key, value]) => (
                      <div key={key}>{key}: {value}</div>
                    ))
                    : product.filters}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="12" style={{ textAlign: 'center' }}>Loading...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ProductsTable;
