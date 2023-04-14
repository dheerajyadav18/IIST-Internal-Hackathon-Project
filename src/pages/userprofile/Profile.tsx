import React from "react";
import UserProfilePage from "../../components/UserProfile";
import Mockuserdata from "@/assets/Mockuserdata";
import { useAuthSecure } from "@/hooks/useAuthSecure";
import AddCrop from "@/components/AddCrop";
import i18next from 'i18next';

const Profile = () => {

  useAuthSecure();
  return (
    <div className="bg-white">
      <UserProfilePage />
    </div>
  );
};

export default Profile;
