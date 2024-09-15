import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function PropertyCard({ property }) {
  const defaultImage = 'https://via.placeholder.com/150'; // Fallback image URL
  
  return (
    <Card style={{ width: '18rem' }}>
      {/* Display the property image or fallback if not available */}
      <Card.Img variant="top" src={property.imageUrl || defaultImage} alt={property.title} />
      
      <Card.Body>
        <Card.Title>{property.title}</Card.Title>
        <Card.Text>
          Price: ${property.price}/month<br />
          Safety Score: {property.safetyScore}/10<br />
          Inclusivity: {property.inclusivityFeatures.join(', ')}
        </Card.Text>
        <Link to={`/listings/${property.id}`}>
          <Button variant="primary">View Details</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default PropertyCard;
