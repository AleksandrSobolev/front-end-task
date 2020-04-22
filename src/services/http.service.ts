import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { authService } from './auth.service';

export class HttpService {

    private http: AxiosInstance = null;
    public static BaseUrl = "http://interview.agileengine.com";

    protected getResourceUrl(): string {
        return "";
    }

    constructor() {
        this.http = axios.create({
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            }
        });

        this.http.interceptors.request.use(c => this.addAuthorizationHeaderInterceptor(c));
    }

    async getById<T>(request?: Request<T>): Promise<T> {
        if (!authService.isAuthenticated) {
            await authService.getToken();
        }

        const config: AxiosRequestConfig = {
            baseURL: HttpService.BaseUrl,
            url: `${this.getResourceUrl()}/${request.id}`,
            method: "GET",
        };

        const response = await this.http.request<T>(config);
        return request.responseMapper ? request.responseMapper(response.data) : response.data;
    }

    async getPaged<T>(pageNumber: number): Promise<PagedResponse<T>> {
        if (!authService.isAuthenticated) {
            await authService.getToken();
        }

        const config: AxiosRequestConfig = {
            baseURL: HttpService.BaseUrl,
            url: this.getResourceUrl(),
            method: "GET",
            params: {
                "page": pageNumber
            }
        };

        const response = await this.http.request<PagedResponse<T>>(config);
        return response.data;
    }

    private addAuthorizationHeaderInterceptor(config: AxiosRequestConfig) {
        if (!authService.isAuthenticated) {
            return config;
        }
        config.headers = config.headers || {}
        Object.assign(config.headers, { "Authorization": `Bearer ${authService.token}` })
        return config
    }
}

export interface Request<T> {
    id: string;
    responseMapper?: MapResponseHandler<T>;
}

export interface PagedResponse<T> {
    pictures: T[];
    page: number;
    pageCount: number;
    hasMore: boolean;
}

export interface MapResponseHandler<T> {
    (json: any): T;
}