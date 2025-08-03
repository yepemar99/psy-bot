/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";

export class BaseService {
  private api: AxiosInstance;
  private getToken?: () => string | null;

  /**
   * Agrega headers globales por defecto
   */
  public addHeaders(headers: Record<string, string>): void {
    Object.assign(this.api.defaults.headers.common, headers);
  }

  constructor(baseURL: string, getToken?: () => string | null) {
    this.getToken = getToken;
    this.api = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Interceptor para añadir el token de autenticación
    this.api.interceptors.request.use((config) => {
      const token = this.getToken?.();
      if (token) {
        if (!config.headers) {
          config.headers = {} as import("axios").AxiosRequestHeaders;
        }
        (config.headers as Record<string, string>)[
          "Authorization"
        ] = `${token}`;
      }
      return config;
    });

    // Interceptor de respuesta para manejar errores
    this.api.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        const status = error.response?.status;
        let message = "Error desconocido";

        switch (status) {
          case 400:
            message = "Solicitud incorrect  a.";
            break;
          case 401:
            message = "No autorizado. Por favor, inicia sesión.";
            break;
          case 403:
            message = "No tienes permisos para realizar esta acción.";
            break;
          case 404:
            message = "Recurso no encontrado.";
            break;
          case 500:
            message = "Error interno del servidor.";
            break;
          case 503:
            message = "Servicio no disponible.";
            break;
        }

        // Puedes incluir más detalles del backend si los hay
        if (error.response?.data && typeof error.response.data === "object") {
          const serverMessage = (error.response.data as any).error;
          if (serverMessage) {
            message = `${serverMessage}`;
          }
        }

        return Promise.reject(new Error(message));
      }
    );
  }

  /**
   * Método privado para combinar headers por solicitud con los globales
   */
  private mergeConfig(config?: AxiosRequestConfig): AxiosRequestConfig {
    const mergedConfig: AxiosRequestConfig = {
      ...config,
      headers: {
        ...this.api.defaults.headers.common,
        ...(config?.headers || {}),
      },
    };
    return mergedConfig;
  }

  protected get<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.api.get<T>(url, this.mergeConfig(config));
  }

  protected post<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.api.post<T>(url, data, this.mergeConfig(config));
  }

  protected put<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.api.put<T>(url, data, this.mergeConfig(config));
  }

  protected delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.api.delete<T>(url, this.mergeConfig(config));
  }
}
