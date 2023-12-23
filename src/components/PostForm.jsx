import { useForm } from "react-hook-form";
import { Button, Input, Select } from "./index";
import { useEffect, useState } from "react";
import { RTE } from "./RTE";
import { ReloadIcon } from "@radix-ui/react-icons";
import configService from "../appwrite/config";
import fileService from "../appwrite/file";
import { useSelector } from "react-redux";
const PostForm = () => {
  const [err, setErr] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const userData = useSelector((state) => state.auth.userData);
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    getValues,
    setError,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      slug: "",
      content: "",
      image: null,
      status: "active",
    },
  });

  const submit = async (data) => {
    setErr("");
    setIsLoading(true);
    try {
      console.log(data.image[0]);
      const file = await fileService.uploadFile(data.image[0]);
      if (file) {
        const createdPost = await configService.createPost({
          featuredImage: file.$id,
          authorId: userData.$id,
          ...data,
        });
        console.log({ createdPost });
      }
    } catch (error) {
      console.log(`Error while submitting Post Form Data : ${error}`);
      setErr(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const transformSlug = (title) => {
    // Convert title to lowercase
    let slug = title.trim().toLowerCase();

    // Replace spaces with hyphens
    slug = slug.replace(/\s+/g, "-");

    // Remove special characters
    slug = slug.replace(/[^\w\s-]/g, "");

    return slug;
  };

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", transformSlug(value.title));
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, setValue]);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "image") {
        if (!value?.image) return;
        const file = value?.image[0];

        // Error handling for invalid files
        if (file) {
          const allowedTypes = ["image/jpeg", "image/png", "image/gif"]; // Adjust as needed
          if (!allowedTypes.includes(file.type)) {
            setError("image", {
              type: "manual",
              message: "Invalid file type. Please select an image file.",
            });
            setValue("image", null);
            return; // Stop processing
          }

          if (file.size > 10485760) {
            // 10 MB limit
            setError("image", {
              type: "manual",
              message: "File size exceeds 10 MB limit.",
            });
            setValue("image", null);
            return;
          }

          // Read the file
          const reader = new FileReader();
          reader.onload = (e) => {
            setPreviewImage(e.target.result);
            setError("image", null); // Clear any previous errors
          };
          reader.onerror = () => {
            setError("Failed to read image. Please try again.");
          };
          reader.readAsDataURL(file);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, setError, setValue]);

  return (
    <form
      className=" mt-6 flex flex-col items-start gap-4"
      onSubmit={handleSubmit(submit)}
    >
      <div className="w-full">
        <Input
          label="Blog Title"
          type="text"
          defaultValue=""
          className="mt-1 w-full max-w-[600px] py-3"
          {...register("title", {
            required: "Title is required",
          })}
        />
        <p className="text-sm text-lightBlue mt-1 font-inter">
          Be specified and imagine you are sharing your thoughts with others
        </p>
        {errors.title && (
          <span className="text-red-600 mt-1">{errors.title.message}</span>
        )}
      </div>
      <div className="w-full">
        <Input
          label="Slug"
          type="text"
          className="mt-1 w-full max-w-[600px] py-3"
          readOnly={true}
          {...register("slug", {
            required: true,
          })}
        />
        <p className="text-sm text-lightBlue mt-1 font-inter">
          Slug is auto generated
        </p>
        {errors.slug && (
          <span className="text-red-600 mt-1">{errors.slug.message}</span>
        )}
      </div>

      <div className="w-full">
        <RTE
          name="content"
          defaultValue={getValues("content")}
          label="Detailed explanation of your Blog"
          control={control}
        />
        <p className="text-lightBlue text-sm mt-1 font-inter">
          Write detailed explanation on what you put in the title. Minimum 100
          characters
        </p>
        {errors.content && (
          <span className="text-red-600 mt-1">{errors.content.message}</span>
        )}
      </div>

      <div className="w-full">
        <Input
          label="Featured image for your blog"
          type="file"
          className="max-w-[600px] py-3 w-full mt-1"
          {...register("image", {
            required: "Image is required",
          })}
        />

        {errors.image && (
          <span className="text-red-600 mt-1">{errors.image.message}</span>
        )}

        {previewImage && (
          <div className="mt-4">
            <img
              src={previewImage}
              alt="Preview"
              className="w-[300px] h-[200px] object-cover"
            />
          </div>
        )}
      </div>

      <div className="w-full">
        <Input
          label="Category"
          type="text"
          className="max-w-[600px] py-3 mt-1 w-full"
          {...register("category", {
            required: "Category is required",
          })}
        />
        <p className="text-lightBlue text-sm mt-1 font-inter max-w-[600px]">
          Add one Category to describe what your question is about.
        </p>
      </div>

      <div className="w-full">
        <Select
          label="Status"
          options={["active", "inactive"]}
          className="max-w-[200px] w-full mt-1"
          {...register("status", {
            required: true,
          })}
        />
      </div>
      {err && <p className="text-red-600 mt-2 text-sm">{err}</p>}
      <Button disabled={isLoading} type="submit" className="mt-5">
        {isLoading && (
          <span className="mr-2">
            <ReloadIcon className="w-4 h-4 animate-spin" />
          </span>
        )}
        {isLoading ? "Posting..." : "Post"}
      </Button>
    </form>
  );
};

export default PostForm;
