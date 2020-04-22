import Axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios';
import Image from '@/models/image';
import { HttpService, PagedResponse, Request } from './http.service';

class ImagesService extends HttpService {
    protected getResourceUrl(): string { return "images"; }

    async getImageDetails(id: string): Promise<Image> {
        const imgRequest: Request<Image> = {
            id,
            responseMapper: Image.parseJson
        };
        return await this.getById<Image>(imgRequest);
    }

    async getImages(pageNumber: number): Promise<PagedResponse<Image>> {
        return await this.getPaged<Image>(pageNumber);
    }
}

export const imagesService = new ImagesService();

