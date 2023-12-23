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
      const existingCategory = await this.getCategory(queries);
      let categoryId;
      if (existingCategory.documents.length > 0) {
        categoryId = existingCategory.documents[0].$id;
      } else {
        const createdCategory = await this.createCategory(categoryName);
        if (!createdCategory) throw new Error("New category creation failed!");
        categoryId = createdCategory.$id;
      }
      if (categoryId) {
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

  async editPost({ slug, content, featuredImage, status }) {
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

      const category = this.getPost(slug);
      if (category) {
        const categoryDocs = this.getPosts([
          Query.equal("name", category.name),
        ]);
        if (categoryDocs.length === 0) {
          // Delete the empty category document
          this.deleteCategory(category.$id);
        }
      }
      return true;
    } catch (error) {
      console.log(`Error while deleting post :: APPWRITE :: ${error}`);
      return false;
    }
  }

  async updatePost(slug, { title, content, featuredImage, category, status }) {
    try {
      this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwritePostsCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          category,
          status,
        }
      );
    } catch (error) {
      console.log(`Error while updating the post :: APPWRITE :: ${error}`);
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

  async getCategory(queries = [Query.equal()]) {
    console.log(queries);
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
}

const configService = new ConfigService();
export default configService;
