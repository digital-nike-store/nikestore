import Navigation from "@/components/ui/navigation";
import HeroSection from "@/components/ui/hero-section";
import ProductGrid from "@/components/ui/product-grid";
import Footer from "@/components/ui/footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <ProductGrid />
      <Footer />
    </div>
  );
};

export default Index;
