import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Basket } from "../../app/models/basket";
import agent from "../../app/api/agent";

type BasketState = {
  basket: Basket | null;
  status: string;
};

const initialState: BasketState = {
  basket: null,
  status: "idle",
};

export const addBasketItemAsync = createAsyncThunk(
  "basket/addBasketItem",
  async ({
    productId,
    quantity = 1,
  }: {
    productId: number;
    quantity?: number;
  }) => {
    try {
      return await agent.Basket.addItem(productId, quantity);
    } catch (error) {
      console.error(error);
    }
  }
);

export const removeBasketItemAsync = createAsyncThunk(
  "basket/removeBasketItem",
  async ({ productId, quantity }: { productId: number; quantity: number }) => {
    try {
      await agent.Basket.removeItem(productId, quantity);
    } catch (error) {
      console.error(error);
    }
  }
);

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    setBasket: (state, action) => {
      state.basket = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addBasketItemAsync.pending, (state, action) => {
      state.status = "pendingAddItem" + action.meta.arg.productId;
    });
    builder.addCase(addBasketItemAsync.fulfilled, (state, action) => {
      state.status = "idle";
      state.basket = action.payload;
    });
    builder.addCase(addBasketItemAsync.rejected, (state) => {
      state.status = "idle";
    });
    builder.addCase(removeBasketItemAsync.pending, (state, action) => {
      state.status = "pendingRemoveItem" + action.meta.arg.productId;
    });
    builder.addCase(removeBasketItemAsync.fulfilled, (state, action) => {
      const { productId, quantity } = action.meta.arg;
      if (!state.basket) return;
      const item = state.basket.items.find(
        (item) => item.productId === productId
      );
      if (!item) return;
      if (item.quantity > quantity) {
        item.quantity -= quantity;
      } else {
        state.basket.items = state.basket.items.filter(
          (item) => item.productId !== productId
        );
      }
      state.status = "idle";
    });
    builder.addCase(removeBasketItemAsync.rejected, (state) => {
      state.status = "idle";
    });
  },
});

export const { setBasket } = basketSlice.actions;
