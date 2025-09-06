import { useState } from "react";
import { Heart, ShoppingBag, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Product } from "@/contexts/CartContext";
import ProductDetailsModal from "@/components/ui/product-details-modal";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Card className="group relative overflow-hidden border-0 bg-transparent hover:shadow-elegant transition-all duration-500">
        {/* Product Image */}
        <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-muted">
          <img
            src={product.image}
            alt={product.name}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && (
              <span className="bg-accent text-accent-foreground px-2 py-1 text-xs font-medium rounded-full">
                NOVO
              </span>
            )}
            {product.isSale && (
              <span className="bg-destructive text-destructive-foreground px-2 py-1 text-xs font-medium rounded-full">
                PROMOÇÃO
              </span>
            )}
          </div>

          {/* Quick Actions */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full shadow-lg">
              <Heart className="h-4 w-4" />
            </Button>
            <Button 
              size="icon" 
              variant="secondary" 
              className="h-8 w-8 rounded-full shadow-lg"
              onClick={() => setIsModalOpen(true)}
            >
              <Eye className="h-4 w-4" />
            </Button>
          </div>

          {/* Quick Shop Overlay */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
            <Button 
              className="w-full bg-background text-foreground hover:bg-foreground hover:text-background transition-colors"
              onClick={() => setIsModalOpen(true)}
            >
              Ver Detalhes
            </Button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">
            {product.category}
          </p>
          <h3 className="font-medium mb-2 line-clamp-2 group-hover:text-accent transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg">
              R$ {product.price.toLocaleString('pt-BR')}
            </span>
            {product.originalPrice && (
              <span className="text-muted-foreground line-through text-sm">
                R$ {product.originalPrice.toLocaleString('pt-BR')}
              </span>
            )}
          </div>
        </div>
      </Card>

      <ProductDetailsModal 
        product={product}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default ProductCard;