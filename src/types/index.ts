export interface Product {
    id: string;
    name: string;
    description: string;
    category: string;
    price: number;
    image_url: string;
    created_at: string;
    updated_at: string;
  }
  
  export interface StockItem {
    id: string;
    product: Product;
    quantity_available: number;
    quantity_reserved: number;
    size: string;
    color: string;
    updated_at: string;
  }
  
  export interface GroupedProduct {
    product: Product;
    items: StockItem[];
  }
  
  export interface Customer {
    id: string;
    name: string;
    email: string;
  }
  
  export interface ConditionalItem {
    id: string;
    product_stock_id: string;
    quantity: number;
    final_action: string;
  }
  
  export interface Conditional {
    id: string;
    customer: Customer;
    status: string;
    items?: ConditionalItem[];
  }