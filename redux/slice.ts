import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { VariantItem } from 'types';
import { addToCart, createCart, delFromCart } from 'libs/shopify/storefront';
import { CartResponse } from 'types/cartTypes';

interface CreateCartResult {
  item: VariantItem;
  cartCreated: CartResponse;
}
interface AddToCartResult {
  item: VariantItem;
  cartUpdated: CartResponse;
}
interface DelFromCartResult {
  item: VariantItem;
  cartDeleted: CartResponse;
}

export const CREATE_CART = createAsyncThunk<CreateCartResult, VariantItem>(
  'cart/CREATE_CART',
  async (item, { rejectWithValue }) => {
    try {
      const cartCreated = await createCart(item.id, item.variantQuantity);
      return { item, cartCreated };
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  },
);

export const ADD_TO_CART = createAsyncThunk<AddToCartResult, VariantItem>(
  'cart/ADD_TO_CART',
  async (item, { rejectWithValue }) => {
    try {
      const cartUpdated = await addToCart(
        item.cartId,
        item.id,
        item.variantQuantity,
      );
      return { item, cartUpdated };
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  },
);

export const DEL_FROM_CART = createAsyncThunk<DelFromCartResult, VariantItem>(
  'cart/DEL_FROM_CART',
  async (item, { rejectWithValue }) => {
    try {
      const cartDeleted = await delFromCart(item.cartId, item.id);
      return { item, cartDeleted };
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  },
);

// export const UPDATE_CART = createAsyncThunk(
//   'cart/UPDATE_CART',
//   async (item, { rejectWithValue }) => {
//     try {
//       const cartUpdated = await delFromCart(
//         item.cartId,
//         item.id,
//         item.variantQuantity,
//       );
//       return { item, cartUpdated };
//     } catch (err) {
//       return rejectWithValue(err.message);
//     }
//   },
// );

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    quantity: 0,
    chargeAmount: 0,
    id: null,
    error: null,
  },
  reducers: {
    CLEAR_CART: (state) => {
      state.items = [];
      state.quantity = 0;
      state.chargeAmount = 0;
      state.id = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(CREATE_CART.fulfilled, (state, action) => {
      const { item, cartCreated } = action.payload;

      state.items = cartCreated.lines.edges.map((line) => {
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
    });
    builder.addCase(CREATE_CART.rejected, (state, action) => {
      state.error = action.error.message;
    });
    // builder.addCase(ADD_TO_CART.fulfilled, (state, action) => {
    //   const { item, cartUpdated } = action.payload;

    //   state.items = cartUpdated.lines.edges.map((line) => {
    //     const items = {
    //       handle: item.handle,
    //       id: item.id,
    //       title: item.title,
    //       variantQuantity: item.variantQuantity,
    //     };
    //     return {
    //       line: line,
    //       item: items,
    //     };
    //   });

    //   state.quantity = cartUpdated.totalQuantity;
    //   state.chargeAmount = cartUpdated.cost.checkoutChargeAmount.amount;
    // });
    // builder.addCase(ADD_TO_CART.rejected, (state, action) => {
    //   state.error = action.error.message;
    // });
    // builder.addCase(DEL_FROM_CART.fulfilled, (state, action) => {
    //   const { item, cartDeleted } = action.payload;

    //   state.items = cartDeleted.lines.edges.map((line) => {
    //     const items = {
    //       handle: item.handle,
    //       id: item.id,
    //       title: item.title,
    //       variantQuantity: item.variantQuantity,
    //     };
    //     return {
    //       line: line,
    //       item: items,
    //     };
    //   });

    //   state.quantity = cartDeleted.totalQuantity;
    //   state.chargeAmount = cartDeleted.cost.checkoutChargeAmount.amount;
    // });
    // builder.addCase(DEL_FROM_CART.rejected, (state, action) => {
    //   state.error = action.error.message;
    // });
  },
});

export const { CLEAR_CART } = cartSlice.actions;

export default cartSlice.reducer;
