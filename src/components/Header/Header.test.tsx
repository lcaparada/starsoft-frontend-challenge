import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Header } from "./Header";

jest.mock("../Icon/Icon", () => ({
  Icon: ({ name, size }: { name: string; size: number }) => (
    <div data-testid={`icon-${name}`} data-size={size}>
      {name}
    </div>
  ),
}));

describe("Header", () => {
  it("should render header element", () => {
    const { container } = render(<Header />);
    const header = container.querySelector("header");
    expect(header).toBeInTheDocument();
  });

  it("should render logo icon", () => {
    render(<Header />);
    const logoIcon = screen.getByTestId("icon-logo");
    expect(logoIcon).toBeInTheDocument();
    expect(logoIcon).toHaveAttribute("data-size", "101");
  });

  it("should render bag button", () => {
    const { container } = render(<Header />);
    const bagButton = container.querySelector("button");
    expect(bagButton).toBeInTheDocument();
  });

  it("should render bag icon", () => {
    render(<Header />);
    const bagIcon = screen.getByTestId("icon-bag");
    expect(bagIcon).toBeInTheDocument();
    expect(bagIcon).toHaveAttribute("data-size", "33");
  });

  it("should render bag count", () => {
    render(<Header />);
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("should render bag icon and count inside bag button", () => {
    const { container } = render(<Header />);
    const bagButton = container.querySelector("button");
    const bagIcon = bagButton?.querySelector('[data-testid="icon-bag"]');
    const bagCount = bagButton?.querySelector("span");

    expect(bagIcon).toBeInTheDocument();
    expect(bagCount).toBeInTheDocument();
    expect(bagCount).toHaveTextContent("0");
  });

  it("should have correct header structure", () => {
    const { container } = render(<Header />);
    const header = container.querySelector("header");
    const logoIcon = header?.querySelector('[data-testid="icon-logo"]');
    const bagButton = header?.querySelector("button");

    expect(header).toBeInTheDocument();
    expect(logoIcon).toBeInTheDocument();
    expect(bagButton).toBeInTheDocument();
  });

  it("should render logo icon before bag button", () => {
    const { container } = render(<Header />);
    const header = container.querySelector("header");
    const children = header?.children;

    expect(children?.[0]).toHaveAttribute("data-testid", "icon-logo");
    expect(children?.[1]?.tagName).toBe("BUTTON");
  });
});

