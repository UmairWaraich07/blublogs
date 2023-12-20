import { useParams } from "react-router-dom";

const Profile = () => {
  const params = useParams();
  return <div>Profile ID : ${params.id}</div>;
};

export default Profile;
