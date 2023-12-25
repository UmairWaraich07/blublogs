import { Databases, Client, Query } from "appwrite";
import conf from "../conf/conf";

class UserService {
  client = new Client();
  databases;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
  }

  async createUser({ email, username, fullName, id }) {
    try {
      //
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteUsersCollectionId,
        id,
        {
          accountId: id,
          email,
          fullName,
          username,
        }
      );
    } catch (error) {
      console.log(
        `Error while creating user in Database :: APPWRITE :: ${error}`
      );
    }
  }

  async editUser({ fullName, username, profileImage, bio, id }) {
    try {
      await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteUsersCollectionId,
        id,
        {
          fullName,
          username,
          profileImage,
          bio,
        }
      );
      return true;
    } catch (error) {
      console.log(`Error while editing the user :: APPWRITE :: ${error}`);
      return false;
    }
  }

  async updateSaved(id, { savedPosts }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteUsersCollectionId,
        id,
        {
          savedPosts,
        }
      );
    } catch (error) {
      console.log(
        `Error while editing the user saved posts :: APPWRITE :: ${error}`
      );
      return false;
    }
  }

  async getUser(queries = [Query.equal()]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteUsersCollectionId,
        queries
      );
    } catch (error) {
      console.log(`Error while getting user from DB :: APPWRITE :: ${error}`);
    }
  }
}

const userService = new UserService();
export default userService;
