import cloudinary from "../config/cloudinary.js";
class CloudinaryService {
    uploadImage(file, folder) {
        return new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream({
                folder,
            }, (error, result) => {
                if (error) {
                    return reject(this.normalizeUploadError(error));
                }
                resolve(result);
            });
            stream.end(file.buffer);
        });
    }
    normalizeUploadError(error) {
        if (error?.http_code === 403) {
            return new Error("Cloudinary upload forbidden: the configured API key is missing the 'create' permission. Use an unrestricted API key/secret or enable asset create/upload permissions in Cloudinary.");
        }
        return error;
    }
    async deleteImage(publicId) {
        return cloudinary.uploader.destroy(publicId);
    }
}
export default new CloudinaryService();
//# sourceMappingURL=cloudinary.service.js.map