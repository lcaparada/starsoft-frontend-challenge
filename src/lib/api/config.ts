class ApiConfig {
  private static instance: ApiConfig;
  private baseUrl: string;

  private constructor() {
    this.baseUrl = this.validateAndGetBaseUrl();
  }

  public static getInstance(): ApiConfig {
    if (!ApiConfig.instance) {
      ApiConfig.instance = new ApiConfig();
    }
    return ApiConfig.instance;
  }

  private validateAndGetBaseUrl(): string {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
      throw new Error(
        "NEXT_PUBLIC_API_URL is not defined. Please define the NEXT_PUBLIC_API_URL environment variable in the env file"
      );
    }

    return apiUrl;
  }

  public getBaseUrl(): string {
    return this.baseUrl;
  }
}

export const apiConfig = ApiConfig.getInstance();

