import {
    Box,
    TextField,
    MenuItem,
    IconButton,
    Drawer,
    Typography,
    Button,
  } from "@mui/material";
  import FilterListIcon from "@mui/icons-material/FilterList";
  import { useState } from "react";
  
  export interface StockFilters {
    size: string;
    category: string;
    brand: string;
    reference: string;
  }
  
  interface Props {
    filters: StockFilters;
    onChange: (filters: StockFilters) => void;
  }
  
  export default function StockFiltersBar({ filters, onChange }: Props) {
    const [open, setOpen] = useState(false);
  
    const handleChange = (field: keyof StockFilters, value: string) => {
      onChange({
        ...filters,
        [field]: value,
      });
    };
  
    const content = (
      <Box sx={{ p: 3, width: 280 }}>
        <Typography variant="h6" fontWeight={600} mb={2}>
          Filtros
        </Typography>
  
        <TextField
          select
          fullWidth
          label="Tamanho"
          value={filters.size}
          onChange={(e) => handleChange("size", e.target.value)}
          sx={{ mb: 2 }}
        >
          <MenuItem value="">Todos</MenuItem>
          <MenuItem value="P">P</MenuItem>
          <MenuItem value="M">M</MenuItem>
          <MenuItem value="G">G</MenuItem>
          <MenuItem value="UN">UN</MenuItem>
          
        </TextField>
  
        <TextField
          select
          fullWidth
          label="Categoria"
          value={filters.category}
          onChange={(e) => handleChange("category", e.target.value)}
          sx={{ mb: 2 }}
        >
          <MenuItem value="">Todos</MenuItem>
          <MenuItem value="jewelery">Joias</MenuItem>
          <MenuItem value="electronics">Eletrônicos</MenuItem>
          <MenuItem value="men's clothing">Roupas Masculinas</MenuItem>
          <MenuItem value="women's clothing">Roupas Femininas</MenuItem>
          
        </TextField>        
  
        <TextField
          fullWidth
          label="Marca"
          value={filters.brand}
          onChange={(e) => handleChange("brand", e.target.value)}
          sx={{ mb: 2 }}
        />
  
        <TextField
          fullWidth
          label="Referência"
          value={filters.reference}
          onChange={(e) => handleChange("reference", e.target.value)}
          sx={{ mb: 3 }}
        />
  
        <Button
          fullWidth
          variant="outlined"
          onClick={() =>
            onChange({
              size: "",
              category: "",
              brand: "",
              reference: "",
            })
          }
        >
          Limpar filtros
        </Button>
      </Box>
    );
  
    return (
      <>
        {/* Botão de filtro (desktop e mobile) */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <IconButton onClick={() => setOpen(true)}>
            <FilterListIcon />
          </IconButton>
        </Box>
  
        {/* Drawer (mobile + desktop) */}
        <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
          {content}
        </Drawer>
      </>
    );
  }