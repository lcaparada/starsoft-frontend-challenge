import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { EmptyStateSkeleton } from "./EmptyStateSkeleton";

describe("EmptyStateSkeleton", () => {
  it("should render skeleton container", () => {
    const { container } = render(<EmptyStateSkeleton />);
    const skeletonContainer = container.firstChild;
    expect(skeletonContainer).toBeInTheDocument();
    expect((skeletonContainer as HTMLElement).tagName).toBe("DIV");
  });

  it("should render icon skeleton", () => {
    const { container } = render(<EmptyStateSkeleton />);
    const iconSkeleton = container.querySelector("div[class*='iconSkeleton']");
    expect(iconSkeleton).toBeInTheDocument();
  });

  it("should render title skeleton", () => {
    const { container } = render(<EmptyStateSkeleton />);
    const titleSkeleton = container.querySelector("div[class*='titleSkeleton']");
    expect(titleSkeleton).toBeInTheDocument();
  });

  it("should render description skeleton", () => {
    const { container } = render(<EmptyStateSkeleton />);
    const descriptionSkeleton = container.querySelector(
      "div[class*='descriptionSkeleton']"
    );
    expect(descriptionSkeleton).toBeInTheDocument();
  });

  it("should render all skeleton elements", () => {
    const { container } = render(<EmptyStateSkeleton />);
    const iconSkeleton = container.querySelector("div[class*='iconSkeleton']");
    const titleSkeleton = container.querySelector("div[class*='titleSkeleton']");
    const descriptionSkeleton = container.querySelector(
      "div[class*='descriptionSkeleton']"
    );

    expect(iconSkeleton).toBeInTheDocument();
    expect(titleSkeleton).toBeInTheDocument();
    expect(descriptionSkeleton).toBeInTheDocument();
  });

  it("should have correct skeleton structure", () => {
    const { container } = render(<EmptyStateSkeleton />);
    const skeletonContainer = container.firstChild as HTMLElement;
    const children = skeletonContainer?.children;

    expect(skeletonContainer).toBeInTheDocument();
    expect(children?.length).toBe(3);
  });

  it("should render skeleton elements in correct order", () => {
    const { container } = render(<EmptyStateSkeleton />);
    const skeletonContainer = container.firstChild as HTMLElement;
    const children = Array.from(skeletonContainer?.children || []);

    expect(children[0]).toHaveClass("iconSkeleton");
    expect(children[1]).toHaveClass("titleSkeleton");
    expect(children[2]).toHaveClass("descriptionSkeleton");
  });

  it("should apply container class", () => {
    const { container } = render(<EmptyStateSkeleton />);
    const skeletonContainer = container.firstChild as HTMLElement;
    expect(skeletonContainer.className).toContain("container");
  });

  it("should apply iconSkeleton class", () => {
    const { container } = render(<EmptyStateSkeleton />);
    const iconSkeleton = container.querySelector("div[class*='iconSkeleton']");
    expect(iconSkeleton).toHaveClass("iconSkeleton");
  });

  it("should apply titleSkeleton class", () => {
    const { container } = render(<EmptyStateSkeleton />);
    const titleSkeleton = container.querySelector("div[class*='titleSkeleton']");
    expect(titleSkeleton).toHaveClass("titleSkeleton");
  });

  it("should apply descriptionSkeleton class", () => {
    const { container } = render(<EmptyStateSkeleton />);
    const descriptionSkeleton = container.querySelector(
      "div[class*='descriptionSkeleton']"
    );
    expect(descriptionSkeleton).toHaveClass("descriptionSkeleton");
  });

  it("should render as a div element", () => {
    const { container } = render(<EmptyStateSkeleton />);
    const skeletonContainer = container.firstChild;
    expect(skeletonContainer).toBeInTheDocument();
    expect((skeletonContainer as HTMLElement).tagName).toBe("DIV");
  });

  it("should have all children as div elements", () => {
    const { container } = render(<EmptyStateSkeleton />);
    const skeletonContainer = container.firstChild as HTMLElement;
    const children = Array.from(skeletonContainer?.children || []);

    children.forEach((child) => {
      expect((child as HTMLElement).tagName).toBe("DIV");
    });
  });
});

