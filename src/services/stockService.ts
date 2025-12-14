export interface StockItem {
    id: string;
    size: string;
    color: string;
    quantity_available: number;
    quantity_reserved: number;
    updated_at?: string;
    product: {
      id: string;
      name: string;
      description: string;
      category: string;
      image_url: string;
      price: number;
      created_at: string;
    };
  }

  export interface StockFilters {
    size?: string;
    category?: string;
    brand?: string;
    reference?: string;
  }
  
  export async function getStock(filters?: StockFilters): Promise<StockItem[]> {    
    const params = new URLSearchParams();

    if (filters?.size) params.append("size", filters.size);
    if (filters?.category) params.append("category", filters.category);
    if (filters?.brand) params.append("brand", filters.brand);
    if (filters?.reference) params.append("reference", filters.reference);

    const res = await fetch(`http://localhost:5000/stock/?${params.toString()}`);
    if (!res.ok) throw new Error("Erro carregando estoque");

    const data = await res.json();
    return data.items;
  }
  
  export async function updateStock(stockId: string, quantity: number) {
    const formData = new FormData();
    formData.append("quantity_available", String(quantity));
  
    const res = await fetch(`http://localhost:5000/stock/${stockId}`, {
      method: "PATCH",
      body: formData,
    });
  
    if (!res.ok) throw new Error("Erro atualizando estoque");
  
    return await res.json();
  }