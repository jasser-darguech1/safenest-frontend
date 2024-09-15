import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropertyCard from '../components/PropertyCard';
import Filters from '../components/Filters';
import { Container, Row, Col } from 'react-bootstrap';
import config from '../config';
function Listings() {
  const [properties, setProperties] = useState([]);
  const [filters, setFilters] = useState({
    maxPrice: '',
    inclusivity: [],
  });

  useEffect(() => {
    fetchProperties();
  }, [filters]);

  const fetchProperties = async () => {
    try {
      const response = await axios.get(`${config.API_BASE_URL}api/properties`, { params: filters });
      console.log(response.data); // Debugging: Log the fetched data
      setProperties(response.data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
    }));
  };

  return (
    <Container>
      <h2 className="my-4">Property Listings</h2>
      <Filters onFilterChange={handleFilterChange} />
      <Row>
        {properties.map((property) => (
          <Col key={property.id} sm={12} md={6} lg={4} className="mb-4">
            <PropertyCard property={property} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Listings;
