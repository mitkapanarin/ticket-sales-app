import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BasketItem {
  id: string;
  quantity: number;
  eventData: unknown;
}

interface BasketState {
  basketItems: BasketItem[];
}

const initialState: BasketState = {
  basketItems: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{ id: string; quantity: number; eventData: unknown }>
    ) => {
      const { id, quantity, eventData } = action.payload;
      const existingItemIndex = state.basketItems.findIndex((item) => item.id === id);

      if (existingItemIndex !== -1) {
        // If the item already exists, update its quantity and eventData
        const updatedBasketItems = [...state.basketItems];
        updatedBasketItems[existingItemIndex] = {
          ...state.basketItems[existingItemIndex],
          quantity: state.basketItems[existingItemIndex].quantity + quantity,
          eventData: eventData, // Update eventData
        };

        return {
          ...state,
          basketItems: updatedBasketItems,
        };
      } else {
        // If the item does not exist, add it to the basket with eventData
        const newBasketItem: BasketItem = {
          id,
          quantity,
          eventData,
        };

        return {
          ...state,
          basketItems: [...state.basketItems, newBasketItem],
        };
      }
    },
    removeOneItemFromCart: (state, action: PayloadAction<string>) => {
      const updatedBasketItems = state.basketItems.filter(
        (item) => item.id !== action.payload
      );
      return {
        ...state,
        basketItems: updatedBasketItems,
      };
    },
    resetCart: () => initialState,
  },
});

export const { addToCart, removeOneItemFromCart, resetCart } = basketSlice.actions;

export default basketSlice.reducer;
