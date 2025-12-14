import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#4F46E5", // Indigo 600
    },
    secondary: {
      main: "#0EA5E9", // Sky 500
    },
    background: {
      default: "#F9FAFB",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#111827",
      secondary: "#6B7280",
    },
  },

  shape: {
    borderRadius: 12, // Deixa tudo mais suave
  },

  typography: {
    fontFamily: "'Inter', sans-serif",
    h6: { fontWeight: 600 },
    body2: { lineHeight: 1.5 },
  },

  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0px 4px 20px rgba(0,0,0,0.05)",
          transition: "0.2s ease",
        },
      },
    },

    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 10,
          textTransform: "none",
          padding: "8px 20px",
          fontWeight: 500,
        },
      },
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          background: "#e3e4e6",
          color: "#111827",
          boxShadow: "0px 2px 8px rgba(0,0,0,0.05)",
        },
      },
    },

    MuiContainer: {
        styleOverrides: {
            root: {
              background: "#FFFFFF",
              color: "#111827",              
            },
          },
    },
  },
});

export default theme;