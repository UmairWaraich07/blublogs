import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf";
import userService from "./user";

class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async registerUser({ email, password, username, fullName }) {
    try {
      const createdUser = await this.account.create(
        ID.unique(),
        email,
        password,
        username,
        fullName
      );
      if (createdUser) {
        //  create that user in the DB
        const createdDbUser = await userService.createUser({
          fullName,
          username,
          email,
          id: createdUser.$id,
        });

        // login the user
        if (createdDbUser) {
          return await this.loginUser({ email, password });
        }
      } else {
        return createdUser;
      }
    } catch (error) {
      console.log(`Error while registering the user :: APPWRITE :: ${error}`);
    }
  }

  async loginUser({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      console.log(`Error while logging the user :: APPWRITE :: ${error}`);
      throw new Error(error);
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log(
        `Error while getting the current user :: APPWRITE :: ${error}`
      );
    }
    return null;
  }

  async logoutUser() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      console.log(`Error while logging out the user :: APPWRITE :: ${error}`);
    }
  }
}

const authService = new AuthService();

export default authService;
