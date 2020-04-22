import { Component, Prop, Vue, Ref } from 'vue-property-decorator';
import { imagesService } from '@/services/images.service';
import Image from '@/models/image';
import { authService } from '@/services/auth.service';
import { PagedResponse } from '@/services/http.service';
import LightBox from 'vue-image-lightbox'

@Component({
    components: {
        "light-box": LightBox,
    }
})
export default class ImagesGridComponent extends Vue {
    @Ref() readonly lightBox!: any;
    currentPagePaging = 1;
    totalRowsPaging = 550;
    media = [];
    hover = false;

    get fields(): any[] {
        return [
            { key: 'id', label: 'Id' },
            { key: 'src', label: 'Picture' }
        ]
    }
    async mounted() {
        await authService.refreshToken();
        await this.getImages();
    }

    async onImageClick(id: string) {
        const index = this.media.findIndex(m => m.image.id === id);
        this.lightBox.showImage(index);
    }

    async onPage(page: any) {
        await this.getImages(page);
    }

    async getImages(pageNumber = 1) {
        const data: PagedResponse<Image> = await imagesService.getImages(pageNumber);

        const images = await this.fetchImagesWithDetails(data.pictures);

        this.currentPagePaging = data.page;

        this.media = images.map(image => {
            return {
                image,
                thumb: image.croppedPicture,
                src: image.fullPicture,
            }
            
        });
    }

    async getImageDetail(imageId: string): Promise<Image> {
        return await imagesService.getImageDetails(imageId);
    }

    async fetchImagesWithDetails(images: Image[]): Promise<Image[]> {
        const promises = images.map(img => this.getImageDetail(img.id));
        return await Promise.all(promises);
    }

    getMediaFooterByIndex(index: number): string {
        const media = this.media[index];
        return media ? `Author:${media.image.author}; Camera:${media.image.camera}; Tags: ${media.image.tags}` : index.toString();
    }
      
}