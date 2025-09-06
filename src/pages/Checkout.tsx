import { useState } from "react";
import { ArrowLeft, CreditCard, Truck, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface ShippingForm {
  fullName: string;
  email: string;
  phone: string;
  cep: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
}

interface PaymentForm {
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
  installments: string;
}

const Checkout = () => {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [shippingForm, setShippingForm] = useState<ShippingForm>({
    fullName: "",
    email: "",
    phone: "",
    cep: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: ""
  });

  const [paymentForm, setPaymentForm] = useState<PaymentForm>({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
    installments: "1"
  });

  const shippingCost = 25.90;
  const finalTotal = total + shippingCost;

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica
    const requiredFields = ['fullName', 'email', 'phone', 'cep', 'street', 'number', 'neighborhood', 'city', 'state'];
    const missingFields = requiredFields.filter(field => !shippingForm[field as keyof ShippingForm]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }
    
    setCurrentStep(2);
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica do cartão
    if (!paymentForm.cardNumber || !paymentForm.cardName || !paymentForm.expiryDate || !paymentForm.cvv) {
      toast({
        title: "Dados do cartão incompletos",
        description: "Por favor, preencha todos os dados do cartão.",
        variant: "destructive",
      });
      return;
    }
    
    setIsProcessing(true);
    
    // Simular processamento do pagamento
    setTimeout(() => {
      // Limpar carrinho e navegar para sucesso
      clearCart();
      navigate("/order-success", { 
        state: { 
          orderNumber: Math.random().toString(36).substr(2, 9).toUpperCase(),
          total: finalTotal,
          items: items.length 
        } 
      });
    }, 3000);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Carrinho vazio</h1>
          <p className="text-muted-foreground mb-6">Adicione produtos para finalizar a compra</p>
          <Button onClick={() => navigate("/")} variant="elegant">
            Continuar comprando
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-bold bg-gradient-elegant bg-clip-text text-transparent">
            Finalizar Compra
          </h1>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center space-x-8">
            <div className={`flex items-center ${currentStep >= 1 ? 'text-accent' : 'text-muted-foreground'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${currentStep >= 1 ? 'border-accent bg-accent text-accent-foreground' : 'border-muted-foreground'}`}>
                1
              </div>
              <span className="ml-2 font-medium">Entrega</span>
            </div>
            <div className={`w-12 h-0.5 ${currentStep >= 2 ? 'bg-accent' : 'bg-muted-foreground'}`} />
            <div className={`flex items-center ${currentStep >= 2 ? 'text-accent' : 'text-muted-foreground'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${currentStep >= 2 ? 'border-accent bg-accent text-accent-foreground' : 'border-muted-foreground'}`}>
                2
              </div>
              <span className="ml-2 font-medium">Pagamento</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Forms */}
          <div className="lg:col-span-2">
            {currentStep === 1 && (
              <Card className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Truck className="h-6 w-6 text-accent" />
                  <h2 className="text-2xl font-bold">Dados de Entrega</h2>
                </div>
                
                <form onSubmit={handleShippingSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fullName">Nome Completo *</Label>
                      <Input
                        id="fullName"
                        value={shippingForm.fullName}
                        onChange={(e) => setShippingForm({...shippingForm, fullName: e.target.value})}
                        placeholder="Seu nome completo"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">E-mail *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={shippingForm.email}
                        onChange={(e) => setShippingForm({...shippingForm, email: e.target.value})}
                        placeholder="seu@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Telefone *</Label>
                      <Input
                        id="phone"
                        value={shippingForm.phone}
                        onChange={(e) => setShippingForm({...shippingForm, phone: e.target.value})}
                        placeholder="(11) 99999-9999"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cep">CEP *</Label>
                      <Input
                        id="cep"
                        value={shippingForm.cep}
                        onChange={(e) => setShippingForm({...shippingForm, cep: e.target.value})}
                        placeholder="00000-000"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                      <Label htmlFor="street">Endereço *</Label>
                      <Input
                        id="street"
                        value={shippingForm.street}
                        onChange={(e) => setShippingForm({...shippingForm, street: e.target.value})}
                        placeholder="Rua, Avenida..."
                      />
                    </div>
                    <div>
                      <Label htmlFor="number">Número *</Label>
                      <Input
                        id="number"
                        value={shippingForm.number}
                        onChange={(e) => setShippingForm({...shippingForm, number: e.target.value})}
                        placeholder="123"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="complement">Complemento</Label>
                      <Input
                        id="complement"
                        value={shippingForm.complement}
                        onChange={(e) => setShippingForm({...shippingForm, complement: e.target.value})}
                        placeholder="Apto, Casa..."
                      />
                    </div>
                    <div>
                      <Label htmlFor="neighborhood">Bairro *</Label>
                      <Input
                        id="neighborhood"
                        value={shippingForm.neighborhood}
                        onChange={(e) => setShippingForm({...shippingForm, neighborhood: e.target.value})}
                        placeholder="Nome do bairro"
                      />
                    </div>
                    <div>
                      <Label htmlFor="city">Cidade *</Label>
                      <Input
                        id="city"
                        value={shippingForm.city}
                        onChange={(e) => setShippingForm({...shippingForm, city: e.target.value})}
                        placeholder="São Paulo"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="state">Estado *</Label>
                    <Select value={shippingForm.state} onValueChange={(value) => setShippingForm({...shippingForm, state: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o estado" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SP">São Paulo</SelectItem>
                        <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                        <SelectItem value="MG">Minas Gerais</SelectItem>
                        <SelectItem value="RS">Rio Grande do Sul</SelectItem>
                        <SelectItem value="PR">Paraná</SelectItem>
                        <SelectItem value="SC">Santa Catarina</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button type="submit" variant="elegant" size="lg" className="w-full">
                    Continuar para Pagamento
                  </Button>
                </form>
              </Card>
            )}

            {currentStep === 2 && (
              <Card className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <CreditCard className="h-6 w-6 text-accent" />
                  <h2 className="text-2xl font-bold">Pagamento</h2>
                </div>

                <form onSubmit={handlePaymentSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="cardNumber">Número do Cartão *</Label>
                    <Input
                      id="cardNumber"
                      value={paymentForm.cardNumber}
                      onChange={(e) => setPaymentForm({...paymentForm, cardNumber: formatCardNumber(e.target.value)})}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                    />
                  </div>

                  <div>
                    <Label htmlFor="cardName">Nome no Cartão *</Label>
                    <Input
                      id="cardName"
                      value={paymentForm.cardName}
                      onChange={(e) => setPaymentForm({...paymentForm, cardName: e.target.value})}
                      placeholder="Nome como no cartão"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="expiryDate">Validade *</Label>
                      <Input
                        id="expiryDate"
                        value={paymentForm.expiryDate}
                        onChange={(e) => setPaymentForm({...paymentForm, expiryDate: e.target.value})}
                        placeholder="MM/AA"
                        maxLength={5}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV *</Label>
                      <Input
                        id="cvv"
                        value={paymentForm.cvv}
                        onChange={(e) => setPaymentForm({...paymentForm, cvv: e.target.value})}
                        placeholder="123"
                        maxLength={4}
                      />
                    </div>
                    <div>
                      <Label htmlFor="installments">Parcelas</Label>
                      <Select value={paymentForm.installments} onValueChange={(value) => setPaymentForm({...paymentForm, installments: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1x de R$ {finalTotal.toLocaleString('pt-BR')}</SelectItem>
                          <SelectItem value="2">2x de R$ {(finalTotal/2).toLocaleString('pt-BR')}</SelectItem>
                          <SelectItem value="3">3x de R$ {(finalTotal/3).toLocaleString('pt-BR')}</SelectItem>
                          <SelectItem value="6">6x de R$ {(finalTotal/6).toLocaleString('pt-BR')}</SelectItem>
                          <SelectItem value="12">12x de R$ {(finalTotal/12).toLocaleString('pt-BR')}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-4 bg-muted rounded-lg">
                    <Shield className="h-5 w-5 text-green-600" />
                    <p className="text-sm text-muted-foreground">
                      Seus dados estão protegidos por criptografia SSL
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="lg" 
                      className="flex-1"
                      onClick={() => setCurrentStep(1)}
                    >
                      Voltar
                    </Button>
                    <Button 
                      type="submit" 
                      variant="elegant" 
                      size="lg" 
                      className="flex-1"
                      disabled={isProcessing}
                    >
                      {isProcessing ? "Processando..." : "Finalizar Compra"}
                    </Button>
                  </div>
                </form>
              </Card>
            )}
          </div>

          {/* Order Summary */}
          <div>
            <Card className="p-6 sticky top-8">
              <h3 className="text-xl font-bold mb-6">Resumo do Pedido</h3>
              
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded object-cover bg-muted"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate text-sm">{item.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.selectedColor} • {item.selectedSize} • Qty: {item.quantity}
                      </p>
                      <p className="text-sm font-medium">
                        R$ {(item.price * item.quantity).toLocaleString('pt-BR')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>R$ {total.toLocaleString('pt-BR')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Frete:</span>
                  <span>R$ {shippingCost.toLocaleString('pt-BR')}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span>R$ {finalTotal.toLocaleString('pt-BR')}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;