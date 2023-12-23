import { Databases, Client } from "appwrite";
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
}

const userService = new UserService();
export default userService;
