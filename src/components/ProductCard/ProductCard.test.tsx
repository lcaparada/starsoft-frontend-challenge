import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { ProductCard } from "./ProductCard";

jest.mock("../Button/Button", () => ({
  Button: ({ label }: { label: string }) => (
    <button data-testid="product-card-button">{label}</button>
  ),
}));

describe("ProductCard", () => {
  it("should render product card with provided title", () => {
    render(<ProductCard title="Test Product" />);
    expect(screen.getByText("Test Product")).toBeInTheDocument();
  });

  it("should render product image", () => {
    const { container } = render(<ProductCard title="Test Product" />);
    const images = container.querySelectorAll("img");
    expect(images.length).toBeGreaterThan(0);
  });

  it("should render main product image with correct attributes", () => {
    const { container } = render(<ProductCard title="Test Product" />);
    const mainImage = container.querySelector('img[alt="Product Card"]');

    expect(mainImage).toBeInTheDocument();
    expect(mainImage).toHaveAttribute("src", "https://github.com/shadcn.png");
    expect(mainImage).toHaveAttribute("alt", "Product Card");
    expect(mainImage).toHaveAttribute("width", "100");
    expect(mainImage).toHaveAttribute("height", "100");
  });

  it("should render ETH logo image", () => {
    const { container } = render(<ProductCard title="Test Product" />);
    const ethLogo = container.querySelector('img[alt="ETH Logo"]');

    expect(ethLogo).toBeInTheDocument();
    expect(ethLogo).toHaveAttribute("src", "/images/eth-logo.png");
    expect(ethLogo).toHaveAttribute("alt", "ETH Logo");
  });

  it("should render product description", () => {
    render(<ProductCard title="Test Product" />);
    expect(
      screen.getByText(
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
      )
    ).toBeInTheDocument();
  });

  it("should render price with ETH value", () => {
    render(<ProductCard title="Test Product" />);
    expect(screen.getByText("32 ETH")).toBeInTheDocument();
  });

  it("should render buy button", () => {
    render(<ProductCard title="Test Product" />);
    const button = screen.getByTestId("product-card-button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("COMPRAR");
  });

  it("should render card container", () => {
    const { container } = render(<ProductCard title="Test Product" />);
    const card = container.firstChild;
    expect(card).toBeInTheDocument();
    expect((card as HTMLElement).tagName).toBe("DIV");
  });

  it("should render image container section", () => {
    const { container } = render(<ProductCard title="Test Product" />);
    const imageContainer = container.querySelector("section");
    expect(imageContainer).toBeInTheDocument();
  });

  it("should render info container section", () => {
    render(<ProductCard title="Test Product" />);
    const title = screen.getByText("Test Product");
    const description = screen.getByText(
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    );

    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });

  it("should render price container section", () => {
    const { container } = render(<ProductCard title="Test Product" />);
    const priceText = screen.getByText("32 ETH");
    const ethLogo = container.querySelector('img[alt="ETH Logo"]');

    expect(priceText).toBeInTheDocument();
    expect(ethLogo).toBeInTheDocument();
  });

  it("should update title when prop changes", () => {
    const { rerender } = render(<ProductCard title="First Title" />);
    expect(screen.getByText("First Title")).toBeInTheDocument();

    rerender(<ProductCard title="Second Title" />);
    expect(screen.getByText("Second Title")).toBeInTheDocument();
    expect(screen.queryByText("First Title")).not.toBeInTheDocument();
  });
});

