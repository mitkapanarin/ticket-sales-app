import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BasketItem {
    _id: string;
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
        addToCart: (state, action: PayloadAction<BasketItem>) => {
            return {
                ...state,
                basketItems: [...state.basketItems, action.payload],
            };
        },
        removeOneItemFromCart: (state, action: PayloadAction<string>) => {
            const updatedBasketItems = state.basketItems.filter(
                (item) => item._id !== action.payload
            );
            return {
                ...state,
                basketItems: updatedBasketItems,
            };
        },
        resetCart: () => initialState,
    },
});

export const { addToCart, removeOneItemFromCart, resetCart } =
    basketSlice.actions;

export default basketSlice.reducer;
