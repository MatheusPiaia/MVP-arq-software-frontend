import { useEffect, useState } from "react";
import { syncProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";
import Navbar from "../components/NavBar";
import HeroCarousel from "../components/HeroCarousel";

import { Grid, Box, Container } from "@mui/material";

export default function HomePage() {
  const [products, setProducts] = useState<any[]>([]);

  const handleSync = async () => {
    try {
      const data = await syncProducts();
      setProducts(data);
    } catch (error) {
      console.error("Erro ao sincronizar:", error);
    }
  };

  useEffect(() => {
    async function loadProducts() {
      const data = await syncProducts();
      setProducts(data);
    }
    loadProducts();
  }, []);

  return (
    <>
      <HeroCarousel />
      <Navbar onSync={handleSync}/>
      
      <Container sx={{ py: 4 }}>
        <Box
            sx={{
            display: "grid",
            gap: 3,
            gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
                lg: "repeat(4, 1fr)",
                xl: "repeat(4, 1fr)",
            },
            alignItems: "stretch",
            }}
        >
            {products.map((product, i) => (
            <ProductCard key={i} product={product} />
            ))}
        </Box>
      </Container>
    </>
  );
}