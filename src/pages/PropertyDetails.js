import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Card, Carousel, ListGroup, Row, Col } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa'; // Import star icon
import config from '../config';

function PropertyDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPropertyDetails();
  }, [id]);

  const fetchPropertyDetails = async () => {
    try {
      const response = await axios.get(`${config.API_BASE_URL}api/properties/${id}`);
      setProperty(response.data);
    } catch (error) {
      console.error('Error fetching property details:', error);
      setError('Failed to load property details.');
    } finally {
      setLoading(false);
    }
  };

  // Helper function to group images into chunks
  const chunkImages = (images, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < images.length; i += chunkSize) {
      chunks.push(images.slice(i, i + chunkSize));
    }
    return chunks;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!property) {
    return <div>No property details available.</div>;
  }

  // Set chunk size to 8 for displaying 8 images per slide
  const imageChunks = property.images ? chunkImages(property.images, 8) : [];

  // Helper function to render star icons
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(<FaStar key={i} color={i < rating ? 'gold' : 'lightgray'} />);
    }
    return stars;
  };

  return (
    <Container fluid className="my-4 px-0">
      {/* Carousel for property images */}
      {property.images && property.images.length > 0 && (
        <Carousel className="mb-4" style={{ width: '100vw', margin: '0 auto' }}>
          {imageChunks.map((chunk, index) => (
            <Carousel.Item key={index}>
              <Row noGutters>
                {/* Render images */}
                {chunk.map((image, idx) => (
                  <Col key={idx} xs={12} md={3} className="p-1">
                    <img
                      className="d-block w-100"
                      src={image}
                      alt={`Property image ${index * 8 + idx + 1}`}
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                  </Col>
                ))}
                {/* Fill remaining spots with placeholders */}
                {Array.from({ length: 8 - chunk.length }).map((_, idx) => (
                  <Col key={`placeholder-${idx}`} xs={12} md={3} className="p-1">
                    <div
                      style={{
                        height: '200px',
                        backgroundColor: '#f8f9fa',
                        // border: '1px solid #ddd',
                      }}
                    ></div>
                  </Col>
                ))}
              </Row>
            </Carousel.Item>
          ))}
        </Carousel>
      )}

      {/* Main Container for aligned content */}
      <Container className="px-4">
        {/* Property Title and Address */}
        <div className="text-center mb-4">
          <h2>{property.title}</h2>
          <p className="text-lowercase text-muted">{property.location.address}</p>
        </div>

        {/* Property Details Table */}
        <div className="border p-2 mb-4">
          <Row>
            <Col className="border-end text-center">
              <h4>Price</h4>
              <p>${property.price}/month</p>
            </Col>
            <Col className="border-end text-center">
              <h4>Safety Score</h4>
              <p>{property.safetyScore}/10</p>
            </Col>
            <Col className="border-end text-center">
              <h4>Beds</h4>
              <p>{property.beds}</p>
            </Col>
            <Col className="text-center">
              <h4>Baths</h4>
              <p>{property.baths}</p>
            </Col>
          </Row>
        </div>

        {/* About the Apartment Section */}
        <Card className="mb-4">
          <Card.Body>
            <Card.Title>About the Apartment</Card.Title>
            <Card.Text>{property.description}</Card.Text>
          </Card.Body>
        </Card>

        {/* Reviews Section */}
        {property.reviews && property.reviews.length > 0 && (
          <Card className="mt-4">
            <Card.Body>
              <Card.Title>Reviews</Card.Title>
              <ListGroup variant="flush">
                {property.reviews.map((review, index) => (
                  <ListGroup.Item key={index}>
                    <strong>{review.author}</strong>
                    <div className="d-flex align-items-center my-1">
                      {renderStars(review.rating)}
                      <span className="ms-2">{review.subject}</span>
                    </div>
                    <p className="text-muted" style={{ fontSize: '0.9rem' }}>{review.comment}</p>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        )}
      </Container>
    </Container>
  );
}

export default PropertyDetails;
