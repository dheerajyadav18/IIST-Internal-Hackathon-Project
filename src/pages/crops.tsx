import Cards from "@/components/cards";
import React from "react";
import { Cardstdata } from "@/assets/MOCK_DATA";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import styles from "../styles/Cards.module.css";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/context/AuthContext";
import { get, ref } from "firebase/database";
import { rtdb } from "@/config/firebase";
import { User } from "@/components/UserProfile";
import { useAuthSecure } from "@/hooks/useAuthSecure";
import { Typography } from "@mui/material";
import i18next from "i18next";

const Crops = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#77b81e",
      },
      secondary: {
        main: "#77b81e",
      },
    },
  });

  const [userData, setUserData] = React.useState<User | undefined>(undefined);
  const { user } = useAuth();

  useAuthSecure();

  React.useEffect(() => {
    get(ref(rtdb, `users/${user?.uid}`)).then((snapshot) => {
      setUserData(snapshot.val());
    });
  }, [user]);

  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      {userData ? <div className={styles.cropsmain}>
        {userData?.crops?.length > 0 ? (
          userData.crops?.map((_crop, index) => (
            <Cards
              key={index}
              crop={_crop}
              userData={userData}
            />
          ))
        ) : (
          <h1>{i18next.t("nocrops")}</h1>
        )}
      </div> : <Typography>
          Loading
        </Typography>}
    </ThemeProvider>
  );
};

export default Crops;
