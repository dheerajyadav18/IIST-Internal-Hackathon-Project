import React, { useState } from "react";
import Radio from "@mui/material/Radio";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import * as material from "@mui/material";
import { get, ref, set } from "firebase/database";
import { rtdb } from "@/config/firebase";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import i18next from "i18next";

const availableCrops = ["Rice", "Wheat", "Maize", "Sugarcane", "Cotton"];
const TAX_IN_PERCENT = 12;

const AddCrop = ({
  isSubscribed
}: {
  isSubscribed: boolean;
}) => {
  const Router = useRouter();

  const [data, setData] = useState({
    description: "",
    quantity: "",
    price: "",
    age: "",
    location: "",
    cropname: "",
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

  const { user } = useAuth();

  const handlecrops = async (e: any) => {
    if (!user) return;
    e.preventDefault();
    const dbdata = await get(ref(rtdb, `users/${user?.uid}/crops`));
    let crops = dbdata.val() || [];
     let _data = data;
      //@ts-ignore
     _data.price = parseInt(_data.price) +
      (TAX_IN_PERCENT / 100) * parseInt(_data.price);
    crops.push(data);
    await set(ref(rtdb, `users/${user?.uid}/crops`), crops);
    Router.push("/crops");
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

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setData((prevInput) => {
        return {
          ...prevInput,
          location:
            position.coords.latitude.toString() +
            ", " +
            position.coords.longitude.toString(),
        };
      });
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 5,
            marginBottom: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            {i18next.t("addcrop")}
          </Typography>
          <Box
            component="form"
            onSubmit={handlecrops}
            noValidate
            sx={{ mt: 1 }}
          >
            <select
              onChange={(e) =>
                setData((_data) => ({
                  ..._data,
                  cropname: e.target.value,
                }))
              }
              value={data.cropname}
              className="w-full bg-white px-3 py-4 border-gray-300 rounded-md border-[1px]"
            >
              <option value="" disabled>
                {i18next.t("selectcrop")}
              </option>
              {availableCrops.map((crop, index) => (
                <option key={index} value={crop}>
                  {crop}
                </option>
              ))}
            </select>
            <TextField
              margin="normal"
              required
              fullWidth
              id="crop_Detail"
              label="Crop Description"
              onChange={handleInputs}
              name="description"
              autoComplete="off"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="crop_quantity"
              onChange={handleInputs}
              label="Quantity (in kgs)"
              name="quantity"
              autoComplete="off"
              autoFocus
              type={"number"}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              onChange={handleInputs}
              id="Price"
              label="Expected Price"
              type={"number"}
              name="price"
              autoComplete="off"
              autoFocus
            />
            <FormControl fullWidth margin="normal" onChange={handleInputs}>
              <material.InputLabel
                variant="standard"
                htmlFor="uncontrolled-native"
              >
               {i18next.t("ageofcrop")}
              </material.InputLabel>
              <material.NativeSelect
                defaultValue={30}
                inputProps={{
                  name: "age",
                  id: "uncontrolled-native",
                }}
              >
                <option value={3}>3 Month</option>
                <option value={6}>6 Month</option>
                <option value={1}>1 Year</option>
                <option value={1.5}>1.5 Year</option>
                <option value={2}>2 Year</option>
              </material.NativeSelect>
            </FormControl>
            <br></br>
            <br></br>
            <Box textAlign="center" margin="normal" onChange={handleInputs}>
              <Button variant="contained" component="label">
                {i18next.t("uploadcrop")}
                <input hidden accept="image/*" multiple type="file" />
              </Button>

              <IconButton
                color="primary"
                aria-label="upload picture"
                component="label"
              >
                <input hidden accept="image/*" type="file" />
                {/* <PhotoCamera /> */}
              </IconButton>
              <Button variant="outlined">Delete</Button>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!isSubscribed}
              // onclick=""
            >
             {i18next.t("add")}
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default AddCrop;
