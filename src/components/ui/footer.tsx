import { Instagram, Facebook, Twitter, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
            <div>
              <h3 className="text-2xl font-bold mb-4 bg-gradient-gold bg-clip-text text-transparent">
                NIKE STORE
              </h3>
              <p className="text-primary-foreground/80 mb-6">
                Os melhores produtos Nike para elevar seu estilo e performance esportiva.
              </p>
            <div className="flex space-x-4">
              <Instagram className="h-5 w-5 hover:text-accent cursor-pointer transition-colors" />
              <Facebook className="h-5 w-5 hover:text-accent cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 hover:text-accent cursor-pointer transition-colors" />
              <Mail className="h-5 w-5 hover:text-accent cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold mb-4">Categorias</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><a href="#" className="hover:text-accent transition-colors">Calçados</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Masculino</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Feminino</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Esportes</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Promoções</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold mb-4">Atendimento</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><a href="#" className="hover:text-accent transition-colors">Contato</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Trocas e Devoluções</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Guia de Tamanhos</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Entrega</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-4">Newsletter</h4>
            <p className="text-primary-foreground/80 mb-4">
              Receba novidades e ofertas exclusivas
            </p>
            <div className="flex flex-col gap-2">
              <input 
                type="email" 
                placeholder="Seu e-mail"
                className="px-4 py-2 rounded bg-primary-foreground/10 border border-primary-foreground/20 focus:outline-none focus:border-accent"
              />
              <Button 
                variant="gold"
                className="px-4 py-2 text-sm"
              >
                Inscrever-se
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center text-primary-foreground/60">
          <p>&copy; 2024 Nike Store. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;