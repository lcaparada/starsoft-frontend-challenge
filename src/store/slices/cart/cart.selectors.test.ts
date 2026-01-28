import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart.slice";
import {
  addItem,
  openCart,
} from "./cart.slice";
import {
  selectCartItems,
  selectCartTotal,
  selectCartIsOpen,
  selectCartItemsCount,
  selectCartItemById,
} from "./cart.selectors";
import { Product } from "@/src/types/product.types";

describe("Cart Selectors", () => {
  const createMockStore = () => {
    return configureStore({
      reducer: {
        cart: cartReducer,
      },
    });
  };

  const mockProduct: Product = {
    id: "1",
    title: "Produto Teste",
    description: "Descrição",
    price: 10.0,
    image: "https://example.com/image.jpg",
  };

  const mockProduct2: Product = {
    id: "2",
    title: "Produto Teste 2",
    description: "Descrição 2",
    price: 20.0,
    image: "https://example.com/image2.jpg",
  };

  describe("selectCartItems", () => {
    it("should return empty array when cart is empty", () => {
      const store = createMockStore();
      const items = selectCartItems(store.getState());
      expect(items).toEqual([]);
    });

    it("should return cart items", () => {
      const store = createMockStore();
      store.dispatch(addItem(mockProduct));
      store.dispatch(addItem(mockProduct2));

      const items = selectCartItems(store.getState());
      expect(items).toHaveLength(2);
      expect(items[0].id).toBe("1");
      expect(items[1].id).toBe("2");
    });
  });

  describe("selectCartTotal", () => {
    it("should return 0 when cart is empty", () => {
      const store = createMockStore();
      const total = selectCartTotal(store.getState());
      expect(total).toBe(0);
    });

    it("should return correct cart total", () => {
      const store = createMockStore();
      store.dispatch(addItem(mockProduct));
      store.dispatch(addItem(mockProduct2));

      const total = selectCartTotal(store.getState());
      expect(total).toBe(30.0);
    });

    it("should calculate total considering quantities", () => {
      const store = createMockStore();
      store.dispatch(addItem(mockProduct));
      store.dispatch(addItem(mockProduct));
      store.dispatch(addItem(mockProduct2));

      const total = selectCartTotal(store.getState());
      expect(total).toBe(40.0); 
    });
  });

  describe("selectCartIsOpen", () => {
    it("should return false when cart is closed", () => {
      const store = createMockStore();
      const isOpen = selectCartIsOpen(store.getState());
      expect(isOpen).toBe(false);
    });

    it("should return true when cart is open", () => {
      const store = createMockStore();
      store.dispatch(openCart());
      const isOpen = selectCartIsOpen(store.getState());
      expect(isOpen).toBe(true);
    });
  });

  describe("selectCartItemsCount", () => {
    it("should return 0 when cart is empty", () => {
      const store = createMockStore();
      const count = selectCartItemsCount(store.getState());
      expect(count).toBe(0);
    });

    it("should return total items count", () => {
      const store = createMockStore();
      store.dispatch(addItem(mockProduct));
      store.dispatch(addItem(mockProduct));
      store.dispatch(addItem(mockProduct2));

      const count = selectCartItemsCount(store.getState());
      expect(count).toBe(3); 
    });
  });

  describe("selectCartItemById", () => {
    it("should return undefined when item does not exist", () => {
      const store = createMockStore();
      const selector = selectCartItemById("999");
      const item = selector(store.getState());
      expect(item).toBeUndefined();
    });

    it("should return correct item by ID", () => {
      const store = createMockStore();
      store.dispatch(addItem(mockProduct));
      store.dispatch(addItem(mockProduct2));

      const selector = selectCartItemById("1");
      const item = selector(store.getState());
      
      expect(item).toBeDefined();
      expect(item?.id).toBe("1");
      expect(item?.title).toBe("Produto Teste");
    });

    it("should return item with correct quantity", () => {
      const store = createMockStore();
      store.dispatch(addItem(mockProduct));
      store.dispatch(addItem(mockProduct));

      const selector = selectCartItemById("1");
      const item = selector(store.getState());
      
      expect(item?.quantity).toBe(2);
    });
  });
});

