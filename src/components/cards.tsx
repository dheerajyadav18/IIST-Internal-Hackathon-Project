import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import styles from "../styles/Cards.module.css";
import { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Image from "next/image";
import Fade from "@mui/material/Fade";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { green, purple } from "@mui/material/colors";
import DeleteIcon from "@mui/icons-material/Delete";
import i18next from "i18next";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#D3D3D3",
  border: "1px solid #77b81e",
  borderradius: "10%",
  boxShadow: 24,
  p: 5,
};

export default function Cards(props: any) {
  const crop = props.crop;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#77b81e",
      },
      secondary: {
        main: green[500],
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div className={styles.cropsmain}>
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image="/Image/wheat.jpg"
              alt="green iguana"
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                textAlign="center"
              >
                {crop.crop}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {crop.description}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions style={{ justifyContent: "center" }}>
            <Box textAlign="center">
              <Button variant="contained" onClick={handleOpen}>
                {i18next.t("contactme")}
              </Button>
            </Box>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              open={open}
              onClose={handleClose}
              closeAfterTransition
              slots={{ backdrop: Backdrop }}
              slotProps={{
                backdrop: {
                  timeout: 500,
                },
              }}
            >
              <Fade in={open}>
                <Box className="text-gray-700" sx={style}>
                  {/* <CardMedia
                    component="img"
                    height="140"
                    image="/Image/wheat.jpg"
                    alt="green iguana"
                  /> */}

                  <Typography
                    id="transition-modal-title"
                    variant="h6"
                    textAlign="center"
                    marginTop={3}
                    mr="normal"
                    component="h2"
                  >
                    {crop.crop}
                  </Typography>
                  <Typography
                    id="transition-modal-description"
                    mr="normal"
                    sx={{ mt: 2 }}
                  >
                    {crop.description}
                  </Typography>
                  <Typography
                    id="transition-modal-description"
                    mr="normal"
                    sx={{ mt: 2 }}
                  >
                    {i18next.t("location")}: {crop.Location}
                  </Typography>
                  <Typography
                    id="transition-modal-description"
                    mr="normal"
                    sx={{ mt: 2 }}
                  >
                    {i18next.t("quantity")}: {crop.quantity}
                  </Typography>
                  <Typography
                    id="transition-modal-description"
                    mr="normal"
                    sx={{ mt: 2 }}
                  >
                    {i18next.t("price")} (inclusive of GST): {crop.price}
                  </Typography>
                  <Typography
                    id="transition-modal-description"
                    mr="normal"
                    sx={{ mt: 2 }}
                  >
                    {i18next.t("contact")}: {props.userData.contactnumber}
                  </Typography>
                  <Typography
                    id="transition-modal-description"
                    mr="normal"
                    sx={{ mt: 2 , mb:2 }}
                  >
                    Track Location
                  </Typography>
                  {props.crop.location && <iframe
                    width="300"
                    height="170"
                    // frameborder="0"
                    // scrolling="no"
                    // marginheight="0"
                    // marginwidth="0"
                    src={`https://maps.google.com/maps?q=${
                      (props.crop.location as string).split(", ")[0]
                    },${
                      (props.crop.location as string).split(", ")[1]
                    }&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                  />}
                </Box>
              </Fade>
            </Modal>
          </CardActions>
        </Card>
      </div>
    </ThemeProvider>
  );
}
