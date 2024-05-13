import { Box, Container, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const linkStyle = {
  textDecoration: "none",
  color: "inherit",
};
const titleStyle = {
  fontSize: "1.5rem",
  marginBottom: "1rem",
};
const cursorPointer = { cursor: "pointer" };
const flexCenter = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const Footer = () => {
  return (
    <>
      <Box
        sx={{
          backgroundColor: "#292929",
          marginTop: "5rem",
          padding: "2rem 0",
          color: "white",
        }}
      >
        <Container>
          <Grid container>
            <Grid item xs={6} md={4} sx={flexCenter}>
              <Box>
                <Link style={linkStyle} to="/">
                  <Typography
                    sx={{
                      fontSize: "2rem",
                    }}
                    variant="h3"
                  >
                    ARBA
                  </Typography>
                </Link>
              </Box>
            </Grid>
            <Grid item xs={6} md={4} sx={flexCenter}>
              <Box>
                <Typography sx={titleStyle}>About</Typography>
                <Box>
                  <Typography sx={{ ...cursorPointer, mb: "0.25rem" }}>
                    Blog
                  </Typography>
                  <Typography sx={{ ...cursorPointer, mb: "0.25rem" }}>
                    Meet The Team
                  </Typography>
                  <Typography sx={cursorPointer}>Contact Us</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6} md={4} sx={flexCenter}>
              <Box>
                <Typography sx={titleStyle}>Support</Typography>
                <Box>
                  <Typography sx={{ ...cursorPointer, mb: "0.25rem" }}>
                    Contact Us
                  </Typography>
                  <Typography sx={{ ...cursorPointer, mb: "0.25rem" }}>
                    Shipping
                  </Typography>
                  <Typography sx={{ ...cursorPointer, mb: "0.25rem" }}>
                    Return
                  </Typography>
                  <Typography sx={cursorPointer}>FAQ</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box
        sx={{
          padding: "1rem 0",
        }}
      >
        <Container>
          <Grid container>
            <Grid item xs={12} md={6}>
              <Typography
                sx={{
                  textAlign: { xs: "center", md: "left" },
                }}
              >
                Copyright &copy; 2024 Arba, All Rights Reserved
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: "flex",
                gap: "2rem",
                justifyContent: { xs: "center", md: "right" },
                marginTop: { xs: "0.25rem", md: "auto" },
              }}
            >
              <Typography sx={cursorPointer}>Terms of Service</Typography>
              <Typography sx={cursorPointer}>Privacy Policy</Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Footer;
