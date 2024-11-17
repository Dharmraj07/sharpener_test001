// src/features/productSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async Thunks
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await fetch('http://localhost:5000/api/product');
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
});

export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (productData) => {
    const response = await fetch('http://localhost:5000/api/product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });
    if (!response.ok) {
      throw new Error('Failed to add product');
    }
    return response.json();
  }
);

// Slice
const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Fetch products
    builder.addCase(fetchProducts.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.products = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });

    // Add product
    builder.addCase(addProduct.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(addProduct.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.products.push(action.payload);
    });
    builder.addCase(addProduct.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
  },
});

export default productSlice.reducer;
