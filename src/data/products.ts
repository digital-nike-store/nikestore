import { Product } from '@/contexts/CartContext';

export const nikeProducts: Product[] = [
  {
    id: 1,
    name: "Nike Air Force 1 '07",
    price: 559,
    originalPrice: 699,
    image: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b7d9211c-26e7-431a-ac24-b0540fb3c00f/air-force-1-07-shoes.png",
    category: "Calçados",
    description: "O Nike Air Force 1 '07 traz um toque novo ao que você conhece melhor: sobreposições costuradas e duráveis, acabamentos impecáveis e a quantidade perfeita de brilho para fazer você se destacar.",
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44"],
    colors: ["Branco", "Preto", "Vermelho"],
    isNew: false,
    isSale: true
  },
  {
    id: 2,
    name: "Nike Dri-FIT ADV TechKnit Ultra",
    price: 399,
    image: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/16ddf12a-bd82-44dd-9ba3-4d9b5c2e8c0c/dri-fit-adv-techknit-ultra-mens-short-sleeve-running-top.png",
    category: "Masculino",
    description: "Esta camiseta de corrida oferece ventilação avançada onde você mais sua. A tecnologia Dri-FIT ADV combina tecido que absorve o suor com recursos de engenharia avançados.",
    sizes: ["P", "M", "G", "GG", "XGG"],
    colors: ["Preto", "Azul Marinho", "Verde"],
    isNew: true,
    isSale: false
  },
  {
    id: 3,
    name: "Nike Air Max 90",
    price: 799,
    image: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/fd17b420-b388-4c8a-aaaa-e0a98ddf175f/air-max-90-shoes.png",
    category: "Calçados",
    description: "Nada que uma atualização na unidade Air Max original não consiga resolver. O Nike Air Max 90 mantém os elementos de design icônicos dos 90's.",
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44"],
    colors: ["Branco", "Preto", "Cinza", "Rosa"],
    isNew: false,
    isSale: false
  },
  {
    id: 4,
    name: "Nike Sportswear Club Fleece",
    price: 299,
    originalPrice: 399,
    image: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/0a254131-ac84-4e33-8b28-956f0a0fb1e8/sportswear-club-fleece-mens-hoodie.png",
    category: "Masculino",
    description: "O moletom Nike Sportswear Club Fleece oferece conforto e calor com seu tecido macio e escovado por dentro. Um clássico atemporal para o seu guarda-roupa.",
    sizes: ["P", "M", "G", "GG", "XGG"],
    colors: ["Cinza", "Preto", "Azul Marinho"],
    isNew: false,
    isSale: true
  },
  {
    id: 5,
    name: "Nike Pro Dri-FIT",
    price: 189,
    image: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/38708d50-8b6b-4e3e-8b7a-9a3d8b7f0f9d/pro-dri-fit-mens-shorts.png",
    category: "Masculino",
    description: "O Nike Pro Dri-FIT oferece suporte e conforto durante os treinos mais intensos. Tecido elástico que se move com você.",
    sizes: ["P", "M", "G", "GG"],
    colors: ["Preto", "Azul", "Verde"],
    isNew: true,
    isSale: false
  },
  {
    id: 6,
    name: "Nike Air Zoom Pegasus 40",
    price: 699,
    image: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/c5b1c84e-5ac2-4f3e-8b89-7f8f5b4c1e2d/air-zoom-pegasus-40-mens-road-running-shoes.png",
    category: "Calçados",
    description: "Um companheiro confiável que está de volta para apoiar você. Com conforto em cada passada, ele oferece a sensação reativa que você adora.",
    sizes: ["38", "39", "40", "41", "42", "43", "44"],
    colors: ["Azul", "Preto", "Branco", "Laranja"],
    isNew: false,
    isSale: false
  },
  {
    id: 7,
    name: "Nike Dri-FIT One Feminino",
    price: 249,
    image: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/f8c3c7e6-c56a-4c3a-9de2-4f5e6d7c8b9a/dri-fit-one-womens-tank.png",
    category: "Feminino",
    description: "A regata Nike Dri-FIT One combina a sensação macia de um tecido que absorve o suor com um corte solto e confortável.",
    sizes: ["PP", "P", "M", "G", "GG"],
    colors: ["Rosa", "Preto", "Branco", "Roxo"],
    isNew: true,
    isSale: false
  },
  {
    id: 8,
    name: "Nike Air Jordan 1 Low",
    price: 899,
    originalPrice: 1199,
    image: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/5f7a2a7c-c4d9-4b7f-8e9f-0a1b2c3d4e5f/air-jordan-1-low-shoes.png",
    category: "Calçados",
    description: "Inspirado no original de 1985, o Air Jordan 1 Low oferece um visual clássico e familiar, mas sempre fresco. Com um design icônico que combina com tudo.",
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43"],
    colors: ["Branco/Preto", "Vermelho", "Azul", "Rosa"],
    isNew: false,
    isSale: true
  }
];