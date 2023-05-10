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

// create an async thunk - this is a function that will return a promise
export const makeAsyncThunk = <T, A extends any[]>(
  // the type prefix is used to create the action type
  typePrefix: string,
  // the api function is the function we'll call to make the API request
  apiFunction: (...args: A) => Promise<any>,
  // arg names are the names of the arguments we need to pass to the api function
  argNames: (keyof T)[],
) =>
  createAsyncThunk(
    `cart/${typePrefix}`,
    async (args: T, { rejectWithValue }) => {
      try {
        // extract the arguments from the args object
        const extractedArgs = argNames.map((argName) => args[argName]) as A;
        // call the api function
        const response = await apiFunction(...extractedArgs);
        // return the arguments and the response
        return { args, response };
      } catch (error: any) {
        // if there was an error, return the error message
        return rejectWithValue(error.message);
      }
    },
  );

export const ADD_TO_CART = makeAsyncThunk<
  VariantCartAdded,
  [string, string, number]
>('addToCart', addToCart, ['cartId', 'id', 'variantQuantity']);

export const CREATE_CART = makeAsyncThunk<VariantCartAdded, [string, number]>(
  'createCart',
  createCart,
  ['id', 'variantQuantity'],
);

export const DEL_FROM_CART = makeAsyncThunk<any, [string, string]>(
  'delFromCart',
  delFromCart,
  ['cartId', 'id'],
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
      const { args, response } = action.payload;
      const { edges } = response.lines;

      state.items = edges.map((line: CartLine) => {
        const items: CartItem = {
          handle: args.handle,
          id: args.id,
          title: args.title,
          variantQuantity: args.variantQuantity,
        };
        return {
          line: line,
          cartItem: items,
        };
      });
      state.id = response.id;
      state.quantity = response.totalQuantity;
      state.chargeAmount = response.cost.checkoutChargeAmount.amount;
      state.error = null;
    });
    builder.addCase(CREATE_CART.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(CREATE_CART.pending, (state) => {
      state.error = null;
    });
    builder.addCase(ADD_TO_CART.fulfilled, (state, action) => {
      const { args, response } = action.payload;
      const { edges } = response.lines;

      state.items = edges.map((line: CartLine) => {
        const items: CartItem = {
          handle: args.handle,
          id: args.id,
          title: args.title,
          variantQuantity: args.variantQuantity,
        };
        return {
          line: line,
          cartItem: items,
        };
      });

      state.quantity = response.totalQuantity;
      state.chargeAmount = response.cost.checkoutChargeAmount.amount;
      state.error = null;
    });
    builder.addCase(ADD_TO_CART.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(ADD_TO_CART.pending, (state) => {
      state.error = null;
    });
    builder.addCase(DEL_FROM_CART.fulfilled, (state, action) => {
      const { args, response } = action.payload;
      const { edges } = response.lines;

      state.items = edges.map((line: CartLine) => {
        const items: CartItem = {
          handle: args.handle,
          id: args.id,
          title: args.title,
          variantQuantity: args.variantQuantity,
        };
        return {
          line: line,
          cartItem: items,
        };
      });

      state.quantity = response.totalQuantity;
      state.chargeAmount = response.cost.checkoutChargeAmount.amount;
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
