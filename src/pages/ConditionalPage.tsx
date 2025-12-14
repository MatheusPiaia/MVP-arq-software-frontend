import { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  TextField,
  MenuItem,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton,
  Divider,
  Collapse,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import {
  getStock,
  StockItem
} from "../services/stockService";

import {
  getCustomers,
  Customer
} from "../services/customerService";

import {
  createConditional,
  addConditionalItem,
  getConditionals,
} from "../services/conditionalService";

export default function ConditionalPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [stock, setStock] = useState<StockItem[]>([]);
  const [grouped, setGrouped] = useState<any[]>([]);

  const [openRow, setOpenRow] = useState<string | null>(null);

  // Campos do novo condicional
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [userId] = useState("543c73ca-2f9c-420f-a789-6ab770ef0f39"); // usuario fixo até implantar cadastro de usuarios
  const [createdConditionalId, setCreatedConditionalId] = useState<string | null>(null);

  // Campos do item a ser adicionado
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState("");

  useEffect(() => {
    loadInitialData();
  }, []);

  async function loadInitialData() {
    const cust = await getCustomers();
    const st = await getStock();

    setCustomers(cust);
    setStock(st);

    // Agrupar por produto (mesmo esquema da página de estoque)
    const groupedProducts = Object.values(
      st.reduce((acc: any, item) => {
        const pid = item.product.id;
        if (!acc[pid]) acc[pid] = { product: item.product, items: [] };
        acc[pid].items.push(item);
        return acc;
      }, {})
    );

    setGrouped(groupedProducts);
  }

  // Criar condicional
  async function handleCreateConditional() {
    if (!selectedCustomer) return;

    const newId = await createConditional({
      customer_id: selectedCustomer,
      user_id: userId,
      status: "open",
    });

    setCreatedConditionalId(newId);
  }

  // Adicionar item ao condicional
  async function handleAddItem() {
    if (!createdConditionalId || !selectedSize || !selectedQuantity) return;

    await addConditionalItem({
      conditional_id: createdConditionalId,
      product_stock_id: selectedSize,
      quantity: Number(selectedQuantity),
      final_action: "pending",
    });

    setSelectedSize("");
    setSelectedQuantity("");
    setOpenRow(null);
  }

  return (
    <>
      <Navbar onSync={loadInitialData} />

      <Container sx={{ py: 4 }}>
        <Typography variant="h4" fontWeight={700} mb={3}>
          Cadastro de Condicionais
        </Typography>

        {/* --------------------------------- */}
        {/*           CRIAR CONDICIONAL        */}
        {/* --------------------------------- */}
        <Paper sx={{ p: 3, mb: 4, borderRadius: 3 }}>
          <Typography variant="h6" fontWeight={600} mb={2}>
            Criar novo condicional
          </Typography>

          <Box sx={{ display: "flex", gap: 3 }}>
            <TextField
              select
              label="Cliente"
              value={selectedCustomer}
              onChange={(e) => setSelectedCustomer(e.target.value)}
              sx={{ width: 280 }}
            >
              {customers.map((c) => (
                <MenuItem key={c.id} value={c.id}>
                  {c.name}
                </MenuItem>
              ))}
            </TextField>

            <Button
              variant="contained"
              sx={{ height: 55 }}
              disabled={!selectedCustomer}
              onClick={handleCreateConditional}
            >
              Criar Condicional
            </Button>
          </Box>

          {createdConditionalId && (
            <Typography mt={2} color="green">
              Condicional criado! ID: {createdConditionalId}
            </Typography>
          )}
        </Paper>

        {/* ----------------------------------------------------- */}
        {/*     SE JÁ TEM CONDITIONAL MOSTRA LISTA DOS PRODUTOS   */}
        {/* ----------------------------------------------------- */}
        {createdConditionalId && (
          <Paper sx={{ borderRadius: 3, overflow: "hidden" }}>
            <List>
              {grouped.map((group: any) => {
                const product = group.product;
                const sizes = group.items;

                return (
                  <Box key={product.id}>
                    <ListItem
                      sx={{ display: "flex", gap: 2 }}
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
                        primary={<Typography fontWeight={600}>{product.name}</Typography>}
                        secondary={`R$ ${product.price.toFixed(2)}`}
                      />
                    </ListItem>

                    <Collapse in={openRow === product.id}>
                      <Box sx={{ p: 2, pl: 10 }}>
                        <Typography fontWeight={600} mb={1}>
                          Adicionar Item
                        </Typography>

                        <TextField
                          select
                          label="Tamanho"
                          value={selectedSize}
                          onChange={(e) => setSelectedSize(e.target.value)}
                          sx={{ mr: 2, width: 150 }}
                        >
                          {sizes.map((s: StockItem) => (
                            <MenuItem key={s.id} value={s.id}>
                              {s.size}
                            </MenuItem>
                          ))}
                        </TextField>

                        <TextField
                          label="Quantidade"
                          type="number"
                          value={selectedQuantity}
                          onChange={(e) => setSelectedQuantity(e.target.value)}
                          sx={{ width: 150, mr: 2 }}
                        />

                        <Button
                          variant="contained"
                          disabled={!selectedSize || !selectedQuantity}
                          onClick={handleAddItem}
                        >
                          Adicionar
                        </Button>
                      </Box>
                    </Collapse>

                    <Divider />
                  </Box>
                );
              })}
            </List>
          </Paper>
        )}
      </Container>
    </>
  );
}