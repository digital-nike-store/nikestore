import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { X, Plus } from "lucide-react";
import { Product } from "@/types/Product";

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Product, 'id'>) => void;
  product?: Product | null;
  title: string;
}

const categories = [
  "Tênis",
  "Camisetas",
  "Shorts",
  "Jaquetas",
  "Acessórios"
];

const availableSizes = ["PP", "P", "M", "G", "GG", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45"];
const availableColors = ["Preto", "Branco", "Azul", "Vermelho", "Verde", "Amarelo", "Rosa", "Roxo", "Cinza", "Marrom"];

const ProductFormModal = ({ isOpen, onClose, onSubmit, product, title }: ProductFormModalProps) => {
  const [loading, setLoading] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [newSize, setNewSize] = useState("");
  const [newColor, setNewColor] = useState("");

  const form = useForm<Omit<Product, 'id'>>({
    defaultValues: {
      name: "",
      price: 0,
      originalPrice: 0,
      image: "",
      category: "",
      description: "",
      sizes: [],
      colors: [],
      isNew: false,
      isSale: false,
    },
  });

  useEffect(() => {
    if (product) {
      form.reset({
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice || 0,
        image: product.image,
        category: product.category,
        description: product.description,
        sizes: product.sizes,
        colors: product.colors,
        isNew: product.isNew || false,
        isSale: product.isSale || false,
      });
      setSelectedSizes(product.sizes);
      setSelectedColors(product.colors);
    } else {
      form.reset({
        name: "",
        price: 0,
        originalPrice: 0,
        image: "",
        category: "",
        description: "",
        sizes: [],
        colors: [],
        isNew: false,
        isSale: false,
      });
      setSelectedSizes([]);
      setSelectedColors([]);
    }
  }, [product, form]);

  const handleSubmit = async (data: Omit<Product, 'id'>) => {
    setLoading(true);
    try {
      await onSubmit({
        ...data,
        sizes: selectedSizes,
        colors: selectedColors,
      });
    } finally {
      setLoading(false);
    }
  };

  const addSize = (size: string) => {
    if (size && !selectedSizes.includes(size)) {
      setSelectedSizes([...selectedSizes, size]);
    }
    setNewSize("");
  };

  const removeSize = (size: string) => {
    setSelectedSizes(selectedSizes.filter(s => s !== size));
  };

  const addColor = (color: string) => {
    if (color && !selectedColors.includes(color)) {
      setSelectedColors([...selectedColors, color]);
    }
    setNewColor("");
  };

  const removeColor = (color: string) => {
    setSelectedColors(selectedColors.filter(c => c !== color));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                rules={{ required: "Nome é obrigatório" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do Produto</FormLabel>
                    <FormControl>
                      <Input placeholder="Nike Air Max 90..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                rules={{ required: "Categoria é obrigatória" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoria</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma categoria" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="price"
                rules={{ 
                  required: "Preço é obrigatório",
                  min: { value: 0.01, message: "Preço deve ser maior que zero" }
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preço (R$)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        step="0.01" 
                        placeholder="199.99" 
                        {...field} 
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="originalPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preço Original (R$) - Opcional</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        step="0.01" 
                        placeholder="299.99" 
                        {...field} 
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="image"
              rules={{ required: "URL da imagem é obrigatória" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL da Imagem</FormLabel>
                  <FormControl>
                    <Input placeholder="https://..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              rules={{ required: "Descrição é obrigatória" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Descrição detalhada do produto..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Sizes */}
            <div className="space-y-3">
              <Label>Tamanhos</Label>
              <div className="flex gap-2">
                <Select value={newSize} onValueChange={setNewSize}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Selecionar tamanho" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableSizes.filter(size => !selectedSizes.includes(size)).map((size) => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button 
                  type="button" 
                  onClick={() => addSize(newSize)}
                  disabled={!newSize}
                  size="icon"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedSizes.map((size) => (
                  <Badge key={size} variant="secondary" className="gap-1">
                    {size}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => removeSize(size)}
                    />
                  </Badge>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div className="space-y-3">
              <Label>Cores</Label>
              <div className="flex gap-2">
                <Select value={newColor} onValueChange={setNewColor}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Selecionar cor" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableColors.filter(color => !selectedColors.includes(color)).map((color) => (
                      <SelectItem key={color} value={color}>
                        {color}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button 
                  type="button" 
                  onClick={() => addColor(newColor)}
                  disabled={!newColor}
                  size="icon"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedColors.map((color) => (
                  <Badge key={color} variant="secondary" className="gap-1">
                    {color}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => removeColor(color)}
                    />
                  </Badge>
                ))}
              </div>
            </div>

            {/* Switches */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="isNew"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Produto Novo</FormLabel>
                      <div className="text-sm text-muted-foreground">
                        Marcar como lançamento
                      </div>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isSale"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Em Promoção</FormLabel>
                      <div className="text-sm text-muted-foreground">
                        Produto em oferta
                      </div>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Salvando..." : product ? "Atualizar" : "Criar"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductFormModal;