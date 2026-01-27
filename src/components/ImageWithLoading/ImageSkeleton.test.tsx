import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { ImageSkeleton } from "./ImageSkeleton";

describe("ImageSkeleton", () => {
  it("should render skeleton element", () => {
    const { container } = render(<ImageSkeleton />);
    const skeleton = container.querySelector("div[class*='skeleton']");
    expect(skeleton).toBeInTheDocument();
  });

  it("should have skeleton class", () => {
    const { container } = render(<ImageSkeleton />);
    const skeleton = container.querySelector("div[class*='skeleton']");
    expect(skeleton).toHaveClass("skeleton");
  });
});

