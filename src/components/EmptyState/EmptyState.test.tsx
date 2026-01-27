import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { EmptyState } from "./EmptyState";

jest.mock("../Icon/Icon", () => ({
  Icon: ({ name, size }: { name: string; size: number }) => (
    <div data-testid={`icon-${name}`} data-size={size}>
      {name}
    </div>
  ),
}));

describe("EmptyState", () => {
  it("should render empty state container", () => {
    const { container } = render(<EmptyState />);
    const emptyState = container.firstChild;
    expect(emptyState).toBeInTheDocument();
    expect((emptyState as HTMLElement).tagName).toBe("DIV");
  });

  it("should render with default title", () => {
    render(<EmptyState />);
    expect(
      screen.getByText("Nenhum produto encontrado")
    ).toBeInTheDocument();
  });

  it("should render with default description", () => {
    render(<EmptyState />);
    expect(
      screen.getByText(
        "Não encontramos produtos no momento. Tente novamente mais tarde."
      )
    ).toBeInTheDocument();
  });

  it("should render with custom title", () => {
    const customTitle = "Custom Title";
    render(<EmptyState title={customTitle} />);
    expect(screen.getByText(customTitle)).toBeInTheDocument();
    expect(
      screen.queryByText("Nenhum produto encontrado")
    ).not.toBeInTheDocument();
  });

  it("should render with custom description", () => {
    const customDescription = "Custom description text";
    render(<EmptyState description={customDescription} />);
    expect(screen.getByText(customDescription)).toBeInTheDocument();
    expect(
      screen.queryByText(
        "Não encontramos produtos no momento. Tente novamente mais tarde."
      )
    ).not.toBeInTheDocument();
  });

  it("should render with both custom title and description", () => {
    const customTitle = "Custom Title";
    const customDescription = "Custom description text";
    render(<EmptyState title={customTitle} description={customDescription} />);
    expect(screen.getByText(customTitle)).toBeInTheDocument();
    expect(screen.getByText(customDescription)).toBeInTheDocument();
  });

  it("should render bag icon with correct size", () => {
    render(<EmptyState />);
    const icon = screen.getByTestId("icon-bag");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute("data-size", "64");
  });

  it("should render title as h2 element", () => {
    render(<EmptyState />);
    const title = screen.getByText("Nenhum produto encontrado");
    expect(title.tagName).toBe("H2");
  });

  it("should render description as p element", () => {
    render(<EmptyState />);
    const description = screen.getByText(
      "Não encontramos produtos no momento. Tente novamente mais tarde."
    );
    expect(description.tagName).toBe("P");
  });

  it("should render icon before title and description", () => {
    const { container } = render(<EmptyState />);
    const emptyState = container.firstChild as HTMLElement;
    const children = Array.from(emptyState.children);

    const iconIndex = children.findIndex(
      (child) => child.getAttribute("data-testid") === "icon-bag"
    );
    const titleIndex = children.findIndex(
      (child) => child.textContent === "Nenhum produto encontrado"
    );
    const descriptionIndex = children.findIndex(
      (child) =>
        child.textContent ===
        "Não encontramos produtos no momento. Tente novamente mais tarde."
    );

    expect(iconIndex).toBeLessThan(titleIndex);
    expect(titleIndex).toBeLessThan(descriptionIndex);
  });

  it("should render all elements in correct order", () => {
    const { container } = render(<EmptyState />);
    const emptyState = container.firstChild as HTMLElement;
    const children = Array.from(emptyState.children);

    expect(children.length).toBe(3);
    expect(children[0].getAttribute("data-testid")).toBe("icon-bag");
    expect(children[1].tagName).toBe("H2");
    expect(children[2].tagName).toBe("P");
  });

  it("should apply container class", () => {
    const { container } = render(<EmptyState />);
    const emptyState = container.firstChild as HTMLElement;
    expect(emptyState.className).toContain("container");
  });
});

