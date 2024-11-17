import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addProduct } from '../features/productSlice'
import { Form, Button, Container } from 'react-bootstrap'

const Seller = () => {
  const dispatch = useDispatch()

  const [product, setProduct] = useState({
    shoename: '',
    description: '',
    price: '',
    quantity: {
      S: '',
      M: '',
      L: ''
    }
  })

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target
    if (name.startsWith('quantity')) {
      const size = name.split('-')[1]
      setProduct((prev) => ({
        ...prev,
        quantity: {
          ...prev.quantity,
          [size]: value
        }
      }))
    } else {
      setProduct({
        ...product,
        [name]: value
      })
    }
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    // Dispatch the addProduct action with product data
    dispatch(addProduct(product))
    // Optionally clear the form after submission
    setProduct({
      shoename: '',
      description: '',
      price: '',
      quantity: {
        S: '',
        M: '',
        L: ''
      }
    })
  }

  return (
    <Container>
      <h2>Add Product</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formShoename">
          <Form.Label>Shoe Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter shoe name"
            name="shoename"
            value={product.shoename}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter description"
            name="description"
            value={product.description}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter price"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formQuantityS">
          <Form.Label>Quantity (Size S)</Form.Label>
          <Form.Control
            type="number"
            name="quantity-S"
            value={product.quantity.S}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formQuantityM">
          <Form.Label>Quantity (Size M)</Form.Label>
          <Form.Control
            type="number"
            name="quantity-M"
            value={product.quantity.M}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formQuantityL">
          <Form.Label>Quantity (Size L)</Form.Label>
          <Form.Control
            type="number"
            name="quantity-L"
            value={product.quantity.L}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Product
        </Button>
      </Form>
    </Container>
  )
}

export default Seller
