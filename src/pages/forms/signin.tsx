import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthContext";
import Navbar from "@/components/Navbar";
import i18next from "i18next";

const theme = createTheme();

const SignIn = () => {
  const { user, signIn } = useAuth();
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    fullname: "",
    contactnumber: "",
    email: "",
    address: "",
    password: "",
  });

  function handleInputs(e: any) {
    const { name, value } = e.target;

    setData((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
  }

  const handleSignin = async (e: any) => {
    e.preventDefault();
    console.log("hello");
    setLoading(true);

    try {
      await signIn(data.email, data.password);
      console.log("hello");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }

    // console.log(data);
  };
  const theme = createTheme({
    palette: {
      primary: {
        main: '#77b81e',
      },
      secondary: {
        main: '#77b81e',
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Navbar/>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {i18next.t("signin")}
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSignin}
            sx={{ mt: 1 }}
          >
            <TextField
              required
              margin="normal"
              fullWidth
              id="email"
              type="email"
              value={data.email}
              onChange={handleInputs}
              label={i18next.t("email")}
              name="email"
              autoComplete="email"
            />
            <TextField
              required
              margin="normal"
              fullWidth
              name="password"
              label={i18next.t("password")}
              type="password"
              onChange={handleInputs}
              value={data.password}
              id="password"
              autoComplete="new-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? "Loading..." : "Login"}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                 {i18next.t("forgotpass")}
                </Link>
              </Grid>
              <Grid item>
                <Link href="/forms/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignIn;
