import ProductCard from "@/components/ui/product-card";
import { Button } from "@/components/ui/button";
import { nikeProducts } from "@/data/products";

const ProductGrid = () => {
  return (
    <section className="py-20 bg-gradient-hero">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-elegant bg-clip-text text-transparent">
              Coleção Nike
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Descubra os melhores produtos Nike para elevar seu estilo e performance
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {nikeProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-16">
          <Button 
            variant="elegant"
            size="lg"
            className="px-8 py-4 text-lg"
          >
            Ver Toda Coleção
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;