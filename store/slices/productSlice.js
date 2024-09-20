import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk för att hämta alla produkter från API
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    if (!response.ok) {
      console.log("Fetching products:", response);
      throw new Error("Failed to fetch products");
    }
    return await response.json();
  }
);

// Thunk för att hämta enskild produkt från API
export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id) => {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
     console.log("Response status:", response.status);
     console.log("Response URL:", response.url);
    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }
    return await response.json();
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    selectedProduct: null, // För att lagra enskild produkt
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    productStatus: "idle", // Status för enskild produkt
    error: null,
    productError: null, // Felmeddelande för enskild produkt
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.productStatus = "loading";
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.productStatus = "succeeded";
        state.selectedProduct = action.payload;
        console.log("Product successfully updated in Redux:", action.payload);
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.productStatus = "failed";
        state.productError = action.error.message;
      });
  },
});

export default productSlice.reducer;
