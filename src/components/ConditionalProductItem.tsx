import { useState } from "react";
import {
  Box,
  Typography,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton,
  Collapse,
  Divider,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { GroupedProduct } from "../types";

interface Props {
  group: GroupedProduct;
  onAdd: (stockId: string, quantity: number) => Promise<void>;
}

export default function ConditionalProductItem({ group, onAdd }: Props) {
  const product = group.product;
  const sizes = group.items;

  const [open, setOpen] = useState(false);
  const [selectedStockId, setSelectedStockId] = useState("");
  const [quantity, setQuantity] = useState("");

  async function handleAdd() {
    if (!selectedStockId || !quantity) return;

    await onAdd(selectedStockId, Number(quantity));

    // reset local
    setSelectedStockId("");
    setQuantity("");
    setOpen(false);
  }

  return (
    <Box>
      <ListItem
        sx={{ display: "flex", gap: 2 }}
        secondaryAction={
          <IconButton onClick={() => setOpen((prev) => !prev)}>
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

      <Collapse in={open}>
        <Box sx={{ p: 2, pl: 10 }}>
          <Typography fontWeight={600} mb={1}>
            Adicionar Item
          </Typography>

          <TextField
            select
            label="Tamanho"
            value={selectedStockId}
            onChange={(e) => setSelectedStockId(e.target.value)}
            sx={{ mr: 2, width: 180 }}
          >
            <MenuItem value="">
              <em>Selecione</em>
            </MenuItem>

            {sizes.map((s) => (
              <MenuItem key={s.id} value={s.id}>
                {s.size} (Disp: {s.quantity_real})
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Quantidade"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            sx={{ width: 140, mr: 2 }}
          />

          <Button
            variant="contained"
            disabled={!selectedStockId || !quantity}
            onClick={handleAdd}
          >
            Adicionar
          </Button>
        </Box>
      </Collapse>

      <Divider />
    </Box>
  );
}