import React, { useEffect, useState } from 'react';
import { Card, Button, Col, Row, Container, Form } from 'react-bootstrap';  // React Bootstrap components
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/productSlice';  // Redux action to fetch products
// import { addToCart } from '../features/cartSlice';  // Redux action to add items to cart

const Shop = () => {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.product);

  // Local state for selected size and quantity
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddToCart = (product) => {
    if (!selectedSize || quantity <= 0) {
      alert("Please select a size and quantity");
      return;
    }

    const productToAdd = {
      ...product,
      selectedSize,
      quantity
    };

    // Dispatch action to add product to cart with selected size and quantity
    dispatch(addToCart(productToAdd));
  };

  return (
    <Container>
      <h1>Shop</h1>
      <Row>
        {status === 'loading' && <div>Loading...</div>}
        {status === 'failed' && <div>Error: {error}</div>}
        {status === 'succeeded' &&
          products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} className="mb-4">
              <Card>
                <Card.Img variant="top" src={`https://via.placeholder.com/150`} alt={product.shoename} />
                <Card.Body>
                  <Card.Title>{product.shoename}</Card.Title>
                  <Card.Text>{product.description}</Card.Text>
                  <Card.Text><strong>Price: </strong>${product.price}</Card.Text>

                  {/* Size Selection Form */}
                  <Form>
                    <Form.Group controlId={`size-select-${product._id}`}>
                      <Form.Label>Select Size</Form.Label>
                      <Form.Control 
                        as="select"
                        value={selectedSize}
                        onChange={(e) => setSelectedSize(e.target.value)}
                      >
                        <option value="">Select a size</option>
                        {Object.keys(product.quantity).map((size) => (
                          <option key={size} value={size}>
                            {size} ({product.quantity[size]} left)
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>

                    <Form.Group controlId={`quantity-input-${product._id}`}>
                      <Form.Label>Quantity</Form.Label>
                      <Form.Control 
                        type="number" 
                        value={quantity} 
                        onChange={(e) => setQuantity(Math.max(1, e.target.value))}
                        min="1" 
                        max={product.quantity[selectedSize] || 0}
                      />
                    </Form.Group>
                  </Form>

                  <Button
                    variant="primary"
                    // onClick={() => handleAddToCart(product)}
                    disabled={!selectedSize || quantity <= 0 || quantity > product.quantity[selectedSize]}
                  >
                    Add to Cart
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default Shop;
