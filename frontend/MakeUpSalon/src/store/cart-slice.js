import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalPrice: 0,
    },
    reducers: {
        addToCart: (state, action) => {
            state.items = [];
            state.totalPrice = 0;
            const newTreatment = action.payload;

            state.items.push(newTreatment);
            state.totalPrice += newTreatment.price;
        },
        removeFromCart: (state, action) => {
            const treatmentRemoved = action.payload;
            state.items = state.items.filter((item) => item.treatmentId !== treatmentRemoved.treatmentId);
            state.totalPrice -= treatmentRemoved.price;
        },
        clearCart: (state) => {
            state.items = [];
            state.totalPrice = 0;
        }
    }

});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;