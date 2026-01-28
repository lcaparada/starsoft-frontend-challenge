import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { Cart } from "./Cart";
import { closeCart } from "@/src/store/slices/cart";
import { RootState } from "@/src/store";
import { CartState } from "@/src/store/slices/cart/cart.types";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt || ""} />;
  },
}));

jest.mock("../Icon/Icon", () => ({
  Icon: ({ name, size }: { name: string; size: number }) => (
    <svg data-testid={`icon-${name}`} data-size={size}>
      {name}
    </svg>
  ),
}));

jest.mock("../Button/Button", () => ({
  Button: ({
    label,
    variant,
    disabled,
  }: {
    label: string;
    variant?: string;
    disabled?: boolean;
  }) => (
    <button
      data-testid="cart-button"
      data-variant={variant}
      disabled={disabled}
    >
      {label}
    </button>
  ),
}));

jest.mock("../CartCard/CartCard", () => ({
  CartCard: ({ title }: { title: string }) => (
    <div data-testid="cart-card">{title}</div>
  ),
}));

const mockCartItem = {
  id: "1",
  title: "Test Item",
  description: "Test description",
  price: 12,
  image: "https://example.com/image.jpg",
  quantity: 1,
};

let mockCartState: CartState = {
  items: [mockCartItem],
  isOpen: true,
  total: 32,
};

const mockDispatch = jest.fn();

const getMockState = (): RootState => ({
  cart: mockCartState,
});

type Selector<T> = (state: RootState) => T;

jest.mock("@/src/store/slices/cart", () => ({
  closeCart: jest.fn(() => ({ type: "cart/closeCart" })),
  selectCartIsOpen: jest.fn((state: RootState) => state?.cart?.isOpen ?? false),
  selectCartItems: jest.fn((state: RootState) => state?.cart?.items ?? []),
  selectCartTotal: jest.fn((state: RootState) => state?.cart?.total ?? 0),
}));

jest.mock("@/src/store/hooks", () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: <T,>(selector: Selector<T>): T => {
    return selector(getMockState());
  },
}));

describe("Cart", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockCartState = {
      items: [mockCartItem],
      isOpen: true,
      total: 32,
    };
  });

  it("should render cart sidebar when isOpen is true", () => {
    render(<Cart />);
    const cart = screen.getByLabelText("Carrinho de compras");
    expect(cart).toBeInTheDocument();
  });

  it("should render overlay when isOpen is true", () => {
    const { container } = render(<Cart />);
    const overlay = container.querySelector('[class*="overlay"]');
    expect(overlay).toBeInTheDocument();
  });

  it("should not render overlay when isOpen is false", () => {
    mockCartState.isOpen = false;
    const { container } = render(<Cart />);
    const overlay = container.querySelector('[class*="overlay"]');
    expect(overlay).not.toBeInTheDocument();
  });

  it("should dispatch closeCart when overlay is clicked", () => {
    const { container } = render(<Cart />);
    const overlay = container.querySelector('[class*="overlay"]');

    if (overlay) {
      fireEvent.click(overlay as HTMLElement);
    }

    expect(closeCart).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith(closeCart());
  });

  it("should render close button", () => {
    const { container } = render(<Cart />);
    const closeButton = container.querySelector(
      'button[aria-label="Fechar carrinho"]'
    );
    expect(closeButton).toBeInTheDocument();
  });

  it("should dispatch closeCart when close button is clicked", () => {
    const { container } = render(<Cart />);
    const closeButton = container.querySelector(
      'button[aria-label="Fechar carrinho"]'
    );

    if (closeButton) {
      fireEvent.click(closeButton as HTMLElement);
    }

    expect(closeCart).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith(closeCart());
  });

  it("should render cart title", () => {
    render(<Cart />);
    expect(screen.getByText("Mochila de Compras")).toBeInTheDocument();
  });

  it("should render arrow left icon in close button", () => {
    render(<Cart />);
    expect(screen.getByTestId("icon-arrowLeft")).toBeInTheDocument();
  });

  it("should render cart cards container", () => {
    const { container } = render(<Cart />);
    const cardsContainer = container.querySelector('[class*="cartCardsContainer"]');
    expect(cardsContainer).toBeInTheDocument();
  });

  it("should render CartCard component when items exist", () => {
    render(<Cart />);
    expect(screen.getByTestId("cart-card")).toBeInTheDocument();
    expect(screen.getByText("Test Item")).toBeInTheDocument();
  });

  it("should render empty cart message when items array is empty", () => {
    mockCartState.items = [];
    mockCartState.total = 0;
    render(<Cart />);
    expect(screen.getByText("Seu carrinho está vazio")).toBeInTheDocument();
    expect(screen.queryByTestId("cart-card")).not.toBeInTheDocument();
  });

  it("should render total container when items exist", () => {
    const { container } = render(<Cart />);
    const totalContainer = container.querySelector('[class*="totalContainer"]');
    expect(totalContainer).toBeInTheDocument();
  });

  it("should not render total container when items array is empty", () => {
    mockCartState.items = [];
    mockCartState.total = 0;
    const { container } = render(<Cart />);
    const totalContainer = container.querySelector('[class*="totalContainer"]');
    expect(totalContainer).not.toBeInTheDocument();
  });

  it("should render total text", () => {
    render(<Cart />);
    expect(screen.getByText("TOTAL")).toBeInTheDocument();
  });

  it("should render total value with ETH logo", () => {
    const { container } = render(<Cart />);
    const ethLogo = container.querySelector('img[src="/images/eth-logo.png"]');
    const totalValue = screen.getByText("32.00 ETH");

    expect(ethLogo).toBeInTheDocument();
    expect(ethLogo).toHaveAttribute("alt", "");
    expect(ethLogo).toHaveAttribute("aria-hidden", "true");
    expect(totalValue).toBeInTheDocument();
  });

  it("should render finalize purchase button when items exist", () => {
    render(<Cart />);
    const button = screen.getByTestId("cart-button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("FINALIZAR COMPRA");
    expect(button).toHaveAttribute("data-variant", "primary");
  });

  it("should not render finalize purchase button when items array is empty", () => {
    mockCartState.items = [];
    mockCartState.total = 0;
    render(<Cart />);
    expect(screen.queryByTestId("cart-button")).not.toBeInTheDocument();
  });

  it("should apply open class when isOpen is true", () => {
    const { container } = render(<Cart />);
    const cart = container.querySelector("aside");
    expect(cart?.className).toContain("open");
  });

  it("should not apply open class when isOpen is false", () => {
    mockCartState.isOpen = false;
    const { container } = render(<Cart />);
    const cart = container.querySelector("aside");
    expect(cart?.className).not.toContain("open");
    expect(cart).toHaveAttribute("aria-hidden", "true");
    expect(cart).toHaveAttribute("hidden");
  });

  it("should render ETH logo in total with correct dimensions", () => {
    const { container } = render(<Cart />);
    const ethLogo = container.querySelector('img[src="/images/eth-logo.png"]');
    expect(ethLogo).toHaveAttribute("width", "29");
    expect(ethLogo).toHaveAttribute("height", "29");
    expect(ethLogo).toHaveAttribute("alt", "");
    expect(ethLogo).toHaveAttribute("aria-hidden", "true");
  });
});

