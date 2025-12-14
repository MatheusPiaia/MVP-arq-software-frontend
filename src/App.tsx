import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ClientesPage from "./pages/ClientesPage";
import StockPage from "./pages/StockPage";
import ConditionalPage from "./pages/ConditionalPage";
import ConditionalListPage from "./pages/ConditionalListPage";
import ConditionalAddItemsPage from "./pages/ConditionalAddItemsPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/clientes" element={<ClientesPage />} />
        <Route path="/estoque" element={<StockPage />} />
        <Route path="/condicionais" element={<ConditionalListPage />} />
        <Route
          path="/condicionais/:conditional_id/adicionar"
          element={<ConditionalAddItemsPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}