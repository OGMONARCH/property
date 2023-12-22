import React, { useState, useEffect } from 'react';
import './App.css';
function App({ onFilter }) {
 const [form, setForm] = useState({ price: { min: '', max: '' }, location: '', propertyType: '' });

 const handleFilter = () => {
    onFilter(form.price, form.location, form.propertyType);
 };

 const handleChange = event => {
    const { name, value } = event.target;
    setForm(prevState => ({ ...prevState, [name]: value }));
 };

 useEffect(() => {
  fetch('https://api.datausa.io/api/?key=YOUR_API_KEY')
     .then(response => response.json())
     .then(data => {
       const locationSet = new Set();
       data.forEach(property => locationSet.add(property.location));
       setLocations(Array.from(locationSet));
     });
 }, []);
 
 const handleLocationChange = event => {
  const selectedLocation = event.target.value;
  setForm(prevState => ({ ...prevState, location: selectedLocation }));
 };

 const filterProperties = (price, location, propertyType) => {
  const filtered = properties.filter(property => {
    let isWithinPriceRange = true;
    let isWithinLocation = true;
    let isWithinPropertyType = true;

    if (price.min) {
      isWithinPriceRange = property.price >= price.min;
    }

    if (price.max) {
      isWithinPriceRange = property.price <= price.max;
    }

    if (location) {
      isWithinLocation = property.location === location;
    }

    if (propertyType) {
      isWithinPropertyType = property.property_type === propertyType;
    }

    return isWithinPriceRange && isWithinLocation && isWithinPropertyType;
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
    <label>Property Type</label>
    <select name="propertyType" value={form.propertyType} onChange={handleChange}>
    <option value="">All</option>
    {propertyTypes.map(propertyType => (
      <option key={propertyType} value={propertyType}>
        {propertyType}
      </option>
    ))}
  </select>
  <button onClick={handleFilter}>Filter</button>
</div>
);
}

function PropertyList({ properties }) {
  return (
     <div className="property-list">
       {properties.map(property => (
         <div className="property-card" key={property.id}>
           <img src={property.image_url} alt={property.title} />
           <h2>{property.title}</h2>
           <p>Price: {property.price}</p>
           <p>Location: {property.location}</p>
         </div>
       ))}
     </div>
  );
 }

export default App;


