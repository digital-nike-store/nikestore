import { useEffect, useState } from "react";
import { CheckCircle, Package, Truck, Home, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate, useLocation } from "react-router-dom";

const OrderSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [countdown, setCountdown] = useState(10);

  const orderData = location.state || {
    orderNumber: "NIKE" + Math.random().toString(36).substr(2, 6).toUpperCase(),
    total: 0,
    items: 0
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card className="p-8 text-center">
          {/* Success Icon */}
          <div className="mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-green-600 mb-2">
              Pedido Confirmado!
            </h1>
            <p className="text-muted-foreground">
              Obrigado pela sua compra. Seu pedido foi processado com sucesso.
            </p>
          </div>

          {/* Order Details */}
          <div className="bg-muted rounded-lg p-6 mb-8">
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-semibold">Número do Pedido:</p>
                <p className="text-2xl font-bold text-accent">#{orderData.orderNumber}</p>
              </div>
              <div>
                <p className="font-semibold">Valor Total:</p>
                <p className="text-2xl font-bold">R$ {orderData.total.toLocaleString('pt-BR')}</p>
              </div>
              <div>
                <p className="font-semibold">Itens:</p>
                <p>{orderData.items} produto(s)</p>
              </div>
              <div>
                <p className="font-semibold">Status:</p>
                <p className="text-green-600 font-medium">Confirmado</p>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="mb-8">
            <h3 className="font-bold mb-4">Acompanhe seu pedido:</h3>
            <div className="flex items-center justify-between">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-accent text-accent-foreground rounded-full flex items-center justify-center mb-2">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <p className="text-xs font-medium">Confirmado</p>
                <p className="text-xs text-muted-foreground">Agora</p>
              </div>
              
              <div className="flex-1 h-0.5 bg-muted mx-2" />
              
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-muted text-muted-foreground rounded-full flex items-center justify-center mb-2">
                  <Package className="w-6 h-6" />
                </div>
                <p className="text-xs font-medium">Preparando</p>
                <p className="text-xs text-muted-foreground">1-2 dias</p>
              </div>
              
              <div className="flex-1 h-0.5 bg-muted mx-2" />
              
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-muted text-muted-foreground rounded-full flex items-center justify-center mb-2">
                  <Truck className="w-6 h-6" />
                </div>
                <p className="text-xs font-medium">Enviado</p>
                <p className="text-xs text-muted-foreground">2-3 dias</p>
              </div>
              
              <div className="flex-1 h-0.5 bg-muted mx-2" />
              
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-muted text-muted-foreground rounded-full flex items-center justify-center mb-2">
                  <Home className="w-6 h-6" />
                </div>
                <p className="text-xs font-medium">Entregue</p>
                <p className="text-xs text-muted-foreground">5-7 dias</p>
              </div>
            </div>
          </div>

          {/* Important Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 text-left">
            <h4 className="font-semibold mb-2 text-blue-800">Informações Importantes:</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Você receberá um e-mail de confirmação em breve</li>
              <li>• O código de rastreamento será enviado quando o pedido for despachado</li>
              <li>• Prazo de entrega: 5 a 7 dias úteis</li>
              <li>• Em caso de dúvidas, entre em contato pelo WhatsApp: (11) 99999-9999</li>
            </ul>
          </div>

          {/* Actions */}
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Button variant="outline" className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Baixar Comprovante
              </Button>
              <Button variant="outline" className="w-full">
                <Package className="w-4 h-4 mr-2" />
                Acompanhar Pedido
              </Button>
            </div>
            
            <Button 
              variant="elegant" 
              size="lg" 
              className="w-full"
              onClick={() => navigate("/")}
            >
              Continuar Comprando
            </Button>
          </div>

          {/* Auto redirect countdown */}
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">
              Redirecionando para a loja em {countdown} segundos...
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default OrderSuccess;