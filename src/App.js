import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
 const [properties, setProperties] = useState([]);
 const [filteredProperties, setFilteredProperties] = useState([]);

 useEffect(() => {
    fetch('https://api.datausa.io/api/?key=YOUR_API_KEY')
      .then(response => response.json())
      .then(data => {
        setProperties(data);
        setFilteredProperties(data);
      });
 }, []);

 const filterProperties = (price, location) => {
    const filtered = properties.filter(property => {
      let isWithinPriceRange = true;
      let isWithinLocation = true;

      if (price.min) {
        isWithinPriceRange = property.price >= price.min;
      }

      if (price.max) {
        isWithinPriceRange = property.price <= price.max;
      }

      if (location) {
        isWithinLocation = property.location === location;
      }

      return isWithinPriceRange && isWithinLocation;
    });

    setFilteredProperties(filtered);
 };

 return (
    <div className="App">
      <Filter onFilter={filterProperties} />
      <PropertyList properties={filteredProperties} />
    </div>
 );
}

function Filter({ onFilter }) {
 const [form, setForm] = useState({ price: { min: '', max: '' }, location: '' });

 const handleFilter = () => {
    onFilter(form.price, form.location);
 };

 const handleChange = event => {
    const { name, value } = event.target;
    setForm(prevState => ({ ...prevState, [name]: value }));
 };

 return (
    <div>
      <label>Min Price</label>
      <input name="price.min" value={form.price.min} onChange={handleChange} />
      <label>Max Price</label>
      <input name="price.max" value={form.price.max} onChange={handleChange} />
      <label>Location</label>
      <input name="location" value={form.location} onChange={handleChange} />
      <button onClick={handleFilter}>Filter</button>
    </div>
 );
}

function PropertyList({ properties }) {
 return (
    <div className="property-list">
      {properties.map(property => (
        <div className="property-card" key={property.id}>
          <h2>{property.title}</h2>
          <p>Price: {property.price}</p>
          <p>Location: {property.location}</p>
        </div>
      ))}
    </div>
 );
}

export default App;