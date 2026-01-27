import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Button } from "./Button";

jest.mock("../ProgressBar/ProgressBar", () => ({
  ProgressBar: ({ progress }: { progress: number }) => (
    <div data-testid="progress-bar" data-progress={progress}>
      Progress: {progress}%
    </div>
  ),
}));

jest.mock("../Icon/Icon", () => ({
  Icon: ({ name, size }: { name: string; size: number }) => (
    <svg data-testid={`icon-${name}`} data-size={size}>
      {name}
    </svg>
  ),
}));

describe("Button", () => {
  it("should render button with provided label", () => {
    render(<Button label="Click here" />);
    expect(screen.getByText("Click here")).toBeInTheDocument();
  });

  it("should render with primary variant by default", () => {
    const { container } = render(<Button label="Button" />);
    const button = container.querySelector("button");
    expect(button).toHaveClass("primary");
  });

  it("should render with secondary variant when specified", () => {
    const { container } = render(<Button label="Button" variant="secondary" />);
    const button = container.querySelector("button");
    expect(button).toHaveClass("secondary");
  });

  it("should render ProgressBar when percentage > 0", () => {
    render(<Button label="Button" percentage={50} />);
    expect(screen.getByTestId("progress-bar")).toBeInTheDocument();
    expect(screen.getByTestId("progress-bar")).toHaveAttribute(
      "data-progress",
      "50"
    );
  });

  it("should not render ProgressBar when percentage is 0", () => {
    render(<Button label="Button" percentage={0} />);
    expect(screen.queryByTestId("progress-bar")).not.toBeInTheDocument();
  });

  it("should not render ProgressBar when percentage is not provided", () => {
    render(<Button label="Button" />);
    expect(screen.queryByTestId("progress-bar")).not.toBeInTheDocument();
  });

  it("should call onClick when button is clicked", () => {
    const handleClick = jest.fn();
    const { container } = render(<Button label="Click here" onClick={handleClick} />);

    const button = container.querySelector("button");
    if (button) {
      button.click();
    }

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("should be disabled when disabled prop is true", () => {
    const { container } = render(<Button label="Button" disabled />);
    const button = container.querySelector("button");
    expect(button).toBeDisabled();
  });

  it("should apply custom className", () => {
    const { container } = render(
      <Button label="Button" className="custom-class" />
    );
    const button = container.querySelector("button");
    expect(button).toHaveClass("custom-class");
  });

  it("should pass other button props to the element", () => {
    render(<Button label="Button" type="submit" data-testid="custom-button" />);
    const button = screen.getByTestId("custom-button");
    expect(button).toHaveAttribute("type", "submit");
  });

  it("should render inside a container", () => {
    const { container } = render(<Button label="Button" />);
    const buttonContainer = container.querySelector("div");
    expect(buttonContainer).toBeInTheDocument();
    expect(buttonContainer?.querySelector("button")).toBeInTheDocument();
  });

  it("should render ProgressBar before button when percentage > 0", () => {
    const { container } = render(<Button label="Button" percentage={75} />);
    const buttonContainer = container.querySelector("div");
    const children = buttonContainer?.children;

    expect(children?.[0]).toHaveAttribute("data-testid", "progress-bar");
    expect(children?.[1]?.tagName).toBe("BUTTON");
  });

  it("should render label inside span element", () => {
    const { container } = render(<Button label="Test Label" />);
    const span = container.querySelector("span");
    expect(span).toBeInTheDocument();
    expect(span).toHaveTextContent("Test Label");
  });

  it("should merge className with variant classes", () => {
    const { container } = render(
      <Button label="Button" variant="primary" className="extra-class" />
    );
    const button = container.querySelector("button");
    expect(button).toHaveClass("primary");
    expect(button).toHaveClass("extra-class");
  });

  it("should render icon when icon prop is provided", () => {
    render(<Button label="Button" icon="plus" />);
    expect(screen.getByTestId("icon-plus")).toBeInTheDocument();
  });

  it("should apply withIcon class when icon is provided", () => {
    const { container } = render(<Button label="Button" icon="trash" />);
    const button = container.querySelector("button");
    expect(button).toHaveClass("withIcon");
  });

  it("should render icon with correct size", () => {
    render(<Button label="Button" icon="bag" />);
    const icon = screen.getByTestId("icon-bag");
    expect(icon).toHaveAttribute("data-size", "24");
  });

  it("should render icon and label together", () => {
    render(<Button label="Add Item" icon="plus" />);
    expect(screen.getByTestId("icon-plus")).toBeInTheDocument();
    expect(screen.getByText("Add Item")).toBeInTheDocument();
  });

  it("should render button with only icon (no label)", () => {
    render(<Button icon="trash" />);
    expect(screen.getByTestId("icon-trash")).toBeInTheDocument();
    expect(screen.queryByText("Button")).not.toBeInTheDocument();
  });

  it("should not apply withIcon class when icon is not provided", () => {
    const { container } = render(<Button label="Button" />);
    const button = container.querySelector("button");
    expect(button).not.toHaveClass("withIcon");
  });

  it("should render different icons correctly", () => {
    const { rerender } = render(<Button label="Button" icon="plus" />);
    expect(screen.getByTestId("icon-plus")).toBeInTheDocument();

    rerender(<Button label="Button" icon="trash" />);
    expect(screen.getByTestId("icon-trash")).toBeInTheDocument();
    expect(screen.queryByTestId("icon-plus")).not.toBeInTheDocument();
  });
});
