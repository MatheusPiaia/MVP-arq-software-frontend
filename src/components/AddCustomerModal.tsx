import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Box
  } from "@mui/material";
  import { useState, useEffect } from "react";
  
  interface AddCustomerModalProps {
    open: boolean;
    onClose: () => void;
    onSave: (data: any) => void;
  }
  
  export default function AddCustomerModal({ open, onClose, onSave }: AddCustomerModalProps) {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
  
    // limpa o modal quando abrir
    useEffect(() => {
      if (open) {
        setName("");
        setPhone("");
        setAddress("");
      }
    }, [open]);
  
    const handleSubmit = () => {
      if (!name || !phone || !address) return;
  
      onSave({ name, phone, address });
    };
  
    const isValid = name.trim() !== "" && phone.trim() !== "" && address.trim() !== "";
  
    return (
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>Adicionar Cliente</DialogTitle>
  
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            <TextField
              label="Nome"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
  
            <TextField
              label="Telefone"
              value={phone}
              required
              onChange={(e) => setPhone(e.target.value)}
            />
  
            <TextField
              label="Endereço"
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
            />
          </Box>
        </DialogContent>
  
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={onClose}>Cancelar</Button>
  
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!isValid}  
          >
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    );
  }