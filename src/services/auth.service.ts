import { SessionStorage } from '@/models/storages/local-storage-provider';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { HttpService } from './http.service';

export class AuthService {

    private apiKey = "23567b218376f79d9415";
    private http: AxiosInstance = null;
    readonly SessionAccessTokenKey = 'auth_access_token';

    constructor() {
        this.http = axios.create({
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            }
        });
    }

    get token(): any { return SessionStorage.get(this.SessionAccessTokenKey); }

    get isAuthenticated(): boolean { return this.token !== null }

    async getToken(): Promise<boolean> {
        const apiKey = this.apiKey;
        const tokenResponse = await this.post({
            apiKey
        });

        SessionStorage.set(this.SessionAccessTokenKey, tokenResponse.token);
        return tokenResponse.auth;
    }

    async refreshToken(): Promise<boolean> {
        return await this.getToken();
    }

    async post(request: GetTokenRequest): Promise<GetTokenResponse> {
        const config: AxiosRequestConfig = {
            baseURL: HttpService.BaseUrl,
            url: 'auth',
            method: "POST",
            data: request
        };

        const response = await this.http.request<GetTokenResponse>(config);
        return response.data;
    }

}

export interface GetTokenRequest {
    apiKey: string;
}

interface GetTokenResponse {
    token: string;
    auth: boolean;
}

export const authService = new AuthService();