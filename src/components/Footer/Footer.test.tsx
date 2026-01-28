import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Footer } from "./Footer";

describe("Footer", () => {
  it("should render footer element", () => {
    const { container } = render(<Footer />);
    const footer = container.querySelector("footer");
    expect(footer).toBeInTheDocument();
  });

  it("should render copyright text with current year", () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    expect(
      screen.getByText(new RegExp(`STARSOFT © ${currentYear} TODOS OS DIREITOS RESERVADOS`))
    ).toBeInTheDocument();
  });

  it("should render text inside span element", () => {
    const { container } = render(<Footer />);
    const span = container.querySelector("span");
    const currentYear = new Date().getFullYear();
    expect(span).toBeInTheDocument();
    expect(span).toHaveTextContent(new RegExp(`STARSOFT © ${currentYear} TODOS OS DIREITOS RESERVADOS`));
  });

  it("should have correct footer structure", () => {
    const { container } = render(<Footer />);
    const footer = container.querySelector("footer");
    const span = footer?.querySelector("span");
    const currentYear = new Date().getFullYear();

    expect(footer).toBeInTheDocument();
    expect(footer).toHaveAttribute("role", "contentinfo");
    expect(span).toBeInTheDocument();
    expect(span?.textContent).toMatch(new RegExp(`STARSOFT © ${currentYear} TODOS OS DIREITOS RESERVADOS`));
  });
});

