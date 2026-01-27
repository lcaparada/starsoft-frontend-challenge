import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/src/store";
import { CartItem } from "./cart.types";

const selectCartState = (state: RootState) => state.cart;

export const selectCartItems = createSelector(
  [selectCartState],
  (cart) => cart?.items ?? []
);

export const selectCartTotal = createSelector(
  [selectCartState],
  (cart) => cart?.total ?? 0
);

export const selectCartIsOpen = createSelector(
  [selectCartState],
  (cart) => cart?.isOpen ?? false
);

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (items) => items.reduce((sum: number, item: CartItem) => sum + item.quantity, 0)
);

export const selectCartItemById = (id: string) =>
  createSelector([selectCartItems], (items) =>
    items.find((item: CartItem) => item.id === id)
  );