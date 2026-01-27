import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { ProgressBar } from "./ProgressBar";

describe("ProgressBar", () => {
  it("should render progress bar with correct progress value", () => {
    const { container } = render(<ProgressBar progress={50} />);
    const progressBarFill = container.querySelector("div[style*='width']");

    expect(progressBarFill).toBeInTheDocument();
    expect(progressBarFill).toHaveStyle({ width: "50%" });
  });

  it("should render with 0% progress", () => {
    const { container } = render(<ProgressBar progress={0} />);
    const progressBarFill = container.querySelector("div[style*='width']");

    expect(progressBarFill).toBeInTheDocument();
    expect(progressBarFill).toHaveStyle({ width: "0%" });
  });

  it("should render with 100% progress", () => {
    const { container } = render(<ProgressBar progress={100} />);
    const progressBarFill = container.querySelector("div[style*='width']");

    expect(progressBarFill).toBeInTheDocument();
    expect(progressBarFill).toHaveStyle({ width: "100%" });
  });

  it("should render with decimal progress values", () => {
    const { container } = render(<ProgressBar progress={33.33} />);
    const progressBarFill = container.querySelector("div[style*='width']");

    expect(progressBarFill).toBeInTheDocument();
    expect(progressBarFill).toHaveStyle({ width: "33.33%" });
  });

  it("should render progress bar container", () => {
    const { container } = render(<ProgressBar progress={50} />);
    const progressBar = container.firstChild;

    expect(progressBar).toBeInTheDocument();
    expect((progressBar as HTMLElement).tagName).toBe("DIV");
  });

  it("should render progress bar fill inside container", () => {
    const { container } = render(<ProgressBar progress={75} />);
    const progressBar = container.firstChild;
    const progressBarFill = progressBar?.firstChild;

    expect(progressBarFill).toBeInTheDocument();
    expect((progressBarFill as HTMLElement).tagName).toBe("DIV");
  });

  it("should update progress value when prop changes", () => {
    const { container, rerender } = render(<ProgressBar progress={25} />);
    let progressBarFill = container.querySelector("div[style*='width']");

    expect(progressBarFill).toHaveStyle({ width: "25%" });

    rerender(<ProgressBar progress={75} />);
    progressBarFill = container.querySelector("div[style*='width']");

    expect(progressBarFill).toHaveStyle({ width: "75%" });
  });

  it("should handle negative progress values", () => {
    const { container } = render(<ProgressBar progress={-10} />);
    const progressBarFill = container.querySelector("div[style*='width']");

    expect(progressBarFill).toBeInTheDocument();
    expect(progressBarFill).toHaveStyle({ width: "-10%" });
  });

  it("should handle progress values over 100%", () => {
    const { container } = render(<ProgressBar progress={150} />);
    const progressBarFill = container.querySelector("div[style*='width']");

    expect(progressBarFill).toBeInTheDocument();
    expect(progressBarFill).toHaveStyle({ width: "150%" });
  });
});

