import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";

export default function ProductCard({ product }) {
  return (
    <Card
      elevation={3}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        transition: "0.3s",
        cursor: "pointer",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: 6,
        },
      }}
    >
      <CardMedia
        component="img"
        image={product.image_url}
        alt={product.name}
        sx={{
          height: 260,
          objectFit: "contain",
          objectPosition: "center",
          padding: 2,
          backgroundColor: "white",
        }}
      />

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          {product.name}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            height: 40,
            overflow: "hidden",
          }}
        >
          {product.description}
        </Typography>

        <Box mt={2}>
          <Typography variant="h6" fontWeight="bold">
            R$ {product.price}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}