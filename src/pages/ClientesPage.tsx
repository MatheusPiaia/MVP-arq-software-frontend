import { useEffect, useState } from "react";
import { Customer, getCustomers, createCustomer } from "../services/customerService";
import Navbar from "../components/NavBar";
import AddCustomerModal from "../components/AddCustomerModal";
import { Fragment } from "react";

import {
  Container,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Paper,
  Button,
  Box,
  Typography,
  Divider
} from "@mui/material";

export default function ClientesPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  const loadCustomers = async () => {
    const data = await getCustomers();
    setCustomers(data);
  };

  const handleAddCustomer = async (customerData: any) => {
    await createCustomer(customerData);
    setModalOpen(false);
    await loadCustomers(); // atualiza lista
  };


  useEffect(() => {
    loadCustomers();
  }, []);

  return (
    <>
    <Navbar />

    <Container sx={{ py: 4 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4" fontWeight={700}>
          Clientes
        </Typography>

        <Button variant="contained" onClick={() => setModalOpen(true)}>
          Adicionar Cliente
        </Button>
      </Box>

      <Paper sx={{ borderRadius: 3, overflow: "hidden" }}>
        <List>
          {customers.map((c) => (
            <Fragment key={c.id}>
              <ListItem key={c.id}> 
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: "primary.main" }}>
                    {c.name.charAt(0)}
                  </Avatar>
                </ListItemAvatar>

                <ListItemText
                  primary={c.name}
                  secondary={
                    <>
                      <strong>Telefone:</strong> {c.phone}
                      <br />
                      <strong>Endereço:</strong> {c.address}
                    </>
                  }
                />
              </ListItem>
              <Divider />
            </Fragment>
          ))}
        </List>
      </Paper>

      <AddCustomerModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleAddCustomer}
      />
    </Container>
    </>
  );
}