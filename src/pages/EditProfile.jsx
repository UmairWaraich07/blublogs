import { useEffect, useState } from "react";
import { Button, Container, Input, Textarea } from "../components";
import { useForm } from "react-hook-form";
import { ReloadIcon } from "@radix-ui/react-icons";
import userService from "../appwrite/user";
import { Query } from "appwrite";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import fileService from "../appwrite/file";
import { useSelector } from "react-redux";
import { Loader } from "../Icons";

const EditProfile = () => {
  const [previewImage, setPreviewImage] = useState(null);
  const [err, setErr] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loader, setLoader] = useState(true);
  const [profileData, setProfileData] = useState({});
  const { userData } = useSelector((state) => state.auth);
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    watch,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      username: "",
      bio: "",
      image: null,
    },
  });

  useEffect(() => {
    (async () => {
      const user = await userService.getUser([Query.equal("$id", [id])]);
      setProfileData(user.documents[0]);
      setLoader(false);
    })();
  }, [id]);

  useEffect(() => {
    if (profileData) {
      setValue("name", profileData.fullName);
      setValue("username", profileData.username);
      setValue("bio", profileData.bio);
      setValue("image", profileData.profileImage);
    }
  }, [profileData, setValue]);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "image") {
        if (!value?.image) return;
        const file = value.image[0];
        if (file) {
          if (file.type === undefined) return;
          const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/gif",
            "string",
          ]; // Adjust as needed
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

          const reader = new FileReader();
          reader.onload = (e) => {
            setPreviewImage(e.target.result);
            setError("image", null); // Clear any previous errors
          };
          reader.onerror = () => {
            setError("image", "Failed to read image. Please try again.");
          };
          reader.readAsDataURL(file);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, setValue, setError]);

  const editProfile = async (data) => {
    setErr("");
    setIsLoading(true);

    try {
      let file;
      if (typeof data.image === "object") {
        file = data.image[0]
          ? await fileService.uploadFile(data.image[0])
          : null;
        if (file) {
          if (profileData.profileImage) {
            await fileService.deleteFile(profileData.profileImage);
          }
        }
      }
      const editedProfile = await userService.editUser({
        id: id,
        profileImage: file?.$id ? file.$id : data.image,
        fullName: data.name,
        bio: data.bio,
        username: data.username,
      });
      if (editedProfile) navigate(`/profile/${id}`);
    } catch (error) {
      console.log(`Error while submitting edit Profile Data : ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (id !== userData?.$id) return <Navigate to="/" />;

  return loader ? (
    <div className="flex items-center justify-center h-[70vh]">
      <Loader
        className={`fill-dark text-dark dark:fill-light dark:text-light`}
        width={100}
        height={100}
      />
    </div>
  ) : (
    <div className="w-full mt-8">
      <Container>
        <h1 className="text-3xl font-bold dark:text-light">Edit Profile</h1>
        <form
          onSubmit={handleSubmit(editProfile)}
          className="mt-6 flex flex-col items-start gap-4"
        >
          <div className="w-full">
            <Input
              label="Name"
              type="text"
              className="mt-1 w-full max-w-[600px] py-3"
              {...register("name", {
                required: "Name is required",
              })}
            />

            {errors.name && (
              <span className="mt-0.5 text-red-600 text-sm font-inter">
                {errors.name.message}
              </span>
            )}
          </div>
          <div className="w-full">
            <Input
              label="Username"
              type="text"
              className="mt-1 w-full max-w-[600px] py-3"
              {...register("username", {
                required: "Username is required",
              })}
            />

            {errors.username && (
              <span className="mt-0.5 text-red-600 text-sm font-inter">
                {errors.username.message}
              </span>
            )}
          </div>
          <div className="w-full">
            <Input
              label="Profile Image"
              type="file"
              className="mt-1 w-full max-w-[600px] py-3"
              {...register("image")}
            />

            {errors.image && (
              <span className="mt-0.5 text-red-600 text-sm font-inter">
                {errors.image.message}
              </span>
            )}
            {previewImage && (
              <div className="mt-4">
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-[300px] h-[200px] object-cover object-center rounded-lg"
                />
              </div>
            )}
            {profileData.profileImage && (
              <img
                src={fileService.getPostPreview(profileData.profileImage)}
                className="w-[300px] h-[200px] object-cover rounded-lg mt-4"
              />
            )}
          </div>

          <div className="w-full">
            <Textarea
              name="bio"
              label="Bio"
              className="mt-1 w-full max-w-[600px]"
              {...register("bio")}
            />
          </div>

          {err && <p className="text-red-600 mt-1 text-sm">{err.message}</p>}
          <Button disabled={isLoading} type="submit" className="mt-5">
            {isLoading && (
              <span className="mr-2">
                <ReloadIcon className="w-4 h-4 animate-spin dark:text-light" />
              </span>
            )}
            {isLoading ? "Editing..." : "Edit"}
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default EditProfile;
