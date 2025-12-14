import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Divider,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

interface NavBarProps {
  onSync: () => void;
}

export default function NavBar({ onSync }: NavBarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { label: "HOME", path: "/"},    
    { label: "CLIENTES", path: "/clientes" },
    { label: "ESTOQUE", path: "/estoque" },
    { label: "CONDICIONAIS", path: "/condicionais" },
  ];

  return (
    <>
      <AppBar position="sticky" sx={{ backdropFilter: "blur(12px)" }}>
        <Toolbar sx={{ py: 1 }}>
          {/* BOTÃO MOBILE (abre sidebar) */}
          <IconButton
            edge="start"
            sx={{ display: { xs: "block", md: "none" }, mr: 2 }}
            color="inherit"
            onClick={() => setMenuOpen(true)}
          >
            <MenuIcon />
          </IconButton>

          {/* LOGO */}
          <Typography variant="h6" sx={{ fontWeight: 100, flexGrow: 1 }}>
            RITZY FOR YOU
          </Typography>

          {/* MENU DESKTOP */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2,}}>
            {navItems.map((item) => (
              <Button
                key={item.label}
                color="inherit"
                component={Link}
                to={item.path}
              >
                {item.label}
              </Button>
            ))}
            {/* BOTÃO SINCRONIZAR */}
          <Button variant="contained" color="primary" onClick={onSync}>
            SINCRONIZAR
          </Button>
          </Box>

          
        </Toolbar>
      </AppBar>

      {/* SIDEBAR MOBILE */}
      <Drawer
        anchor="left"
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
      >
        <Box sx={{ width: 250, p: 2 }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, mb: 2, textAlign: "center" }}
          >
            Menu
          </Typography>

          <Divider sx={{ mb: 2 }} />

          <List>
            {navItems.map((item) => (
              <ListItem key={item.label} disablePadding>
              <ListItemButton
                component={Link}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                sx={{
                  borderRadius: 2,
                  px: 1,
                  transition: "0.25s",
                  "&:hover": {
                    backgroundColor: "primary.main",
                    color: "white",
                    transform: "translateX(6px)",
                  },
                  "& .MuiListItemText-root": {
                    transition: "0.25s",
                  },
                  "&:hover .MuiListItemText-primary": {
                    color: "white",
                  },
                }}
              >
                <ListItemText
                  primary={item.label}
                  slotProps={{
                    fontSize: 16,
                    fontWeight: 500,
                  }}
                />
              </ListItemButton>
            </ListItem>
            ))}
          </List>

          <Divider sx={{ mt: 2 }} />

          <Button
            variant="contained"
            fullWidth
            color="primary"
            sx={{ mt: 2 }}
            onClick={() => {
              onSync();
              setMenuOpen(false);
            }}
          >
            SINCRONIZAR
          </Button>
        </Box>
      </Drawer>
    </>
  );
}