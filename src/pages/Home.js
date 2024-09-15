import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function Home() {
  return (
    <Container
      className="p-5 my-5 rounded"
      style={{
        backgroundImage: `url('https://www.creativefabrica.com/wp-content/uploads/2023/03/02/Loft-Living-Room-Fancy-Apartment-62960732-1.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        color: 'white',
        width: '100%',
        height: '80vh',
      }}
    >
      <h1
        style={{
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
        }}
      >
        Welcome to SafeNest
      </h1>
      <p
        style={{
          textShadow: '2px 2px 4px rgba(0, 0, 0, 1.8)', // Add text shadow here
          fontSize: '1.3rem', // Adjust font size here
        }}
      >
        Find your affordable, safe, and inclusive home near campus.
      </p>
      <LinkContainer to="/listings">
        <Button variant="primary">View Listings</Button>
      </LinkContainer>
    </Container>
  );
}

export default Home;
