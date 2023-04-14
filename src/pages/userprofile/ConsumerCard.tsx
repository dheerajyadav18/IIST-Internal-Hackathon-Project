import React, { useState } from "react";
import Link from "next/link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import i18next from "i18next";

function ConsumerCard() {
  const [loading, setLoading] = useState(false);
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

  return (
    <ThemeProvider theme={theme}>
      <div className="flex flex-wrap justify-center items-center px-4 py-8  ">
        <div className="flex flex-col items-center justify-center w-56 h-full px-4 py-8 text-center border-solid border border-gray-400 rounded-lg bg-white drop-shadow-md hover:drop-shadow-2xl">
          <img
            className="h-12 w-auto"
            src="https://d3g7htsbjjywiv.cloudfront.net/assets/common/images/icons/business.svg"
            alt=""
            width="64"
            height="48"
            loading="lazy"
          ></img>
          <p className="m-0 mt-4 text-xl font-bold text-black">{i18next.t("consumer")}</p>
          <div className="m-0 mt-2 mb-4 text-sm leading-6 text-gray-900">
            {i18next.t("consumercard")}
          </div>
          <div className="flex justify-center text-center">
            <Link
              href="/userprofile/Profile"
            >
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
              >
                {loading ? "Loading..." : "Register"}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default ConsumerCard;
