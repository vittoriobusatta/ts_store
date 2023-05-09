import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createCart } from 'libs/shopify/storefront';

type Initial = {
  items: [];
  id: null | string;
  quantity: number;
  chargeAmount: number;
  error: null | string;
};

const initialState: Initial = {
  items: [],
  id: null,
  quantity: 0,
  chargeAmount: 0,
  error: null,
};

type CreateCartItem = {
  id: string;
  title: string;
  handle: string;
  productType: string;
  variantQuantity: number;
  image: {
    src: string;
    alt: string;
  };
  price: number;
};

export const CREATE_CART = createAsyncThunk(
  'cart/createCart',
  async (item: CreateCartItem, { rejectWithValue }) => {
    const { id, variantQuantity } = item;
    try {
      const cartCreated = await createCart(id, variantQuantity);
      return { item, cartCreated };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    CLEAR_CART: (state) => {
      state.items = [];
      state.id = null;
      state.quantity = 0;
      state.chargeAmount = 0;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(CREATE_CART.fulfilled, (state, action) => {
      const { item, cartCreated } = action.payload;

      state.items = cartCreated.lines.edges.map((line: any) => {
        const items = {
          handle: item.handle,
          id: item.id,
          title: item.title,
          variantQuantity: item.variantQuantity,
        };
        return {
          line: line,
          item: items,
        };
      });
      state.id = cartCreated.id;
      state.quantity = cartCreated.totalQuantity;
      state.chargeAmount = cartCreated.cost.checkoutChargeAmount.amount;
      state.error = null;
    });
  },
});

export const { CLEAR_CART } = cartSlice.actions;

// It is a convention to export reducer as a default export:
export default cartSlice.reducer;
