import { Client, ID, Storage } from "appwrite";
import conf from "../conf/conf";

class FileService {
  client = new Client();
  storage;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.storage = new Storage(this.client);
  }

  async uploadFile(file) {
    try {
      return await this.storage.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log(
        `Error while uploading file to bucket :: APPWRITE :: ${error}`
      );
    }
  }

  async deleteFile(postId) {
    try {
      return this.storage.deleteFile(conf.appwriteBucketId, postId);
    } catch (error) {
      console.log(
        `Error while deleting the file from bucket :: APPWRITE :: ${error}`
      );
    }
  }

  async getPostPreview(postId) {
    try {
      this.storage.getFilePreview(conf.appwriteBucketId, postId);
    } catch (error) {
      console.log(`Error while getting post preview :: APPWRITE :: ${error}`);
    }
  }
}

const fileService = new FileService();
export default fileService;
