import { Product } from "@/types/Product";
import { nikeProducts } from "@/data/products";

// Simulação de delay de API
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Armazenamento local simulando uma base de dados
let products: Product[] = [...nikeProducts];

export const productService = {
  // Listar todos os produtos
  async getAllProducts(): Promise<Product[]> {
    await delay(500); // Simula latência da API
    return [...products];
  },

  // Buscar produto por ID
  async getProductById(id: number): Promise<Product | null> {
    await delay(300);
    return products.find(p => p.id === id) || null;
  },

  // Criar novo produto
  async createProduct(productData: Omit<Product, 'id'>): Promise<Product> {
    await delay(800);
    const newProduct: Product = {
      ...productData,
      id: Date.now() + Math.floor(Math.random() * 1000)
    };
    products.push(newProduct);
    return newProduct;
  },

  // Atualizar produto
  async updateProduct(id: number, productData: Partial<Product>): Promise<Product | null> {
    await delay(600);
    const index = products.findIndex(p => p.id === id);
    if (index === -1) return null;
    
    products[index] = { ...products[index], ...productData };
    return products[index];
  },

  // Deletar produto
  async deleteProduct(id: number): Promise<boolean> {
    await delay(400);
    const index = products.findIndex(p => p.id === id);
    if (index === -1) return false;
    
    products.splice(index, 1);
    return true;
  },

  // Buscar produtos por categoria
  async getProductsByCategory(category: string): Promise<Product[]> {
    await delay(400);
    return products.filter(p => p.category.toLowerCase().includes(category.toLowerCase()));
  }
};