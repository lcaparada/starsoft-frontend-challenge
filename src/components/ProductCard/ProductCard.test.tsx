import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { ProductCard } from "./ProductCard";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt || ""} />;
  },
}));

jest.mock("motion/react", () => ({
  motion: {
    div: ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
      <div className={className} {...props}>
        {children}
      </div>
    ),
  },
}));

jest.mock("../Button/Button", () => ({
  Button: ({ label }: { label: string }) => (
    <button data-testid="product-card-button">{label}</button>
  ),
}));

jest.mock("../ImageWithLoading/ImageWithLoading", () => ({
  ImageWithLoading: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt || ""} />;
  },
}));

const mockProduct = {
  id: "1",
  title: "Test Product",
  description: "Test description for the product",
  price: 100,
  image: "https://example.com/image.jpg",
};

describe("ProductCard", () => {
  it("should render product card with provided title", () => {
    render(<ProductCard {...mockProduct} />);
    expect(screen.getByText("Test Product")).toBeInTheDocument();
  });

  it("should render product image with correct attributes", () => {
    const { container } = render(<ProductCard {...mockProduct} />);
    const mainImage = container.querySelector('img[alt="Product Card"]');

    expect(mainImage).toBeInTheDocument();
    expect(mainImage).toHaveAttribute("src", "https://example.com/image.jpg");
    expect(mainImage).toHaveAttribute("alt", "Product Card");
    expect(mainImage).toHaveAttribute("width", "100");
    expect(mainImage).toHaveAttribute("height", "100");
  });

  it("should render ETH logo image", () => {
    const { container } = render(<ProductCard {...mockProduct} />);
    const ethLogo = container.querySelector('img[alt="ETH Logo"]');

    expect(ethLogo).toBeInTheDocument();
    expect(ethLogo).toHaveAttribute("src", "/images/eth-logo.png");
    expect(ethLogo).toHaveAttribute("alt", "ETH Logo");
  });

  it("should render product description", () => {
    render(<ProductCard {...mockProduct} />);
    expect(screen.getByText("Test description for the product")).toBeInTheDocument();
  });

  it("should render price with ETH value", () => {
    render(<ProductCard {...mockProduct} />);
    expect(screen.getByText("100 ETH")).toBeInTheDocument();
  });

  it("should render buy button", () => {
    render(<ProductCard {...mockProduct} />);
    const button = screen.getByTestId("product-card-button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("COMPRAR");
  });

  it("should render card container", () => {
    const { container } = render(<ProductCard {...mockProduct} />);
    const card = container.firstChild;
    expect(card).toBeInTheDocument();
    expect((card as HTMLElement).tagName).toBe("DIV");
  });

  it("should render image container section", () => {
    const { container } = render(<ProductCard {...mockProduct} />);
    const imageContainer = container.querySelector("section");
    expect(imageContainer).toBeInTheDocument();
  });

  it("should render info container section with title and description", () => {
    render(<ProductCard {...mockProduct} />);
    const title = screen.getByText("Test Product");
    const description = screen.getByText("Test description for the product");

    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });

  it("should render price container section", () => {
    const { container } = render(<ProductCard {...mockProduct} />);
    const priceText = screen.getByText("100 ETH");
    const ethLogo = container.querySelector('img[alt="ETH Logo"]');

    expect(priceText).toBeInTheDocument();
    expect(ethLogo).toBeInTheDocument();
  });

  it("should update props when they change", () => {
    const { rerender } = render(
      <ProductCard {...mockProduct} title="First Title" />
    );
    expect(screen.getByText("First Title")).toBeInTheDocument();

    rerender(
      <ProductCard {...mockProduct} title="Second Title" price={200} />
    );
    expect(screen.getByText("Second Title")).toBeInTheDocument();
    expect(screen.getByText("200 ETH")).toBeInTheDocument();
    expect(screen.queryByText("First Title")).not.toBeInTheDocument();
  });

  it("should accept index prop for animation delay", () => {
    const { container } = render(
      <ProductCard {...mockProduct} index={2} />
    );
    const card = container.firstChild;
    expect(card).toBeInTheDocument();
  });

  it("should render correctly without index prop", () => {
    const { container } = render(<ProductCard {...mockProduct} />);
    const card = container.firstChild;
    expect(card).toBeInTheDocument();
    expect(screen.getByText("Test Product")).toBeInTheDocument();
  });

  it("should render with different index values", () => {
    const { rerender, container } = render(
      <ProductCard {...mockProduct} index={0} />
    );
    expect(container.firstChild).toBeInTheDocument();

    rerender(<ProductCard {...mockProduct} index={5} />);
    expect(container.firstChild).toBeInTheDocument();
    expect(screen.getByText("Test Product")).toBeInTheDocument();
  });
});

