import { configureStore } from "@reduxjs/toolkit";
import cartReducer, {
  addItem,
  removeItem,
  updateQuantity,
  clearCart,
  toggleCart,
  openCart,
  closeCart,
} from "./cart.slice";
import { Product } from "@/src/types/product.types";

describe("Cart Slice", () => {
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
    description: "Descrição do produto",
    price: 10.5,
    image: "https://example.com/image.jpg",
  };

  const mockProduct2: Product = {
    id: "2",
    title: "Produto Teste 2",
    description: "Descrição do produto 2",
    price: 20.0,
    image: "https://example.com/image2.jpg",
  };

  describe("addItem", () => {
    it("should add a new item to the cart", () => {
      const store = createMockStore();
      store.dispatch(addItem(mockProduct));

      const state = store.getState().cart;
      expect(state.items).toHaveLength(1);
      expect(state.items[0]).toEqual({
        ...mockProduct,
        quantity: 1,
      });
      expect(state.total).toBe(10.5);
    });

    it("should increment quantity if item already exists", () => {
      const store = createMockStore();
      store.dispatch(addItem(mockProduct));
      store.dispatch(addItem(mockProduct));

      const state = store.getState().cart;
      expect(state.items).toHaveLength(1);
      expect(state.items[0].quantity).toBe(2);
      expect(state.total).toBe(21.0);
    });

    it("should add multiple different items", () => {
      const store = createMockStore();
      store.dispatch(addItem(mockProduct));
      store.dispatch(addItem(mockProduct2));

      const state = store.getState().cart;
      expect(state.items).toHaveLength(2);
      expect(state.total).toBe(30.5);
    });
  });

  describe("removeItem", () => {
    it("should remove an item from the cart", () => {
      const store = createMockStore();
      store.dispatch(addItem(mockProduct));
      store.dispatch(addItem(mockProduct2));
      store.dispatch(removeItem("1"));

      const state = store.getState().cart;
      expect(state.items).toHaveLength(1);
      expect(state.items[0].id).toBe("2");
      expect(state.total).toBe(20.0);
    });

    it("should recalculate total after removing item", () => {
      const store = createMockStore();
      store.dispatch(addItem(mockProduct));
      store.dispatch(addItem(mockProduct));
      store.dispatch(removeItem("1"));

      const state = store.getState().cart;
      expect(state.items).toHaveLength(0);
      expect(state.total).toBe(0);
    });
  });

  describe("updateQuantity", () => {
    it("should update item quantity", () => {
      const store = createMockStore();
      store.dispatch(addItem(mockProduct));
      store.dispatch(updateQuantity({ id: "1", quantity: 5 }));

      const state = store.getState().cart;
      expect(state.items[0].quantity).toBe(5);
      expect(state.total).toBe(52.5);
    });

    it("should remove item if quantity is 0 or less", () => {
      const store = createMockStore();
      store.dispatch(addItem(mockProduct));
      store.dispatch(updateQuantity({ id: "1", quantity: 0 }));

      const state = store.getState().cart;
      expect(state.items).toHaveLength(0);
      expect(state.total).toBe(0);
    });

    it("should do nothing if item does not exist", () => {
      const store = createMockStore();
      store.dispatch(addItem(mockProduct));
      const initialState = store.getState().cart;
      
      store.dispatch(updateQuantity({ id: "999", quantity: 5 }));
      
      const state = store.getState().cart;
      expect(state.items).toEqual(initialState.items);
      expect(state.total).toBe(initialState.total);
    });
  });

  describe("clearCart", () => {
    it("should clear all items from the cart", () => {
      const store = createMockStore();
      store.dispatch(addItem(mockProduct));
      store.dispatch(addItem(mockProduct2));
      store.dispatch(clearCart());

      const state = store.getState().cart;
      expect(state.items).toHaveLength(0);
      expect(state.total).toBe(0);
    });
  });

  describe("toggleCart", () => {
    it("should toggle cart state from closed to open", () => {
      const store = createMockStore();
      expect(store.getState().cart.isOpen).toBe(false);

      store.dispatch(toggleCart());
      expect(store.getState().cart.isOpen).toBe(true);
    });

    it("should toggle cart state from open to closed", () => {
      const store = createMockStore();
      store.dispatch(openCart());
      expect(store.getState().cart.isOpen).toBe(true);

      store.dispatch(toggleCart());
      expect(store.getState().cart.isOpen).toBe(false);
    });
  });

  describe("openCart", () => {
    it("should open the cart", () => {
      const store = createMockStore();
      expect(store.getState().cart.isOpen).toBe(false);

      store.dispatch(openCart());
      expect(store.getState().cart.isOpen).toBe(true);
    });
  });

  describe("closeCart", () => {
    it("should close the cart", () => {
      const store = createMockStore();
      store.dispatch(openCart());
      expect(store.getState().cart.isOpen).toBe(true);

      store.dispatch(closeCart());
      expect(store.getState().cart.isOpen).toBe(false);
    });
  });

  describe("total calculation", () => {
    it("should calculate total correctly with multiple items and quantities", () => {
      const store = createMockStore();
      store.dispatch(addItem(mockProduct)); 
      store.dispatch(addItem(mockProduct)); 
      store.dispatch(addItem(mockProduct2)); 
      store.dispatch(updateQuantity({ id: "2", quantity: 3 })); 

      const state = store.getState().cart;
      expect(state.total).toBe(81.0); // product 1: 10.5 * 2 = 21, product 2: 20 * 3 = 60, total = 81
    });

    it("should calculate zero total when cart is empty", () => {
      const store = createMockStore();
      const state = store.getState().cart;
      expect(state.total).toBe(0);
    });
  });
});

