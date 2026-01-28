import "@testing-library/jest-dom";
import { render, waitFor, fireEvent } from "@testing-library/react";
import { ImageWithLoading } from "./ImageWithLoading";

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ ...props }: React.ImgHTMLAttributes<HTMLImageElement> & { priority?: boolean }) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt || ""} />;
  },
}));

describe("ImageWithLoading", () => {
  it("should render image with loading skeleton initially", () => {
    const { container } = render(
      <ImageWithLoading src="/test.jpg" alt="Test" width={100} height={100} />
    );
    const skeleton = container.querySelector("div[class*='skeleton']");
    expect(skeleton).toBeInTheDocument();
  });

  it("should render Image component with correct props", () => {
    const { container } = render(
      <ImageWithLoading src="/test.jpg" alt="Test Image" width={200} height={150} />
    );
    const image = container.querySelector("img");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/test.jpg");
    expect(image).toHaveAttribute("alt", "Test Image");
    expect(image).toHaveAttribute("width", "200");
    expect(image).toHaveAttribute("height", "150");
  });

  it("should hide skeleton when image loads", async () => {
    const { container } = render(
      <ImageWithLoading src="/test.jpg" alt="Test" width={100} height={100} />
    );

    const image = container.querySelector("img");
    const skeleton = container.querySelector("div[class*='skeleton']");

    expect(skeleton).toBeInTheDocument();

    if (image) {
      fireEvent.load(image);
    }

    await waitFor(() => {
      const updatedSkeleton = container.querySelector("div[class*='skeleton']");
      expect(updatedSkeleton).not.toBeInTheDocument();
    });
  });

  it("should show image when loaded", async () => {
    const { container } = render(
      <ImageWithLoading src="/test.jpg" alt="Test" width={100} height={100} />
    );

    const image = container.querySelector("img");

    if (image) {
      fireEvent.load(image);
    }

    await waitFor(() => {
      const updatedImage = container.querySelector("img");
      expect(updatedImage).not.toHaveClass("hidden");
    });
  });

  it("should apply custom className", () => {
    const { container } = render(
      <ImageWithLoading
        src="/test.jpg"
        alt="Test"
        width={100}
        height={100}
        className="custom-class"
      />
    );
    const image = container.querySelector("img");
    expect(image).toHaveClass("custom-class");
  });

  it("should render container with correct structure", () => {
    const { container } = render(
      <ImageWithLoading src="/test.jpg" alt="Test" width={100} height={100} />
    );
    const wrapper = container.firstChild;
    expect(wrapper).toBeInTheDocument();
    expect((wrapper as HTMLElement).tagName).toBe("DIV");
  });
});

