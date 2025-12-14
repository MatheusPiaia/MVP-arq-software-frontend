export async function syncProducts() {
    const res = await fetch("http://localhost:5000/products/sync");
  
    if (!res.ok) {
      throw new Error("Erro ao sincronizar");
    }
  
    const data = await res.json();
    return data.items; // <-- devolve só o array
  }