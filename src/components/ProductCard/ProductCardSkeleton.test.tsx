import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { ProductCardSkeleton } from "./ProductCardSkeleton";

describe("ProductCardSkeleton", () => {
  it("should render skeleton card container", () => {
    const { container } = render(<ProductCardSkeleton />);
    const card = container.firstChild;
    expect(card).toBeInTheDocument();
    expect((card as HTMLElement).tagName).toBe("DIV");
  });

  it("should render image container section", () => {
    const { container } = render(<ProductCardSkeleton />);
    const imageContainer = container.querySelector("section");
    expect(imageContainer).toBeInTheDocument();
  });

  it("should render image skeleton", () => {
    const { container } = render(<ProductCardSkeleton />);
    const imageSkeleton = container.querySelector("div[class*='imageSkeleton']");
    expect(imageSkeleton).toBeInTheDocument();
  });

  it("should render info container section", () => {
    const { container } = render(<ProductCardSkeleton />);
    const sections = container.querySelectorAll("section");
    expect(sections.length).toBeGreaterThanOrEqual(1);
  });

  it("should render title skeleton", () => {
    const { container } = render(<ProductCardSkeleton />);
    const titleSkeleton = container.querySelector("div[class*='titleSkeleton']");
    expect(titleSkeleton).toBeInTheDocument();
  });

  it("should render description skeletons", () => {
    const { container } = render(<ProductCardSkeleton />);
    const descriptionSkeletons = container.querySelectorAll(
      "div[class*='descriptionSkeleton']"
    );
    expect(descriptionSkeletons.length).toBe(2);
  });

  it("should render price container section", () => {
    const { container } = render(<ProductCardSkeleton />);
    const priceContainer = container.querySelector("section[class*='priceContainer']");
    expect(priceContainer).toBeInTheDocument();
  });

  it("should render ETH logo skeleton", () => {
    const { container } = render(<ProductCardSkeleton />);
    const ethLogoSkeleton = container.querySelector(
      "div[class*='ethLogoSkeleton']"
    );
    expect(ethLogoSkeleton).toBeInTheDocument();
  });

  it("should render price skeleton", () => {
    const { container } = render(<ProductCardSkeleton />);
    const priceSkeleton = container.querySelector("div[class*='priceSkeleton']");
    expect(priceSkeleton).toBeInTheDocument();
  });

  it("should render button skeleton", () => {
    const { container } = render(<ProductCardSkeleton />);
    const buttonSkeleton = container.querySelector(
      "div[class*='buttonSkeleton']"
    );
    expect(buttonSkeleton).toBeInTheDocument();
  });

  it("should have correct skeleton structure", () => {
    const { container } = render(<ProductCardSkeleton />);
    const card = container.firstChild as HTMLElement;
    const imageContainer = card?.querySelector("section");
    const contentDiv = card?.querySelector("div:not([class*='Skeleton'])");

    expect(card).toBeInTheDocument();
    expect(imageContainer).toBeInTheDocument();
    expect(contentDiv).toBeInTheDocument();
  });

  it("should render all skeleton elements in correct order", () => {
    const { container } = render(<ProductCardSkeleton />);
    const card = container.firstChild as HTMLElement;
    const children = card?.children;

    expect(children?.[0]?.tagName).toBe("SECTION");
    expect(children?.[1]?.tagName).toBe("DIV");
  });
});

