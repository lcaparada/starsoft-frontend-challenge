import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Counter } from "./Counter";

jest.mock("../Icon/Icon", () => ({
  Icon: ({ name, size }: { name: string; size: number }) => (
    <svg data-testid={`icon-${name}`} data-size={size}>
      {name}
    </svg>
  ),
}));

describe("Counter", () => {
  it("should render counter with provided value", () => {
    render(
      <Counter value={5} onIncrement={() => { }} onDecrement={() => { }} />
    );
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("should render increment and decrement buttons", () => {
    render(
      <Counter value={1} onIncrement={() => { }} onDecrement={() => { }} />
    );
    expect(screen.getByTestId("icon-plus")).toBeInTheDocument();
    expect(screen.getByTestId("icon-minus")).toBeInTheDocument();
  });

  it("should call onIncrement when increment button is clicked", () => {
    const handleIncrement = jest.fn();
    const { container } = render(
      <Counter value={1} onIncrement={handleIncrement} onDecrement={() => { }} />
    );

    const incrementButton = container.querySelector(
      'button[aria-label="Aumentar quantidade"]'
    );
    if (incrementButton) {
      (incrementButton as HTMLButtonElement).click();
    }

    expect(handleIncrement).toHaveBeenCalledTimes(1);
  });

  it("should call onDecrement when decrement button is clicked", () => {
    const handleDecrement = jest.fn();
    const { container } = render(
      <Counter value={2} onIncrement={() => { }} onDecrement={handleDecrement} />
    );

    const decrementButton = container.querySelector(
      'button[aria-label="Diminuir quantidade"]'
    );
    if (decrementButton) {
      (decrementButton as HTMLButtonElement).click();
    }

    expect(handleDecrement).toHaveBeenCalledTimes(1);
  });

  it("should disable decrement button when value equals min", () => {
    const { container } = render(
      <Counter
        value={0}
        onIncrement={() => { }}
        onDecrement={() => { }}
        min={0}
      />
    );

    const decrementButton = container.querySelector(
      'button[aria-label="Diminuir quantidade"]'
    );
    expect(decrementButton).toBeDisabled();
  });

  it("should disable increment button when value equals max", () => {
    const { container } = render(
      <Counter
        value={10}
        onIncrement={() => { }}
        onDecrement={() => { }}
        max={10}
      />
    );

    const incrementButton = container.querySelector(
      'button[aria-label="Aumentar quantidade"]'
    );
    expect(incrementButton).toBeDisabled();
  });

  it("should allow increment when value is below max", () => {
    const { container } = render(
      <Counter
        value={5}
        onIncrement={() => { }}
        onDecrement={() => { }}
        max={10}
      />
    );

    const incrementButton = container.querySelector(
      'button[aria-label="Aumentar quantidade"]'
    );
    expect(incrementButton).not.toBeDisabled();
  });

  it("should allow decrement when value is above min", () => {
    const { container } = render(
      <Counter
        value={5}
        onIncrement={() => { }}
        onDecrement={() => { }}
        min={0}
      />
    );

    const decrementButton = container.querySelector(
      'button[aria-label="Diminuir quantidade"]'
    );
    expect(decrementButton).not.toBeDisabled();
  });

  it("should disable both buttons when disabled prop is true", () => {
    const { container } = render(
      <Counter
        value={5}
        onIncrement={() => { }}
        onDecrement={() => { }}
        disabled
      />
    );

    const incrementButton = container.querySelector(
      'button[aria-label="Aumentar quantidade"]'
    );
    const decrementButton = container.querySelector(
      'button[aria-label="Diminuir quantidade"]'
    );

    expect(incrementButton).toBeDisabled();
    expect(decrementButton).toBeDisabled();
  });

  it("should use default min value of 0", () => {
    const { container } = render(
      <Counter value={0} onIncrement={() => { }} onDecrement={() => { }} />
    );

    const decrementButton = container.querySelector(
      'button[aria-label="Diminuir quantidade"]'
    );
    expect(decrementButton).toBeDisabled();
  });

  it("should allow increment when max is not provided", () => {
    const { container } = render(
      <Counter value={100} onIncrement={() => { }} onDecrement={() => { }} />
    );

    const incrementButton = container.querySelector(
      'button[aria-label="Aumentar quantidade"]'
    );
    expect(incrementButton).not.toBeDisabled();
  });

  it("should render icons with correct size", () => {
    render(
      <Counter value={1} onIncrement={() => { }} onDecrement={() => { }} />
    );

    const plusIcon = screen.getByTestId("icon-plus");
    const minusIcon = screen.getByTestId("icon-minus");

    expect(plusIcon).toHaveAttribute("data-size", "16");
    expect(minusIcon).toHaveAttribute("data-size", "16");
  });
});

