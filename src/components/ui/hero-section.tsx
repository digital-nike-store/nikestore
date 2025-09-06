import { Button } from "@/components/ui/button";
import nikeHeroImage from "@/assets/nike-hero.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${nikeHeroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-2xl">
        <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-elegant bg-clip-text text-transparent">
              Nike
            </span>
            <br />
            <span className="bg-gradient-gold bg-clip-text text-transparent">
              Store
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
            Descubra os melhores produtos Nike. 
            Performance e estilo em cada peça.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              variant="elegant"
              size="lg" 
              className="text-lg px-8 py-4"
            >
              Explorar Coleção
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-foreground hover:bg-foreground hover:text-background transition-all duration-300 text-lg px-8 py-4"
            >
              Ver Lookbook
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-foreground rounded-full flex justify-center">
          <div className="w-1 h-3 bg-foreground rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;