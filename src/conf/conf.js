const conf = {
  appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
  appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
  appwriteUsersCollectionId: String(
    import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID
  ),
  appwritePostsCollectionId: String(
    import.meta.env.VITE_APPWRITE_POSTS_COLLECTION_ID
  ),
  appwriteCategoriesCollectionId: String(
    import.meta.env.VITE_APPWRITE_CATEGORIES_COLLECTION_ID
  ),
  editorApiKey: String(import.meta.env.VITE_TINYMCE_EDITOR_API_KEY),
};

export default conf;
