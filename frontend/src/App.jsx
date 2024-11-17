import React from 'react';
import {   Router, Route, Link, Routes } from 'react-router-dom';  // Import Routes instead of Switch
import { Navbar, Nav, Container } from 'react-bootstrap';  // Import Bootstrap components
import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap CSS
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Seller from './pages/Seller';

// // Example components for Seller, Buyer, and Cart
// const Seller = () => <div><h2>Seller Page</h2></div>;
// const Shop = () => <div><h2>Buyer Page</h2></div>;
// const Cart = () => <div><h2>Cart Page</h2></div>;



const App = () => {
  return (
    <>
      <div>
        {/* Navbar using React Bootstrap */}
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand as={Link} to="/">Store</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
                <Nav.Link as={Link} to="/seller">Seller</Nav.Link>
                <Nav.Link as={Link} to="/shop">Shop</Nav.Link>
                <Nav.Link as={Link} to="/cart">Cart</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        {/* Routes */}
        <Container className="mt-4">
          <Routes>
            <Route path="/seller" element={<Seller />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/" element={<h2>Welcome to the Store</h2>} />
          </Routes>
        </Container>
      </div>
    </>
  );
};

export default App;
