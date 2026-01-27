import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { Icon } from "./Icon";

jest.mock("@/src/assets", () => ({
  Bag: ({ size, ...props }: { size: number;[key: string]: unknown }) => (
    <svg data-testid="bag-icon" data-size={size} {...props}>
      Bag Icon
    </svg>
  ),
  Logo: ({ size, ...props }: { size: number;[key: string]: unknown }) => (
    <svg data-testid="logo-icon" data-size={size} {...props}>
      Logo Icon
    </svg>
  ),
  Plus: ({ size, ...props }: { size: number;[key: string]: unknown }) => (
    <svg data-testid="plus-icon" data-size={size} {...props}>
      Plus Icon
    </svg>
  ),
  Trash: ({ size, ...props }: { size: number;[key: string]: unknown }) => (
    <svg data-testid="trash-icon" data-size={size} {...props}>
      Trash Icon
    </svg>
  ),
  Minus: ({ size, ...props }: { size: number;[key: string]: unknown }) => (
    <svg data-testid="minus-icon" data-size={size} {...props}>
      Minus Icon
    </svg>
  ),
  ArrowLeft: ({
    size,
    ...props
  }: {
    size: number;
    [key: string]: unknown;
  }) => (
    <svg data-testid="arrow-left-icon" data-size={size} {...props}>
      ArrowLeft Icon
    </svg>
  ),
}));

describe("Icon", () => {
  it("should render bag icon", () => {
    const { container } = render(<Icon name="bag" size={24} />);
    const icon = container.querySelector('[data-testid="bag-icon"]');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute("data-size", "24");
  });

  it("should render logo icon", () => {
    const { container } = render(<Icon name="logo" size={100} />);
    const icon = container.querySelector('[data-testid="logo-icon"]');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute("data-size", "100");
  });

  it("should render plus icon", () => {
    const { container } = render(<Icon name="plus" size={16} />);
    const icon = container.querySelector('[data-testid="plus-icon"]');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute("data-size", "16");
  });

  it("should render trash icon", () => {
    const { container } = render(<Icon name="trash" size={20} />);
    const icon = container.querySelector('[data-testid="trash-icon"]');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute("data-size", "20");
  });

  it("should render minus icon", () => {
    const { container } = render(<Icon name="minus" size={18} />);
    const icon = container.querySelector('[data-testid="minus-icon"]');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute("data-size", "18");
  });

  it("should render arrowLeft icon", () => {
    const { container } = render(<Icon name="arrowLeft" size={22} />);
    const icon = container.querySelector('[data-testid="arrow-left-icon"]');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute("data-size", "22");
  });

  it("should pass size prop to icon component", () => {
    const { container } = render(<Icon name="bag" size={50} />);
    const icon = container.querySelector('[data-testid="bag-icon"]');
    expect(icon).toHaveAttribute("data-size", "50");
  });

  it("should pass additional SVG props to icon component", () => {
    const { container } = render(
      <Icon name="logo" size={30} className="custom-class" data-custom="test" />
    );
    const icon = container.querySelector('[data-testid="logo-icon"]');
    expect(icon).toHaveClass("custom-class");
    expect(icon).toHaveAttribute("data-custom", "test");
  });

  it("should update icon when name prop changes", () => {
    const { container, rerender } = render(<Icon name="bag" size={24} />);
    let icon = container.querySelector('[data-testid="bag-icon"]');
    expect(icon).toBeInTheDocument();

    rerender(<Icon name="logo" size={24} />);
    icon = container.querySelector('[data-testid="logo-icon"]');
    expect(icon).toBeInTheDocument();
    expect(container.querySelector('[data-testid="bag-icon"]')).not.toBeInTheDocument();
  });

  it("should update size when size prop changes", () => {
    const { container, rerender } = render(<Icon name="bag" size={24} />);
    let icon = container.querySelector('[data-testid="bag-icon"]');
    expect(icon).toHaveAttribute("data-size", "24");

    rerender(<Icon name="bag" size={48} />);
    icon = container.querySelector('[data-testid="bag-icon"]');
    expect(icon).toHaveAttribute("data-size", "48");
  });

  it("should render as SVG element", () => {
    const { container } = render(<Icon name="bag" size={24} />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg?.tagName).toBe("svg");
  });
});

