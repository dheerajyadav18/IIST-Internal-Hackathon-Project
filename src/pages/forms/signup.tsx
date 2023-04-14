import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useAuth } from "../../context/AuthContext";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { ref, set } from "firebase/database";
import { rtdb } from "@/config/firebase";
import { useRouter } from "next/router";
import i18next from "i18next"

const SignUp = () => {
  const { user, signUp } = useAuth();
  // console.log(user+"hello there!");
  const [data, setData] = useState({
    fullname: "",
    contactnumber: "",
    email: "",
    address: "",
    password: "",
    selector: "",
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

  const router = useRouter();

  const handleSignup = async (e: any) => {
    e.preventDefault();
    const { fullname, contactnumber, email, address, password, selector } =
      data;
    try {
      const user = await signUp(data.email, data.password);
      set(ref(rtdb, `users/${user?.user.uid}`), {
        fullname,
        contactnumber,
        email,
        address,
        role: selector,
      });
      router.push("/userprofile/Profile");
    } catch (err) {
      console.log(err);
    }

    // if (Response) {
    //   setData({
    //     fullname: "",
    //     contactnumber: "",
    //     email: "",
    //     address: "",
    //     password: "",
    //     selector: "",
    //   });
    // } else {
    //   alert("plz fill the data");
    // }

    // console.log(data)
  };
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
      <Navbar />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 5,
            marginBottom: 10,
            display: "flex",
            flexDirection: "column",
            onsubmit: "handleSignup",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {i18next.t("signup")}
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSignup}
            sx={{ mt: 1 }}
          >
            <TextField
              autoComplete="given-name"
              name="fullname"
              margin="normal"
              required
              fullWidth
              id="fullname"
              value={data.fullname}
              onChange={handleInputs}
              label={i18next.t("fullname")}
              autoFocus
            />

            <TextField
              required
              fullWidth
              margin="normal"
              id="contactnumber"
              type="tel"
              label={i18next.t("contactnumber")}
              value={data.contactnumber}
              onChange={handleInputs}
              name="contactnumber"
              autoComplete="contactnumber"
            />

            <TextField
              required
              fullWidth
              margin="normal"
              id="email"
              type="email"
              value={data.email}
              onChange={handleInputs}
              label={i18next.t("email")}
              name="email"
              autoComplete="off"
            />

            <TextField
              required
              fullWidth
              margin="normal"
              id="address"
              value={data.address}
              onChange={handleInputs}
              label={i18next.t("address")}
              name="address"
              autoComplete="address"
            />

            <TextField
              required
              fullWidth
              margin="normal"
              name="password"
              label={i18next.t("password")}
              type="password"
              onChange={handleInputs}
              value={data.password}
              id="password"
              autoComplete="on"
            />

            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{i18next.t("role")}</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={data.selector}
                  name="selector"
                  label="Role"
                  onChange={handleInputs}
                >
                  <MenuItem value="producer">{i18next.t("producer")}</MenuItem>
                  <MenuItem value="consumer">{i18next.t("consumer")}</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {i18next.t("signup")}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/forms/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
export default SignUp;
