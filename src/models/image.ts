export default class Image {
    id = "";
    croppedPicture = "";
    fullPicture = ""
    author = "";
    camera = "";
    tags = "";

    static parseJson(json: any) {
        if (json === null || json === undefined) return json;
        const { ...rest } = json;

        return Object.assign(
            new Image(),
            {
                croppedPicture: json["cropped_picture"],
                fullPicture: json["full_picture"]
            },
            rest);
    }
}