import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addToCart, createCart, delFromCart } from 'libs/shopify/storefront';
import { VariantCartAdded } from 'types';
import { CartItem, CartLine, CartLineItem } from 'types/cartTypes/cart';

type InitialSlice = {
  items: CartLineItem[];
  id: null | string;
  quantity: number;
  chargeAmount: string | number;
  error: null | string;
};

const initialState: InitialSlice = {
  items: [],
  id: null,
  quantity: 0,
  chargeAmount: 0,
  error: null,
};

export const CREATE_CART = createAsyncThunk(
  'cart/createCart',
  async (item: VariantCartAdded, { rejectWithValue }) => {
    const { id, variantQuantity } = item;
    try {
      const cartCreated: any = await createCart(id, variantQuantity);
      return { item, cartCreated };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const ADD_TO_CART = createAsyncThunk(
  'cart/addToCart',
  async (item: VariantCartAdded, { rejectWithValue }) => {
    const { cartId, id, variantQuantity } = item;
    try {
      const cartUpdated: any = await addToCart(cartId, id, variantQuantity);
      return { item, cartUpdated };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const DEL_FROM_CART = createAsyncThunk(
  'cart/delFromCart',
  async (item: any, { rejectWithValue }) => {
    const { cartId, id } = item;
    try {
      const cartDeleted: any = await delFromCart(cartId, id);
      return { item, cartDeleted };
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
      const { edges } = cartCreated.lines;

      state.items = edges.map((line: CartLine) => {
        const items: CartItem = {
          handle: item.handle,
          id: item.id,
          title: item.title,
          variantQuantity: item.variantQuantity,
        };
        return {
          line: line,
          cartItem: items,
        };
      });
      state.id = cartCreated.id;
      state.quantity = cartCreated.totalQuantity;
      state.chargeAmount = cartCreated.cost.checkoutChargeAmount.amount;
      state.error = null;
    });
    builder.addCase(CREATE_CART.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(CREATE_CART.pending, (state) => {
      state.error = null;
    });
    builder.addCase(ADD_TO_CART.fulfilled, (state, action) => {
      const { item, cartUpdated } = action.payload;
      const { edges } = cartUpdated.lines;

      state.items = edges.map((line: CartLine) => {
        console.log(line);
        const items: CartItem = {
          handle: item.handle,
          id: item.id,
          title: item.title,
          variantQuantity: item.variantQuantity,
        };
        return {
          line: line,
          cartItem: items,
        };
      });

      state.quantity = cartUpdated.totalQuantity;
      state.chargeAmount = cartUpdated.cost.checkoutChargeAmount.amount;
      state.error = null;
    });
    builder.addCase(ADD_TO_CART.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(ADD_TO_CART.pending, (state) => {
      state.error = null;
    });
    builder.addCase(DEL_FROM_CART.fulfilled, (state, action) => {
      const { item, cartDeleted } = action.payload;
      const { edges } = cartDeleted.lines;

      state.items = edges.map((line: CartLine) => {
        const items: CartItem = {
          handle: item.handle,
          id: item.id,
          title: item.title,
          variantQuantity: item.variantQuantity,
        };
        return {
          line: line,
          cartItem: items,
        };
      });
      state.quantity = cartDeleted.totalQuantity;
      state.chargeAmount = cartDeleted.cost.checkoutChargeAmount.amount;
      state.error = null;
    });
    builder.addCase(DEL_FROM_CART.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(DEL_FROM_CART.pending, (state) => {
      state.error = null;
    });
  },
});

export const { CLEAR_CART } = cartSlice.actions;

export default cartSlice.reducer;
