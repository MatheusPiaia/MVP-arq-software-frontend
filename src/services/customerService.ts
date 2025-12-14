export interface Customer {
    id: string;
    name: string;
    phone: string;
    address: string;
  }
  
  export async function getCustomers(): Promise<Customer[]> {
    const res = await fetch("http://localhost:5000/customer/");
  
    if (!res.ok) {
      throw new Error("Erro ao carregar clientes");
    }
  
    const data = await res.json();
    return data.items;
  }

  export async function createCustomer(customerData: { name: string; phone: string; address: string }) {
    const formData = new FormData();
    formData.append("name", customerData.name);
    formData.append("phone", customerData.phone);
    formData.append("address", customerData.address);
  
    const res = await fetch("http://localhost:5000/customer/", {
      method: "POST",
      body: formData,
    });
  
    if (!res.ok) {
      throw new Error("Erro ao criar cliente");
    }
  
    return res.json();
  }