import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Home from "./page";
import { useGetAllProducts } from "@/src/use-cases";

jest.mock("@/src/use-cases", () => ({
  useGetAllProducts: jest.fn(),
}));

jest.mock("@/src/components", () => ({
  ProductCard: ({ title, index }: { title: string; index?: number }) => (
    <div data-testid={`product-card-${index}`}>{title}</div>
  ),
  ProductCardSkeleton: () => (
    <div data-testid="product-card-skeleton">Skeleton</div>
  ),
  Button: ({
    label,
    onClick,
    disabled,
    percentage,
  }: {
    label: string;
    onClick?: () => void;
    disabled?: boolean;
    percentage?: number;
  }) => (
    <button
      data-testid="load-more-button"
      onClick={onClick}
      disabled={disabled}
      data-percentage={percentage}
    >
      {label}
    </button>
  ),
  EmptyState: ({ title, description }: { title?: string; description?: string }) => (
    <div data-testid="empty-state">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  ),
}));

const mockUseGetAllProducts = useGetAllProducts as jest.MockedFunction<
  typeof useGetAllProducts
>;

const mockProducts = [
  {
    id: "1",
    title: "Product 1",
    description: "Description 1",
    price: 100,
    image: "image1.jpg",
  },
  {
    id: "2",
    title: "Product 2",
    description: "Description 2",
    price: 200,
    image: "image2.jpg",
  },
];

describe("Home Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render loading skeletons when isLoading is true", () => {
    mockUseGetAllProducts.mockReturnValue({
      products: [],
      isLoading: true,
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
      total: 0,
      totalPages: 0,
      data: undefined,
      error: null,
    });

    render(<Home />);
    const skeletons = screen.getAllByTestId("product-card-skeleton");
    expect(skeletons).toHaveLength(8);
  });

  it("should render products when loaded", () => {
    mockUseGetAllProducts.mockReturnValue({
      products: mockProducts,
      isLoading: false,
      fetchNextPage: jest.fn(),
      hasNextPage: true,
      isFetchingNextPage: false,
      total: 10,
      totalPages: 2,
      data: undefined,
      error: null,
    });

    render(<Home />);
    expect(screen.getByTestId("product-card-0")).toBeInTheDocument();
    expect(screen.getByTestId("product-card-1")).toBeInTheDocument();
    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
  });

  it("should render load more button with correct label when not complete", () => {
    mockUseGetAllProducts.mockReturnValue({
      products: mockProducts,
      isLoading: false,
      fetchNextPage: jest.fn(),
      hasNextPage: true,
      isFetchingNextPage: false,
      total: 10,
      totalPages: 2,
      data: undefined,
      error: null,
    });

    render(<Home />);
    const button = screen.getByTestId("load-more-button");
    expect(button).toHaveTextContent("Carregar mais");
    expect(button).not.toBeDisabled();
  });

  it("should render complete message when all products are loaded", () => {
    mockUseGetAllProducts.mockReturnValue({
      products: mockProducts,
      isLoading: false,
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
      total: 2,
      totalPages: 1,
      data: undefined,
      error: null,
    });

    render(<Home />);
    const button = screen.getByTestId("load-more-button");
    expect(button).toHaveTextContent("Você já viu tudo");
    expect(button).toBeDisabled();
  });

  it("should calculate progress percentage correctly", () => {
    mockUseGetAllProducts.mockReturnValue({
      products: mockProducts,
      isLoading: false,
      fetchNextPage: jest.fn(),
      hasNextPage: true,
      isFetchingNextPage: false,
      total: 10,
      totalPages: 2,
      data: undefined,
      error: null,
    });

    render(<Home />);
    const button = screen.getByTestId("load-more-button");
    expect(button).toHaveAttribute("data-percentage", "20");
  });

  it("should show 100% progress when complete", () => {
    mockUseGetAllProducts.mockReturnValue({
      products: mockProducts,
      isLoading: false,
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
      total: 2,
      totalPages: 1,
      data: undefined,
      error: null,
    });

    render(<Home />);
    const button = screen.getByTestId("load-more-button");
    expect(button).toHaveAttribute("data-percentage", "100");
  });

  it("should disable button when fetching next page", () => {
    mockUseGetAllProducts.mockReturnValue({
      products: mockProducts,
      isLoading: false,
      fetchNextPage: jest.fn(),
      hasNextPage: true,
      isFetchingNextPage: true,
      total: 10,
      totalPages: 2,
      data: undefined,
      error: null,
    });

    render(<Home />);
    const button = screen.getByTestId("load-more-button");
    expect(button).toBeDisabled();
  });

  it("should call fetchNextPage when button is clicked", () => {
    const mockFetchNextPage = jest.fn();
    mockUseGetAllProducts.mockReturnValue({
      products: mockProducts,
      isLoading: false,
      fetchNextPage: mockFetchNextPage,
      hasNextPage: true,
      isFetchingNextPage: false,
      total: 10,
      totalPages: 2,
      data: undefined,
      error: null,
    });

    render(<Home />);
    const button = screen.getByTestId("load-more-button");
    button.click();

    expect(mockFetchNextPage).toHaveBeenCalledTimes(1);
  });

  it("should not call fetchNextPage when button is disabled", () => {
    const mockFetchNextPage = jest.fn();
    mockUseGetAllProducts.mockReturnValue({
      products: mockProducts,
      isLoading: false,
      fetchNextPage: mockFetchNextPage,
      hasNextPage: false,
      isFetchingNextPage: false,
      total: 2,
      totalPages: 1,
      data: undefined,
      error: null,
    });

    render(<Home />);
    const button = screen.getByTestId("load-more-button");
    expect(button).toBeDisabled();

    button.click();
    expect(mockFetchNextPage).not.toHaveBeenCalled();
  });

  it("should render empty state when no products are available", () => {
    mockUseGetAllProducts.mockReturnValue({
      products: [],
      isLoading: false,
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
      total: 0,
      totalPages: 0,
      data: undefined,
      error: null,
    });

    render(<Home />);
    expect(screen.getByTestId("empty-state")).toBeInTheDocument();
    expect(screen.queryByTestId("load-more-button")).not.toBeInTheDocument();
    expect(screen.queryByTestId("product-card-0")).not.toBeInTheDocument();
  });

  it("should not render empty state when loading", () => {
    mockUseGetAllProducts.mockReturnValue({
      products: [],
      isLoading: true,
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
      total: 0,
      totalPages: 0,
      data: undefined,
      error: null,
    });

    render(<Home />);
    expect(screen.queryByTestId("empty-state")).not.toBeInTheDocument();
    expect(screen.getAllByTestId("product-card-skeleton")).toHaveLength(8);
  });

  it("should not render empty state when products exist", () => {
    mockUseGetAllProducts.mockReturnValue({
      products: mockProducts,
      isLoading: false,
      fetchNextPage: jest.fn(),
      hasNextPage: true,
      isFetchingNextPage: false,
      total: 10,
      totalPages: 2,
      data: undefined,
      error: null,
    });

    render(<Home />);
    expect(screen.queryByTestId("empty-state")).not.toBeInTheDocument();
    expect(screen.getByTestId("product-card-0")).toBeInTheDocument();
  });

  it("should pass index prop to ProductCard for animation", () => {
    mockUseGetAllProducts.mockReturnValue({
      products: mockProducts,
      isLoading: false,
      fetchNextPage: jest.fn(),
      hasNextPage: true,
      isFetchingNextPage: false,
      total: 10,
      totalPages: 2,
      data: undefined,
      error: null,
    });

    render(<Home />);
    expect(screen.getByTestId("product-card-0")).toBeInTheDocument();
    expect(screen.getByTestId("product-card-1")).toBeInTheDocument();
  });

  it("should render correct number of products", () => {
    const moreProducts = [
      ...mockProducts,
      {
        id: "3",
        title: "Product 3",
        description: "Description 3",
        price: 300,
        image: "image3.jpg",
      },
    ];

    mockUseGetAllProducts.mockReturnValue({
      products: moreProducts,
      isLoading: false,
      fetchNextPage: jest.fn(),
      hasNextPage: true,
      isFetchingNextPage: false,
      total: 10,
      totalPages: 2,
      data: undefined,
      error: null,
    });

    render(<Home />);
    expect(screen.getByTestId("product-card-0")).toBeInTheDocument();
    expect(screen.getByTestId("product-card-1")).toBeInTheDocument();
    expect(screen.getByTestId("product-card-2")).toBeInTheDocument();
    expect(screen.getByText("Product 3")).toBeInTheDocument();
  });

  it("should show correct progress for different product counts", () => {
    const singleProduct = [mockProducts[0]];
    mockUseGetAllProducts.mockReturnValue({
      products: singleProduct,
      isLoading: false,
      fetchNextPage: jest.fn(),
      hasNextPage: true,
      isFetchingNextPage: false,
      total: 20,
      totalPages: 3,
      data: undefined,
      error: null,
    });

    render(<Home />);
    const button = screen.getByTestId("load-more-button");
    // 1 product / 20 total = 5%
    expect(button).toHaveAttribute("data-percentage", "5");
  });

  it("should show 0% progress when no products are displayed", () => {
    mockUseGetAllProducts.mockReturnValue({
      products: [],
      isLoading: false,
      fetchNextPage: jest.fn(),
      hasNextPage: true,
      isFetchingNextPage: false,
      total: 10,
      totalPages: 2,
      data: undefined,
      error: null,
    });

    render(<Home />);
    // When empty, button should not be rendered (empty state is shown instead)
    expect(screen.queryByTestId("load-more-button")).not.toBeInTheDocument();
    expect(screen.getByTestId("empty-state")).toBeInTheDocument();
  });

  it("should handle button being disabled when both complete and fetching", () => {
    mockUseGetAllProducts.mockReturnValue({
      products: mockProducts,
      isLoading: false,
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: true,
      total: 2,
      totalPages: 1,
      data: undefined,
      error: null,
    });

    render(<Home />);
    const button = screen.getByTestId("load-more-button");
    expect(button).toBeDisabled();
  });

  it("should round progress percentage correctly", () => {
    // 3 products / 7 total = 42.857...% should round to 43%
    const threeProducts = [
      ...mockProducts,
      {
        id: "3",
        title: "Product 3",
        description: "Description 3",
        price: 300,
        image: "image3.jpg",
      },
    ];

    mockUseGetAllProducts.mockReturnValue({
      products: threeProducts,
      isLoading: false,
      fetchNextPage: jest.fn(),
      hasNextPage: true,
      isFetchingNextPage: false,
      total: 7,
      totalPages: 1,
      data: undefined,
      error: null,
    });

    render(<Home />);
    const button = screen.getByTestId("load-more-button");
    expect(button).toHaveAttribute("data-percentage", "43");
  });
});

