import { useState } from "react";
import { ShoppingBag, Search, User, Heart, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import CartDrawer from "@/components/ui/cart-drawer";
import { Link } from "react-router-dom";

const Navigation = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { itemCount } = useCart();

  return (
    <>
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/">
                <h1 className="text-2xl font-bold bg-gradient-gold bg-clip-text text-transparent">
                  NIKE STORE
                </h1>
              </Link>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-foreground hover:text-accent transition-colors">
                Novidades
              </a>
              <a href="#" className="text-foreground hover:text-accent transition-colors">
                Masculino
              </a>
              <a href="#" className="text-foreground hover:text-accent transition-colors">
                Feminino
              </a>
              <a href="#" className="text-foreground hover:text-accent transition-colors">
                Calçados
              </a>
              <a href="#" className="text-foreground hover:text-accent transition-colors">
                Promoções
              </a>
              <Link to="/admin" className="text-foreground hover:text-accent transition-colors flex items-center gap-1">
                <Settings className="h-4 w-4" />
                Admin
              </Link>
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="hover:bg-secondary">
                <Search className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-secondary">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-secondary">
                <User className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative hover:bg-secondary"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingBag className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 h-5 w-5 bg-accent text-accent-foreground rounded-full text-xs flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Navigation;