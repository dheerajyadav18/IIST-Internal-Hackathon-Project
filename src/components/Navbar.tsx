import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import WebhookIcon from "@mui/icons-material/Webhook";
import Link from "next/link";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import { Stack, useTheme } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import i18next from "i18next";
import { color } from "framer-motion";
import { useTranslation } from "react-i18next";

const pages = ["Home", "Order now", "About"];

const Navbar = () => {
  const { user, logOut, signIn } = useAuth();
  const router = useRouter();
  const settings = [
    {
      name: "Profile",
      handler: async () => {
        router.push("/userprofile/Profile");
      },
    },
    {
      name: user ? "Logout" : "Login",
      handler: async () => {
        if (user) {
          await logOut();
        } else {
          router.push("/forms/signin");
        }
      },
    },
  ];

  // const theme = useTheme();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  const {
    i18n
  } = useTranslation();

  const theme = createTheme({
    palette: {
      secondary: {
        main: "#fffff",
      },

    },
  });

  return (
    
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <DonutLargeIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 5,
              
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".2rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {i18next.t("heading")}
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              backgroundColor: "gray",
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <DonutLargeIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 8,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {i18next.t("heading")}
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Stack direction="row" spacing={2} mt={4}>
              <Link href="/home" style={{ color: "#FFF"}}>
                <Button color="inherit">{i18next.t("Home")}</Button>
              </Link>
              <Link href="/crops" style={{ color: "#FFF" }}>
                <Button color="inherit">{i18next.t("crops")}</Button>
              </Link>
              <Box sx={{ minWidth: 120 ,color:'secondary' }}>
      <FormControl fullWidth sx={{ mb:2 }} >
        <InputLabel id="demo-simple-select-label">Language</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          sx={{
            "& .MuiSvgIcon-root": {
                color: "white"
            }
        }}
          style={{
            borderColor: 'white'
          }}
          value={age}
          label="Age"
          onChange={e => {
            i18n.changeLanguage(e.target.value as string);
          }}
        >
          <MenuItem value={'hi'}>Hindi</MenuItem>
          <MenuItem value={'en'}>English</MenuItem>
        </Select>
      </FormControl>
    </Box>
            </Stack>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 1 }}>
                <AccountCircleIcon
                  fontSize="large"
                  style={{ color: "#e8f5e9" }}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting, index) => (
                <Button key={index} onClick={setting.handler} className="link">
                  <MenuItem key={`${index}1`} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting.name}</Typography>
                  </MenuItem>
                </Button>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
   
  );
};

export default Navbar;
