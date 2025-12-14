import { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import {
  Container,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton,
  Divider,
  Collapse,
  Button,
  Modal,
  Box,
  TextField,
  MenuItem
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import FilterListIcon from "@mui/icons-material/FilterList";
import { getConditionals, getConditionalById, createConditional, deleteConditionalItem, closeConditional, returnConditional } from "../services/conditionalService";
import { getCustomers } from "../services/customerService";
import { useNavigate } from "react-router-dom";

export default function ConditionalListPage() {
  const navigate = useNavigate();

  const [conditionals, setConditionals] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [openRow, setOpenRow] = useState<string | null>(null);

  //Filtro por status dos condicionais
  const [statusFilter, setStatusFilter] = useState<string>("");

  // Modal para criar condicional
  const [openModal, setOpenModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState("");

  // Modal para devolução de condicional
  const [openReturnModal, setOpenReturnModal] = useState(false);
  const [selectedConditional, setSelectedConditional] = useState<any | null>(null);
  const [returnedItems, setReturnedItems] = useState<Record<string, number>>({});

  const userId = "543c73ca-2f9c-420f-a789-6ab770ef0f39";

  useEffect(() => {
    loadData();
  }, [statusFilter]);

  async function loadData() {
    const query = statusFilter ? `?status=${statusFilter}` : "";
    const conds = await getConditionals(query);
    const cust = await getCustomers();
    setCustomers(cust);
    setConditionals(conds);
  }

  async function handleCreate() {
    if (!selectedCustomer) return;

    const newId = await createConditional({
      customer_id: selectedCustomer,
      user_id: userId,
      status: "open",
    });

    setOpenModal(false);
    navigate(`/condicionais/${newId}/adicionar`);
  }

  async function handleDeleteItem(itemId: string, conditionalId: string) {
    const confirm = window.confirm(
      "Tem certeza que deseja remover este item do condicional?"
    );
  
    if (!confirm) return;
  
    try {
      await deleteConditionalItem(itemId);
        
      setConditionals((prev) =>
        prev.map((c) =>
          c.id === conditionalId
            ? {
                ...c,
                items: c.items.filter((item: any) => item.id !== itemId),
              }
            : c
        )
      );
    } catch (err) {
      alert("Erro ao remover item");
    }
  }

  async function handleCloseConditional(id: string) {
    try {
      await closeConditional(id);
      await loadData();
      alert("Condicional fechado com sucesso");
    } catch (err: any) {
      alert(err.message || "Erro ao fechar condicional");
    }
  }

  async function handleReturnConditional() {
    if (!selectedConditional) return;
  
    const itemsPayload = selectedConditional.items.map((item: any) => ({
      conditional_item_id: item.id,
      returned_quantity: returnedItems[item.id] || 0,
    }));
  
    try {
      await returnConditional(selectedConditional.id, itemsPayload);
      setOpenReturnModal(false);
      await loadData();
      alert("Devolução realizada com sucesso");
    } catch (err: any) {
      alert(err.message || "Erro ao devolver condicional");
    }
  }

  function handleOpenReturnModal(conditional: any) {
    setSelectedConditional(conditional);
    setReturnedItems({});
    setOpenReturnModal(true);
  }

  return (
    <>
      <Navbar onSync={loadData} />

      <Container sx={{ py: 4 }}>
        <Typography variant="h4" fontWeight={700} mb={3}>
          Condicionais
        </Typography>

        <Button variant="contained" sx={{ mb: 3 }} onClick={() => setOpenModal(true)}>
          Novo Condicional
        </Button>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mb: 2,
          }}
        >
          <TextField
            select
            size="small"
            label="Filtrar"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            sx={{
              width: { xs: "100%", sm: 220 },
            }}
            InputProps={{
              startAdornment: (
                <FilterListIcon sx={{ mr: 1, color: "action.active" }} />
              ),
            }}
          >
            <MenuItem value="">Todos</MenuItem>
            <MenuItem value="open">Abertos</MenuItem>
            <MenuItem value="closed">Fechados</MenuItem>
            <MenuItem value="returned">Devolvidos</MenuItem>
          </TextField>
        </Box>

        <Paper sx={{ borderRadius: 3, overflow: "hidden" }}>
          <List>
            {conditionals.map((c) => {
              const qty = c.items.length;

              return (
                <Box key={c.id}>
                  <ListItem
                    secondaryAction={
                      <IconButton onClick={() => setOpenRow(openRow === c.id ? null : c.id)}>
                        <AddIcon />
                      </IconButton>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: "#1976d2", width: 48, height: 48 }}>
                        {c.customer?.name?.charAt(0)}
                      </Avatar>
                    </ListItemAvatar>

                    <ListItemText
                      primary={<Typography fontWeight={600}>{c.customer.name}</Typography>}
                      secondary={`Status: ${c.status} • Itens: ${qty}`}
                    />
                  </ListItem>

                  <Collapse in={openRow === c.id}>
                    <Box sx={{ p: 2, pl: 10 }}>
                    {c.items.map((item: any) => (
                      <Box
                        key={item.id}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          mb: 2,
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Avatar
                            variant="rounded"
                            src={item.product_stock.product.image_url}
                            sx={{ width: 50, height: 50, mr: 2 }}
                          />

                          <Box>
                            <Typography fontWeight={600}>
                              {item.product_stock.product.name}
                            </Typography>
                            <Typography variant="body2">
                              Tamanho: {item.product_stock.size} • Qtde: {item.quantity}
                            </Typography>
                            {item.purchased_quantity > 0 && (
                            <Typography color="error">
                              Comprado: {item.purchased_quantity}
                            </Typography>
                            )}
                            {item.returned_quantity > 0 && (
                              <Typography color="success">
                                Devolvido: {item.returned_quantity}
                              </Typography>
                            )}
                          </Box>
                        </Box>

                        <IconButton
                          color="error"
                          disabled={c.status === "closed" || c.status === "returned"}
                          onClick={() => handleDeleteItem(item.id, c.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    ))}

                      <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                        {c.status === "open" && (
                          <Button
                            variant="contained"
                            color="success"
                            onClick={() => handleCloseConditional(c.id)}
                          >
                            Fechar Condicional
                          </Button>
                        )}

                        {c.status === "closed" && (
                          <Button
                            variant="contained"
                            color="warning"
                            onClick={() => handleOpenReturnModal(c)}
                          >
                            Devolver Condicional
                          </Button>
                        )}

                        <Button
                          variant="outlined"
                          onClick={() => navigate(`/condicionais/${c.id}/adicionar`)}
                          disabled={c.status !== "open"}
                        >
                          Adicionar Itens
                        </Button>
                      </Box>
                    </Box>
                  </Collapse>

                  <Divider />
                </Box>
              );
            })}
          </List>
        </Paper>
      </Container>

      {/* Modal para criar condicional */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            p: 4,
            bgcolor: "white",
            width: 400,
            mx: "auto",
            mt: "10%",
            borderRadius: 3,
          }}
        >
          <Typography variant="h6" fontWeight={600} mb={2}>
            Criar Condicional
          </Typography>

          <TextField
            select
            fullWidth
            label="Cliente"
            value={selectedCustomer}
            onChange={(e) => setSelectedCustomer(e.target.value)}
            sx={{ mb: 3 }}
          >
            {customers.map((c) => (
              <MenuItem key={c.id} value={c.id}>
                {c.name}
              </MenuItem>
            ))}
          </TextField>

          <Button fullWidth variant="contained" disabled={!selectedCustomer} onClick={handleCreate}>
            Criar
          </Button>
        </Box>
      </Modal>

      {/* Modal para retorno de condicionais */}
      <Modal open={openReturnModal} onClose={() => setOpenReturnModal(false)}>
        <Box
          sx={{
            bgcolor: "white",
            width: { xs: "90%", sm: 600 },
            maxHeight: "90vh",
            overflow: "hidden",
            borderRadius: 3,
            mx: "auto",
            mt: { xs: "5vh", sm: "5%" },
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Header */}
          <Box sx={{ p: 3, borderBottom: "1px solid #eee" }}>
            <Typography variant="h6" fontWeight={600}>
              Devolução do Condicional
            </Typography>
          </Box>

          {/* Conteúdo scrollável */}
          <Box sx={{ p: 3, overflowY: "auto", flex: 1 }}>
            {selectedConditional?.items.map((item: any) => (
              <Box
                key={item.id}
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  alignItems: { sm: "center" },
                  gap: 2,
                  mb: 3,
                  p: 2,
                  border: "1px solid #eee",
                  borderRadius: 2,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar
                    variant="rounded"
                    src={item.product_stock.product.image_url}
                    sx={{ width: 50, height: 50 }}
                  />

                  <Box>
                    <Typography fontWeight={600}>
                      {item.product_stock.product.name}
                    </Typography>
                    <Typography variant="body2">
                      Tamanho: {item.product_stock.size}
                    </Typography>
                    <Typography variant="body2">
                      Levado: {item.quantity}
                    </Typography>
                  </Box>
                </Box>

                <TextField
                  type="number"
                  label="Qtde devolvida"
                  inputProps={{
                    min: 0,
                    max: item.quantity,
                  }}
                  value={returnedItems[item.id] ?? 0}
                  onChange={(e) =>
                    setReturnedItems({
                      ...returnedItems,
                      [item.id]: Number(e.target.value),
                    })
                  }
                  fullWidth
                  sx={{ maxWidth: { sm: 160 }, ml: { sm: "auto" } }}
                />
              </Box>
            ))}
          </Box>

          {/* Footer fixo */}
          <Box
            sx={{
              p: 3,
              borderTop: "1px solid #eee",
              display: "flex",
              gap: 2,
            }}
          >
            <Button fullWidth variant="outlined" onClick={() => setOpenReturnModal(false)}>
              Cancelar
            </Button>

            <Button
              fullWidth
              variant="contained"
              color="success"
              onClick={handleReturnConditional}
            >
              Confirmar Devolução
            </Button>
          </Box>
        </Box>
      </Modal>

    </>
  );
}