import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Cart } from "./Cart";

jest.mock("../Icon/Icon", () => ({
  Icon: ({ name, size }: { name: string; size: number }) => (
    <svg data-testid={`icon-${name}`} data-size={size}>
      {name}
    </svg>
  ),
}));

jest.mock("../Button/Button", () => ({
  Button: ({ label, variant }: { label: string; variant?: string }) => (
    <button data-testid="cart-button" data-variant={variant}>
      {label}
    </button>
  ),
}));

jest.mock("../CartCard/CartCard", () => ({
  CartCard: () => <div data-testid="cart-card">Cart Card</div>,
}));

describe("Cart", () => {
  it("should render cart sidebar when isOpen is true", () => {
    render(<Cart isOpen={true} onClose={() => {}} />);
    const cart = screen.getByLabelText("Carrinho de compras");
    expect(cart).toBeInTheDocument();
  });

  it("should render overlay when isOpen is true", () => {
    const { container } = render(<Cart isOpen={true} onClose={() => {}} />);
    const overlay = container.querySelector(".overlay");
    expect(overlay).toBeInTheDocument();
  });

  it("should not render overlay when isOpen is false", () => {
    const { container } = render(<Cart isOpen={false} onClose={() => {}} />);
    const overlay = container.querySelector(".overlay");
    expect(overlay).not.toBeInTheDocument();
  });

  it("should call onClose when overlay is clicked", () => {
    const handleClose = jest.fn();
    const { container } = render(<Cart isOpen={true} onClose={handleClose} />);
    const overlay = container.querySelector(".overlay");

    if (overlay) {
      (overlay as HTMLElement).click();
    }

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("should render close button", () => {
    const { container } = render(<Cart isOpen={true} onClose={() => {}} />);
    const closeButton = container.querySelector(
      'button[aria-label="Fechar carrinho"]'
    );
    expect(closeButton).toBeInTheDocument();
  });

  it("should call onClose when close button is clicked", () => {
    const handleClose = jest.fn();
    const { container } = render(<Cart isOpen={true} onClose={handleClose} />);
    const closeButton = container.querySelector(
      'button[aria-label="Fechar carrinho"]'
    );

    if (closeButton) {
      (closeButton as HTMLElement).click();
    }

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("should render cart title", () => {
    render(<Cart isOpen={true} onClose={() => {}} />);
    expect(screen.getByText("Mochila de Compras")).toBeInTheDocument();
  });

  it("should render arrow left icon in close button", () => {
    render(<Cart isOpen={true} onClose={() => {}} />);
    expect(screen.getByTestId("icon-arrowLeft")).toBeInTheDocument();
  });

  it("should render cart cards container", () => {
    const { container } = render(<Cart isOpen={true} onClose={() => {}} />);
    const cardsContainer = container.querySelector(".cartCardsContainer");
    expect(cardsContainer).toBeInTheDocument();
  });

  it("should render CartCard component", () => {
    render(<Cart isOpen={true} onClose={() => {}} />);
    expect(screen.getByTestId("cart-card")).toBeInTheDocument();
  });

  it("should render total container", () => {
    const { container } = render(<Cart isOpen={true} onClose={() => {}} />);
    const totalContainer = container.querySelector(".totalContainer");
    expect(totalContainer).toBeInTheDocument();
  });

  it("should render total text", () => {
    render(<Cart isOpen={true} onClose={() => {}} />);
    expect(screen.getByText("TOTAL")).toBeInTheDocument();
  });

  it("should render total value with ETH logo", () => {
    const { container } = render(<Cart isOpen={true} onClose={() => {}} />);
    const ethLogo = container.querySelector('img[alt="ETH Logo"]');
    const totalValue = screen.getByText("32 ETH");

    expect(ethLogo).toBeInTheDocument();
    expect(totalValue).toBeInTheDocument();
  });

  it("should render finalize purchase button", () => {
    render(<Cart isOpen={true} onClose={() => {}} />);
    const button = screen.getByTestId("cart-button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("FINALIZAR COMPRA");
    expect(button).toHaveAttribute("data-variant", "primary");
  });

  it("should apply open class when isOpen is true", () => {
    const { container } = render(<Cart isOpen={true} onClose={() => {}} />);
    const cart = container.querySelector("aside");
    expect(cart?.className).toContain("open");
  });

  it("should not apply open class when isOpen is false", () => {
    const { container } = render(<Cart isOpen={false} onClose={() => {}} />);
    const cart = container.querySelector("aside");
    expect(cart?.className).not.toContain("open");
  });

  it("should render ETH logo in total with correct dimensions", () => {
    const { container } = render(<Cart isOpen={true} onClose={() => {}} />);
    const ethLogo = container.querySelector('img[alt="ETH Logo"]');
    expect(ethLogo).toHaveAttribute("width", "29");
    expect(ethLogo).toHaveAttribute("height", "29");
  });
});

