import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { CartCard } from "./CartCard";

jest.mock("../Button/Button", () => ({
  Button: ({ icon }: { icon?: string }) => (
    <button data-testid="cart-card-button" data-icon={icon}>
      Button
    </button>
  ),
}));

jest.mock("../Counter/Counter", () => ({
  Counter: ({
    value
  }: {
    value: number;
    onIncrement: () => void;
    onDecrement: () => void;
  }) => (
    <div data-testid="counter" data-value={value}>
      Counter: {value}
    </div>
  ),
}));

describe("CartCard", () => {
  it("should render cart card wrapper", () => {
    const { container } = render(<CartCard />);
    const wrapper = container.firstChild;
    expect(wrapper).toBeInTheDocument();
    expect((wrapper as HTMLElement).tagName).toBe("DIV");
  });

  it("should render product image", () => {
    const { container } = render(<CartCard />);
    const image = container.querySelector('img[alt="Product Card"]');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "https://github.com/shadcn.png");
  });

  it("should render image with correct dimensions", () => {
    const { container } = render(<CartCard />);
    const image = container.querySelector('img[alt="Product Card"]');
    expect(image).toHaveAttribute("width", "161");
    expect(image).toHaveAttribute("height", "161");
  });

  it("should render product title", () => {
    render(<CartCard />);
    expect(screen.getByText("ITEM 2")).toBeInTheDocument();
  });

  it("should render product description", () => {
    render(<CartCard />);
    expect(
      screen.getByText("Redesigned from scratch and completely revised.")
    ).toBeInTheDocument();
  });

  it("should render price with ETH logo", () => {
    const { container } = render(<CartCard />);
    const ethLogo = container.querySelector('img[alt="ETH Logo"]');
    const priceText = screen.getByText("12 ETH");

    expect(ethLogo).toBeInTheDocument();
    expect(priceText).toBeInTheDocument();
  });

  it("should render ETH logo with correct dimensions", () => {
    const { container } = render(<CartCard />);
    const ethLogo = container.querySelector('img[alt="ETH Logo"]');
    expect(ethLogo).toHaveAttribute("width", "29");
    expect(ethLogo).toHaveAttribute("height", "29");
  });

  it("should render counter component", () => {
    render(<CartCard />);
    const counter = screen.getByTestId("counter");
    expect(counter).toBeInTheDocument();
    expect(counter).toHaveAttribute("data-value", "1");
  });

  it("should render delete button with trash icon", () => {
    render(<CartCard />);
    const button = screen.getByTestId("cart-card-button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("data-icon", "trash");
  });

  it("should render image container section", () => {
    const { container } = render(<CartCard />);
    const sections = container.querySelectorAll("section");
    const imageContainer = sections[0];
    expect(imageContainer).toBeInTheDocument();
  });

  it("should render info container section", () => {
    const { container } = render(<CartCard />);
    const sections = container.querySelectorAll("section");
    const infoContainer = sections[1];
    expect(infoContainer).toBeInTheDocument();
  });

  it("should render price container", () => {
    const { container } = render(<CartCard />);
    const priceContainer = container.querySelector(".priceContainer");
    expect(priceContainer).toBeInTheDocument();
  });

  it("should render counter container", () => {
    const { container } = render(<CartCard />);
    const counterContainer = container.querySelector(".counterContainer");
    expect(counterContainer).toBeInTheDocument();
  });

  it("should have correct structure with all elements", () => {
    const { container } = render(<CartCard />);
    const wrapper = container.firstChild;
    const sections = (wrapper as HTMLElement).querySelectorAll("section");

    expect(sections?.length).toBe(2);
    expect(screen.getByText("ITEM 2")).toBeInTheDocument();
    expect(screen.getByTestId("counter")).toBeInTheDocument();
    expect(screen.getByTestId("cart-card-button")).toBeInTheDocument();
  });
});

