import { Databases, Client, Query, ID } from "appwrite";
import conf from "../conf/conf";
import fileService from "./file";

class ConfigService {
  client = new Client();
  databases;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
  }

  async createPost({
    slug,
    title,
    content,
    featuredImage,
    category,
    status,
    authorId,
  }) {
    try {
      const categoryName = category.trim().toLowerCase();
      const queries = [Query.equal("name", categoryName)];
      // check if that category is existing...
      const existingCategory = await this.checkCategory(queries);
      console.log({ existingCategory });
      let categoryId;
      if (existingCategory && existingCategory.documents.length > 0) {
        // store the id of that existing category in categoryId
        categoryId = existingCategory.documents[0].$id;
      } else {
        // create a new category
        const createdCategory = await this.createCategory(categoryName);
        if (!createdCategory) throw new Error("New category creation failed!");
        // store the id of new category in categoryId
        categoryId = createdCategory.$id;
      }
      console.log({ categoryId });
      if (categoryId) {
        // now we got the reference of category Id, store this id in post
        const createdPost = await this.databases.createDocument(
          conf.appwriteDatabaseId,
          conf.appwritePostsCollectionId,
          slug,
          {
            authorId,
            title,
            content,
            category: categoryId,
            status,
            featuredImage,
          }
        );
        if (!createdPost) await fileService.deleteFile(featuredImage);
        return createdPost;
      }
    } catch (error) {
      const deletedFile = await fileService.deleteFile(featuredImage);
      console.log(deletedFile);
      console.log(`Error while creating the post :: APPWRITE :: ${error}`);
    }
  }

  async editPost(slug, { content, featuredImage, status }) {
    try {
      // handle the editpost
      await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwritePostsCollectionId,
        slug,
        {
          content,
          featuredImage,
          status,
        }
      );
      return true;
    } catch (error) {
      await fileService.deleteFile(featuredImage);
      console.log(`Error while editing the post :: APPWRITE :: ${error}`);
      return false;
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwritePostsCollectionId,
        slug
      );

      return true;
    } catch (error) {
      console.log(`Error while deleting post :: APPWRITE :: ${error}`);
      return false;
    }
  }

  async updateLike(slug, { likedBy }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwritePostsCollectionId,
        slug,
        {
          likedBy,
        }
      );
    } catch (error) {
      console.log(`Error while updating the like :: APPWRITE :: ${error}`);
    }
  }
  async updateViewCount(slug, { views }) {
    try {
      this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwritePostsCollectionId,
        slug,
        {
          views,
        }
      );
    } catch (error) {
      console.log(
        `Error while updating the view count :: APPWRITE :: ${error}`
      );
    }
  }

  async getPost(slug) {
    try {
      return this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwritePostsCollectionId,
        slug
      );
    } catch (error) {
      console.log(`Error while getting a post :: APPWRITE :: ${error}`);
    }
  }

  async getPosts(query = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwritePostsCollectionId,
        query
      );
    } catch (error) {
      console.log(`Error while getting all the posts :: APPWRITE :: ${error}`);
    }
  }

  async fetchSavedPostsData(savedPostIds) {
    try {
      const posts = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwritePostsCollectionId,
        [Query.equal("$id", savedPostIds)]
      );
      return posts.documents; // Return fetched post documents
    } catch (error) {
      console.error("Error fetching saved posts:", error);
      return []; // Return empty array if any error occurs
    }
  }

  async getCategories() {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCategoriesCollectionId
      );
    } catch (error) {
      console.log(`Error while checking the category :: APPWRITE :: ${error}`);
    }
  }

  async createCategory(categoryName) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCategoriesCollectionId,
        ID.unique(),
        {
          name: categoryName,
        }
      );
    } catch (error) {
      console.log(`Error while creating the category :: APPWRITE :: ${error}`);
    }
  }

  async deleteCategory(categoryId) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCategoriesCollectionId,
        categoryId
      );
      return true;
    } catch (error) {
      console.log(`Error while deleting the category :: APPWRITE :: ${error}`);
      return false;
    }
  }

  async getCategory(categoryId) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCategoriesCollectionId,
        categoryId
      );
    } catch (error) {
      console.log(
        `Error while getting the category by Id :: APPWRITE :: ${error}`
      );
      return false;
    }
  }

  async checkCategory(queries = [Query.equal()]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCategoriesCollectionId,
        queries
      );
    } catch (error) {
      console.log(`Error while checking the category :: APPWRITE :: ${error}`);
    }
  }
}

const configService = new ConfigService();
export default configService;
