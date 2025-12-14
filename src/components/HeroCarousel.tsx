import Carousel from "react-material-ui-carousel";
import { Paper, Typography, Box } from "@mui/material";
import logoImage from "../images/logo.jpeg"

const items = [
  {
    title: "",
    image: logoImage
  },
  {
    title: "",
    image: logoImage
  }
];

export default function HeroCarousel() {
  return (
    <Carousel
      animation="slide"
      autoPlay
      indicators
      navButtonsAlwaysVisible
      height={400}
      navButtonsProps={{
        style: {
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          borderRadius: "50%",
          color: "white",
        }
      }}
      navButtonsWrapperProps={{
        style: {
          top: "50%",
          transform: "translateY(-50%)",
          height: "100%",
        }
      }}
      indicatorContainerProps={{
        style: {
          position: "absolute",
          bottom: "15px",
          zIndex: 5,
        }
      }}
    >
      {items.map((item, index) => (
        <Paper
          key={index}
          elevation={3}
          style={{ position: "relative", margin: 0 }}
        >
          <Box
            sx={{
              height: 400,
              backgroundImage: `url(${item.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h3"
              color="white"
              sx={{
                backgroundColor: "rgba(0,0,0,0.45)",
                p: 2,
                borderRadius: 2,
              }}
            >
              {item.title}
            </Typography>
          </Box>
        </Paper>
      ))}
    </Carousel>
  );
}