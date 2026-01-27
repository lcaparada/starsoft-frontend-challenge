import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Footer } from "./Footer";

describe("Footer", () => {
  it("should render footer element", () => {
    const { container } = render(<Footer />);
    const footer = container.querySelector("footer");
    expect(footer).toBeInTheDocument();
  });

  it("should render copyright text", () => {
    render(<Footer />);
    expect(
      screen.getByText("STARSOFT © TODOS OS DIREITOS RESERVADOS")
    ).toBeInTheDocument();
  });

  it("should render text inside span element", () => {
    const { container } = render(<Footer />);
    const span = container.querySelector("span");
    expect(span).toBeInTheDocument();
    expect(span).toHaveTextContent("STARSOFT © TODOS OS DIREITOS RESERVADOS");
  });

  it("should have correct footer structure", () => {
    const { container } = render(<Footer />);
    const footer = container.querySelector("footer");
    const span = footer?.querySelector("span");

    expect(footer).toBeInTheDocument();
    expect(span).toBeInTheDocument();
    expect(span?.textContent).toBe("STARSOFT © TODOS OS DIREITOS RESERVADOS");
  });
});

