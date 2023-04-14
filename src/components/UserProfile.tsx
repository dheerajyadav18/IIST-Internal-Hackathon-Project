import Navbar from "@/components/Navbar";
import { rtdb } from "@/config/firebase";
import { useAuth } from "@/context/AuthContext";
import { UserCredential } from "firebase/auth";
import { get, ref, set } from "firebase/database";
import Image from "next/image";
import React from "react";
import style from "../styles/userprofile.module.css";
import AddCrop from "./AddCrop";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import i18next from "i18next";

export interface User {
  address: string;
  contactnumber: string;
  email: string;
  fullname: string;
  role: string;
  isSubscribed: boolean;
  crops: any[];
}

const UserProfilePage = () => {
  const { user } = useAuth();

  const [userData, setUserData] = React.useState<User | undefined>(undefined);

  React.useEffect(() => {
    console.log(user?.uid);

    get(ref(rtdb, `users/${user?.uid}`)).then((snapshot) => {
      setUserData(snapshot.val());
    });
  }, [user]);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#77b81e",
      },
      secondary: {
        main: "#FF0000",
      },
    },
  });

  const [subscribing, setSubscribing] = React.useState(false);

  const subscribeHandler = async () => {
    setSubscribing(true);
    await set(ref(rtdb, `users/${user?.uid}/isSubscribed`), true);
    // @ts-ignore
    setUserData({
      ...userData,
      isSubscribed: true,
    });
    setSubscribing(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <div className={style.UserProfilePage}>
        <div className={style.ProfilePage}>
          <Image
            src={require("../assets/avtimg.png")}
            className="m-2 p-2"
            width={200}
            alt="User Image"
          />
          <h2 className="mr-10 ">Email:{userData?.email}</h2>
        </div>
        <div className={style.aboutContact}>
          <div className={style.About}>
            <h2>{i18next.t("about")}</h2>
            <p className={style.Description}>{userData?.role}</p>
          </div>
          <div className={style.userContact}>
            <h2>{i18next.t("contact")}</h2>
            <p className={style.contact}>{userData?.contactnumber}</p>
          </div>
          <div className={style.subscribe}>
            {userData?.isSubscribed ? (
              <h3 className="bg-green-400 p-3 text-white rounded-sm drop-shadow-md">
                {i18next.t("subscribe")}
              </h3>
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                sx={{ mt: 3, mb: 2 }}
                onClick={subscribeHandler}
                disabled={subscribing}
              >
                <h3>{subscribing ? "Subscribing" : "Subscribe"}</h3>
              </Button>
            )}
            <p className={style.contact}></p>
          </div>
        </div>
      </div>
      {userData?.role === "producer" && <AddCrop isSubscribed={userData.isSubscribed} />}
    </ThemeProvider>
  );
};

export default UserProfilePage;
