import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { CartCard } from "./CartCard";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt || ""} />;
  },
}));

jest.mock("../Button/Button", () => ({
  Button: ({
    icon,
    onClick,
  }: {
    icon?: string;
    onClick?: () => void;
  }) => (
    <button data-testid="cart-card-button" data-icon={icon} onClick={onClick}>
      Button
    </button>
  ),
}));

jest.mock("../Counter/Counter", () => ({
  Counter: ({
    value,
    onIncrement,
    onDecrement,
  }: {
    value: number;
    onIncrement: () => void;
    onDecrement: () => void;
  }) => (
    <div data-testid="counter" data-value={value.toString()}>
      <button data-testid="increment" onClick={onIncrement}>
        +
      </button>
      <span>Counter: {value}</span>
      <button data-testid="decrement" onClick={onDecrement}>
        -
      </button>
    </div>
  ),
}));

jest.mock("../ImageWithLoading/ImageWithLoading", () => ({
  ImageWithLoading: (props: React.ImgHTMLAttributes<HTMLImageElement> & { src?: string }) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt || ""} src={props.src} />;
  },
}));

const mockDispatch = jest.fn();

jest.mock("@/src/store/hooks", () => ({
  useAppDispatch: () => mockDispatch,
}));

jest.mock("@/src/store/slices/cart", () => ({
  updateQuantity: jest.fn((payload) => ({
    type: "cart/updateQuantity",
    payload,
  })),
  removeItem: jest.fn((id) => ({ type: "cart/removeItem", payload: id })),
}));

const mockCartItem = {
  id: "1",
  title: "Test Item",
  description: "Test description",
  price: 12,
  image: "https://example.com/image.jpg",
  quantity: 1,
};

describe("CartCard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render cart card wrapper", () => {
    const { container } = render(<CartCard {...mockCartItem} />);
    const wrapper = container.firstChild;
    expect(wrapper).toBeInTheDocument();
    expect((wrapper as HTMLElement).tagName).toBe("DIV");
  });

  it("should render product image", () => {
    const { container } = render(<CartCard {...mockCartItem} />);
    const image = container.querySelector(`img[alt="${mockCartItem.title}"]`);
    expect(image).toBeInTheDocument();
    if (image) {
      expect(image).toHaveAttribute("src", mockCartItem.image);
    }
  });

  it("should render image with correct dimensions", () => {
    const { container } = render(<CartCard {...mockCartItem} />);
    const image = container.querySelector(`img[alt="${mockCartItem.title}"]`);
    expect(image).toBeInTheDocument();
    if (image) {
      expect(image).toHaveAttribute("width", "161");
      expect(image).toHaveAttribute("height", "161");
    }
  });

  it("should render product title", () => {
    render(<CartCard {...mockCartItem} />);
    expect(screen.getByText(mockCartItem.title)).toBeInTheDocument();
  });

  it("should render product description", () => {
    render(<CartCard {...mockCartItem} />);
    expect(screen.getByText(mockCartItem.description)).toBeInTheDocument();
  });

  it("should render price with ETH logo", () => {
    const { container } = render(<CartCard {...mockCartItem} />);
    const ethLogo = container.querySelector('img[alt="ETH Logo"]');
    const priceText = screen.getByText(`${mockCartItem.price} ETH`);

    expect(ethLogo).toBeInTheDocument();
    expect(priceText).toBeInTheDocument();
  });

  it("should render ETH logo with correct dimensions", () => {
    const { container } = render(<CartCard {...mockCartItem} />);
    const ethLogo = container.querySelector('img[alt="ETH Logo"]');
    expect(ethLogo).toHaveAttribute("width", "29");
    expect(ethLogo).toHaveAttribute("height", "29");
  });

  it("should render counter component with correct value", () => {
    render(<CartCard {...mockCartItem} />);
    const counter = screen.getByTestId("counter");
    expect(counter).toBeInTheDocument();
    expect(counter).toHaveAttribute("data-value", mockCartItem.quantity.toString());
  });

  it("should render delete button with trash icon", () => {
    render(<CartCard {...mockCartItem} />);
    const button = screen.getByTestId("cart-card-button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("data-icon", "trash");
  });

  it("should render image container section", () => {
    const { container } = render(<CartCard {...mockCartItem} />);
    const sections = container.querySelectorAll("section");
    const imageContainer = sections[0];
    expect(imageContainer).toBeInTheDocument();
  });

  it("should render info container section", () => {
    const { container } = render(<CartCard {...mockCartItem} />);
    const sections = container.querySelectorAll("section");
    const infoContainer = sections[1];
    expect(infoContainer).toBeInTheDocument();
  });

  it("should render price container", () => {
    const { container } = render(<CartCard {...mockCartItem} />);
    const priceContainer = container.querySelector(".priceContainer");
    expect(priceContainer).toBeInTheDocument();
  });

  it("should render counter container", () => {
    const { container } = render(<CartCard {...mockCartItem} />);
    const counterContainer = container.querySelector(".counterContainer");
    expect(counterContainer).toBeInTheDocument();
  });

  it("should have correct structure with all elements", () => {
    const { container } = render(<CartCard {...mockCartItem} />);
    const wrapper = container.firstChild;
    const sections = (wrapper as HTMLElement).querySelectorAll("section");

    expect(sections?.length).toBe(2);
    expect(screen.getByText(mockCartItem.title)).toBeInTheDocument();
    expect(screen.getByTestId("counter")).toBeInTheDocument();
    expect(screen.getByTestId("cart-card-button")).toBeInTheDocument();
  });

  it("should dispatch updateQuantity when increment is clicked", () => {
    render(<CartCard {...mockCartItem} />);
    const incrementButton = screen.getByTestId("increment");

    fireEvent.click(incrementButton);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "cart/updateQuantity",
      payload: { id: mockCartItem.id, quantity: mockCartItem.quantity + 1 },
    });
  });

  it("should dispatch updateQuantity when decrement is clicked and quantity > 1", () => {
    const itemWithQuantity2 = { ...mockCartItem, quantity: 2 };
    render(<CartCard {...itemWithQuantity2} />);
    const decrementButton = screen.getByTestId("decrement");

    fireEvent.click(decrementButton);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "cart/updateQuantity",
      payload: { id: itemWithQuantity2.id, quantity: 1 },
    });
  });

  it("should dispatch removeItem when decrement is clicked and quantity is 1", () => {
    render(<CartCard {...mockCartItem} />);
    const decrementButton = screen.getByTestId("decrement");

    fireEvent.click(decrementButton);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "cart/removeItem",
      payload: mockCartItem.id,
    });
  });

  it("should dispatch removeItem when delete button is clicked", () => {
    render(<CartCard {...mockCartItem} />);
    const deleteButton = screen.getByTestId("cart-card-button");

    fireEvent.click(deleteButton);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "cart/removeItem",
      payload: mockCartItem.id,
    });
  });
});

