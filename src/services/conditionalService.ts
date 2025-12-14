export interface CreateConditionalDTO {
    customer_id: string;
    user_id: string;
    status: string;
  }
  
  export interface AddConditionalItemDTO {
    conditional_id: string;
    product_stock_id: string;
    quantity: number;
    final_action: string;
  }
  
  // ------ Criar condicional ------
  export async function createConditional(dto: CreateConditionalDTO): Promise<string> {
    const formData = new FormData();
    formData.append("customer_id", dto.customer_id);
    formData.append("user_id", dto.user_id);
    formData.append("status", dto.status);
  
    const res = await fetch("http://localhost:5000/conditional/", {
      method: "POST",
      body: formData,
    });
  
    if (!res.ok) throw new Error("Erro ao criar condicional");
  
    const data = await res.json();
    return data.id; // retorna o UUID do novo condicional
  }
  
  // ------ Adicionar item ao condicional ------
  export async function addConditionalItem(dto: AddConditionalItemDTO) {
    const formData = new FormData();
    formData.append("conditional_id", dto.conditional_id);
    formData.append("product_stock_id", dto.product_stock_id);
    formData.append("quantity", String(dto.quantity));
    formData.append("final_action", dto.final_action);
  
    const res = await fetch("http://localhost:5000/conditional/item/", {
      method: "POST",
      body: formData,
    });
  
    if (!res.ok) throw new Error("Erro ao adicionar item ao condicional");
  
    const data = await res.json();
    return data;
  }
  
  // ------ Buscar lista de condicionais ------
  export async function getConditionals(query) {
    const res = await fetch(`http://localhost:5000/conditional/${query}`);
    if (!res.ok) throw new Error("Erro ao carregar condicionais");
  
    const data = await res.json();
    return data.items;
  }
  
  // ------ Buscar 1 condicional pelo ID ------
  export async function getConditionalById(id: string) {
    const res = await fetch(`http://localhost:5000/conditional/${id}`);
    if (!res.ok) throw new Error("Erro buscando condicional");
  
    return await res.json();
  }

  // ------ Remover item do condicional ------
  export async function deleteConditionalItem(itemId: string): Promise<void> {
    const res = await fetch(
      `http://localhost:5000/conditional/item/${itemId}`,
      {
        method: "DELETE",
      }
    );

    if (!res.ok) {
      throw new Error("Erro ao remover item do condicional");
    }
  }

  export async function closeConditional(id: string) {
    const res = await fetch(`http://localhost:5000/conditional/${id}/close`, {
      method: "POST",
    });
  
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message);
    }
  }

  export interface ReturnConditionalItemDTO {
    conditional_item_id: string;
    returned_quantity: number;
  }
  
  export async function returnConditional(
    conditionalId: string,
    items: ReturnConditionalItemDTO[]
  ) {
  
    const res = await fetch(
      `http://localhost:5000/conditional/${conditionalId}/returned`,
      {
        method: "POST",
        headers: {
          "Content-Type":"application/json",
        },
        body: JSON.stringify({
          items: items.map((i) => ({
            item_id: i.conditional_item_id,
            returned_quantity: i.returned_quantity,
          })),
        }),
      }
    );
  
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Erro ao devolver condicional");
    }
  
    return await res.json();
  }
