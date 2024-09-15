import React, { useState } from 'react';
import { Form, Col, Row } from 'react-bootstrap';

function Filters({ onFilterChange }) {
  const [maxPrice, setMaxPrice] = useState('');
  const [inclusivity, setInclusivity] = useState([]);

  const handlePriceChange = (e) => {
    setMaxPrice(e.target.value);
    onFilterChange({ maxPrice: e.target.value });
  };

  const handleInclusivityChange = (e) => {
    const { value, checked } = e.target;
    let updatedInclusivity = [...inclusivity];

    if (checked) {
      updatedInclusivity.push(value);
    } else {
      updatedInclusivity = updatedInclusivity.filter((item) => item !== value);
    }

    setInclusivity(updatedInclusivity);
    onFilterChange({ inclusivity: updatedInclusivity });
  };

  return (
    <Form className="my-4">
      <Row>
        <Col md={4}>
          <Form.Group controlId="formMaxPrice">
            <Form.Label>Max Price</Form.Label>
            <Form.Control
              type="number"
              value={maxPrice}
              onChange={handlePriceChange}
              placeholder="Enter max price"
            />
          </Form.Group>
        </Col>
        <Col md={8}>
          <Form.Group controlId="formInclusivity">
            <Form.Label>Inclusivity Features</Form.Label>
            <div>
              <Form.Check
                inline
                label="LGBTQ+ Friendly"
                type="checkbox"
                value="LGBTQ+ Friendly"
                onChange={handleInclusivityChange}
              />
              <Form.Check
                inline
                label="Disability Access"
                type="checkbox"
                value="Disability Access"
                onChange={handleInclusivityChange}
              />
              <Form.Check
                inline
                label="Pet Friendly"
                type="checkbox"
                value="Pet Friendly"
                onChange={handleInclusivityChange}
              />
            </div>
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
}

export default Filters;
