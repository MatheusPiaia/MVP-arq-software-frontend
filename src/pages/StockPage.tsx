import { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import { getStock, updateStock, StockItem } from "../services/stockService";
import StockFiltersBar, { StockFilters } from "../components/StockFiltersBar";

import {
  Container,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton,
  Collapse,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function EstoquePage() {
  const [stock, setStock] = useState<StockItem[]>([]);
  const [openRow, setOpenRow] = useState<string | null>(null);

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState("");

//Filtros
  const [filters, setFilters] = useState<StockFilters>({
    size: "",
    category: "",
    brand: "",
    reference: "",
  });

  const loadStock = async () => {
    console.log("Filters before request:", filters);
  const data = await getStock({
    size: filters.size || undefined,
    category: filters.category || undefined,
    brand: filters.brand || undefined,
    reference: filters.reference || undefined,
  });

  setStock(data);
  };

  const handleUpdate = async (stockId: string) => {
    if (!selectedQuantity) return;

    const updatedItem = await updateStock(stockId, Number(selectedQuantity));

  setStock(prev =>
    prev.map(item =>
      item.id === updatedItem.id ? updatedItem : item
    )
  );

    setSelectedQuantity("");
    setSelectedSize("");
    setOpenRow(null);    
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadStock();
    }, 400);
  
    return () => clearTimeout(timer);
  }, [filters.size,
    filters.category,
    filters.brand,
    filters.reference,]);

  // agrupar por produto → para exibir apenas 1 card por produto
  const grouped = Object.values(
    stock.reduce((acc: any, item) => {
      const pid = item.product.id;
      if (!acc[pid]) acc[pid] = { product: item.product, items: [] };
      acc[pid].items.push(item);
      return acc;
    }, {})
  );

  return (
    <>
      <Navbar onSync={() => loadStock()} />

      <Container sx={{ py: 4 }}>      

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 3,
            gap: 2,
            flexWrap: "wrap", // importante para mobile
          }}
        >
          <Typography variant="h4" fontWeight={700}>
            Controle de Estoque
          </Typography>

          <StockFiltersBar
            filters={filters}
            onChange={setFilters}
          />
        </Box>

        <Paper sx={{ borderRadius: 3, overflow: "hidden" }}>
          <List>
            {grouped.map((group: any) => {
              const product = group.product;
              const sizes = group.items; // todas as variações (S, M, L)

              return (
                <Box key={product.id}>
                  <ListItem
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                    }}
                    secondaryAction={
                      <IconButton
                        onClick={() =>
                          setOpenRow(openRow === product.id ? null : product.id)
                        }
                      >
                        <AddIcon />
                      </IconButton>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar
                        variant="rounded"
                        src={product.image_url}
                        sx={{ width: 60, height: 60 }}
                      />
                    </ListItemAvatar>

                    <ListItemText
                      primary={
                        <Typography fontWeight={600}>{product.name}</Typography>
                      }
                      secondary={`R$ ${product.price.toFixed(2)}`}
                    />
                  </ListItem>

                  {/* ÁREA EXPANDIDA */}
                  <Collapse in={openRow === product.id}>
                    <Box sx={{ p: 2, pl: 10 }}>
                      <Typography fontWeight={600} mb={1}>
                        Atualizar Estoque
                      </Typography>

                      {/* SELECT SIZE */}
                      <TextField
                        select
                        label="Tamanho"
                        value={selectedSize}
                        onChange={(e) => setSelectedSize(e.target.value)}
                        sx={{ mr: 2, width: 150 }}
                      >
                        {sizes.map((s: StockItem) => (
                          <MenuItem key={s.id} value={s.id}>
                            {s.size} (Atual: {s.quantity_available})
                          </MenuItem>
                        ))}
                      </TextField>

                      {/* QUANTIDADE */}
                      <TextField
                        label="Quantidade"
                        type="number"
                        value={selectedQuantity}
                        onChange={(e) => setSelectedQuantity(e.target.value)}
                        sx={{ width: 150, mr: 2 }}
                      />

                      {/* BOTÃO */}
                      <Button
                        variant="contained"
                        disabled={!selectedSize || !selectedQuantity}
                        onClick={() => handleUpdate(selectedSize)}
                      >
                        Atualizar
                      </Button>
                    </Box>
                  </Collapse>

                  <Divider />
                </Box>
              );
            })}
          </List>
        </Paper>
      </Container>
    </>
  );
}