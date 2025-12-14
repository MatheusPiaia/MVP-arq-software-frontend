import { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  List,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";

import { getStock } from "../services/stockService";
import {
  addConditionalItem,
  getConditionalById,
} from "../services/conditionalService";

import { GroupedProduct, Conditional } from "../types";
import ConditionalProductItem from "../components/ConditionalProductItem";
import StockFiltersBar, { StockFilters } from "../components/StockFiltersBar";

export default function ConditionalAddItemsPage() {
  const { conditional_id } = useParams();
  const navigate = useNavigate();

  const [grouped, setGrouped] = useState<GroupedProduct[]>([]);
  const [conditional, setConditional] = useState<Conditional | null>(null);

  //filtros
  const [filters, setFilters] = useState<Filters>({
    size: "",
    category: "",
    brand: "",
    reference: "",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      loadStock();
    }, 400);
  
    return () => clearTimeout(timer);
  }, [filters.size,
    filters.category,
    filters.brand,
    filters.reference,]);

    async function loadStock() {
      if (!conditional_id) return;
    
      const cond = await getConditionalById(conditional_id);
      setConditional(cond);
    
      const stock = await getStock({
        size: filters.size || undefined,
        category: filters.category || undefined,
        brand: filters.brand || undefined,
        reference: filters.reference || undefined,
      });
    
      const available = stock.filter(
        (s) => s.quantity_available > 0
      );
    
      const groupedProducts = Object.values(
        available.reduce((acc: Record<string, GroupedProduct>, item) => {
          const pid = item.product.id;
          if (!acc[pid]) acc[pid] = { product: item.product, items: [] };
          acc[pid].items.push(item);
          return acc;
        }, {})
      );
    
      setGrouped(groupedProducts);
    }

  async function handleAddItem(stockId: string, quantity: number) {
    if (!conditional_id) return;

    await addConditionalItem({
      conditional_id,
      product_stock_id: stockId,
      quantity,
      final_action: "pending",
    });

    // Atualiza info do condicional
    const updated = await getConditionalById(conditional_id);
    setConditional(updated);
  }

  return (
    <>
      <Navbar />      

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
          Adicionar Itens ao Condicional
        </Typography>

        <StockFiltersBar
          filters={filters}
          onChange={setFilters}
        />
      </Box>

        {conditional && (
          <Paper sx={{ p: 2, mb: 3, borderRadius: 3 }}>
            <Typography variant="h6" fontWeight={600}>
              Cliente: {conditional.customer?.name}
            </Typography>
            <Typography>Status: {conditional.status}</Typography>
            <Typography>
              Itens atuais: {conditional.items?.length ?? 0}
            </Typography>
          </Paper>
        )}

        <Button
          variant="outlined"
          sx={{ mb: 2 }}
          onClick={() => navigate("/condicionais")}
        >
          Voltar
        </Button>

        <Paper sx={{ borderRadius: 3, overflow: "hidden" }}>
          <List>
            {grouped.map((group) => (
              <ConditionalProductItem
                key={group.product.id}
                group={group}
                onAdd={handleAddItem}
              />
            ))}
          </List>
        </Paper>

        <Button
          variant="contained"
          color="success"
          sx={{ mt: 3 }}
          onClick={() => navigate("/condicionais")}
        >
          Encerrar Adição de Itens
        </Button>
      </Container>
    </>
  );
}