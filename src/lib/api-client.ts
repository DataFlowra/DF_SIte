/**
 * SHA-256 hashing utility for the frontend.
 * The backend requires password_hash to be a SHA-256 hex string.
 */
export async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://api.dataflowra.com/api";

export interface ApiResponse<T = any> {
  status: "success" | "error";
  message: string;
  data: T;
  code: number;
  timestamp: string;
  errors?: Record<string, string[]>;
}

class ApiClient {
  private token: string | null = null;

  constructor() {
    if (typeof window !== "undefined") {
      this.token = localStorage.getItem("df_auth_token");
    }
  }

  setToken(token: string | null) {
    this.token = token;
    if (typeof window !== "undefined") {
      if (token) {
        localStorage.setItem("df_auth_token", token);
      } else {
        localStorage.removeItem("df_auth_token");
      }
    }
  }

  getToken() {
    return this.token;
  }

  async request<T = any>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = endpoint.startsWith("http") ? endpoint : `${BASE_URL}${endpoint}`;
    
    const headers = new Headers(options.headers);
    headers.set("Accept", "application/json");
    if (!(options.body instanceof FormData)) {
      headers.set("Content-Type", "application/json");
    }
    
    if (this.token) {
      headers.set("Authorization", `Bearer ${this.token}`);
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle token expiration
        if (response.status === 401 && typeof window !== "undefined") {
          this.setToken(null);
          // Optional: redirect to login
        }
        return data as ApiResponse<T>;
      }

      return data as ApiResponse<T>;
    } catch (error) {
      return {
        status: "error",
        message: "Network error or server unreachable",
        data: null as any,
        code: 500,
        timestamp: new Date().toISOString(),
      };
    }
  }

  get<T = any>(endpoint: string, options: RequestInit = {}) {
    return this.request<T>(endpoint, { ...options, method: "GET" });
  }

  post<T = any>(endpoint: string, body: any, options: RequestInit = {}) {
    return this.request<T>(endpoint, {
      ...options,
      method: "POST",
      body: body instanceof FormData ? body : JSON.stringify(body),
    });
  }

  put<T = any>(endpoint: string, body: any, options: RequestInit = {}) {
    return this.request<T>(endpoint, {
      ...options,
      method: "PUT",
      body: JSON.stringify(body),
    });
  }

  delete<T = any>(endpoint: string, options: RequestInit = {}) {
    return this.request<T>(endpoint, { ...options, method: "DELETE" });
  }
}

export const api = new ApiClient();
