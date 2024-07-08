import React, { useState } from 'react';
import axios from 'axios';

const UpdateProductForm = () => {
  const [id, setId] = useState('');
  const [itemname, setItemname] = useState('');
  const [description, setDescription] = useState('');
  const [baseprice, setBaseprice] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [discount, setDiscount] = useState('');
  const [quantityavailable, setQuantityavailable] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [foodtype, setFoodtype] = useState('');
  const [customizations, setCustomizations] = useState('');
  const [filters, setFilters] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('itemname', itemname);
    formData.append('description', description);
    formData.append('baseprice', baseprice);
    formData.append('category', category);
    formData.append('subcategory', subcategory);
    formData.append('discount', discount);
    formData.append('quantityavailable', quantityavailable);
    formData.append('cuisine', cuisine);
    formData.append('foodtype', foodtype);
    formData.append('customizations', customizations);
    formData.append('filters', filters);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await axios.put(`https://d6e7-2405-201-301d-f872-794d-acaa-e3ff-b6e8.ngrok-free.app/api/products/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      // Handle success response
    } catch (error) {
      console.error(error);
      // Handle error response
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        ID:
        <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
      </label>
      <br />
      <label>
        Item Name:
        <input type="text" value={itemname} onChange={(e) => setItemname(e.target.value)} />
      </label>
      <br />
      <label>
        Description:
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
      <br />
      <label>
        Base Price:
        <input type="number" value={baseprice} onChange={(e) => setBaseprice(e.target.value)} />
      </label>
      <br />
      <label>
        Category:
        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
      </label>
      <br />
      <label>
        Subcategory:
        <input type="text" value={subcategory} onChange={(e) => setSubcategory(e.target.value)} />
      </label>
      <br />
      <label>
        Discount:
        <input type="number" value={discount} onChange={(e) => setDiscount(e.target.value)} />
      </label>
      <br />
      <label>
        Quantity Available:
        <input type="number" value={quantityavailable} onChange={(e) => setQuantityavailable(e.target.value)} />
      </label>
      <br />
      <label>
        Cuisine:
        <input type="text" value={cuisine} onChange={(e) => setCuisine(e.target.value)} />
      </label>
      <br />
      <label>
        Food Type:
        <input type="text" value={foodtype} onChange={(e) => setFoodtype(e.target.value)} />
      </label>
      <br />
      <label>
        Customizations:
        <input type="text" value={customizations} onChange={(e) => setCustomizations(e.target.value)} />
      </label>
      <br />
      <label>
        Filters:
        <input type="text" value={filters} onChange={(e) => setFilters(e.target.value)} />
      </label>
      <br />
      <label>
        Image:
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      </label>
      <br />
      <button type="submit">Update Product</button>
    </form>
  );
};

export default UpdateProductForm;