export const IMAGES = {
  // HERO — Corona sobre tela de seda roja (elemento icónico de XV)
  heroCrown:
    "https://images.unsplash.com/photo-1576022162028-1f4945273673?w=800&q=80",
  // HERO ALTERNATIVO — Vestido rojo de gala (silueta elegante)
  heroSilhouette:
    "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80",
  // TEXTURA — Mármol rojo/borgoña (para fondos con textura)
  marbleTexture:
    "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1200&q=80",
  // TEXTURA — Tela de seda/satín roja
  silkTexture:
    "https://images.unsplash.com/photo-1553775282-20af80779df7?w=1200&q=80",
  // GALERÍA — Rosas rojas close-up
  roses:
    "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=600&q=80",
  // GALERÍA — Salón de eventos elegante iluminado
  venue:
    "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&q=80",
  // GALERÍA — Chandelier / candelabro de cristal
  chandelier:
    "https://images.unsplash.com/photo-1543589077-47d81606c1bf?w=600&q=80",
  // GALERÍA — Mesa elegante decorada
  tableDecor:
    "https://images.unsplash.com/photo-1478146059778-26028b07395a?w=600&q=80",
  // GALERÍA — Zapatos/tacones elegantes
  heels: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&q=80",
  // GALERÍA — Detalles dorados / joyería
  goldDetails:
    "https://images.unsplash.com/photo-1515562141589-67f0d569b6fc?w=600&q=80",
  // GALERÍA — Cake / pastel elegante
  cake: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=600&q=80",
  // GALERÍA — Bouquet de flores
  bouquet:
    "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=600&q=80",
  // DECORATIVAS — Sparkles/bokeh dorado (overlay)
  goldBokeh:
    "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&q=80",
  // DECORATIVAS — Pétalos de rosa
  petals:
    "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=400&q=80",
};

export const eventData = {
  quinceanera: "Lidiana",
  parents: "Isabel Armenta & Carlos Vázquez Fausto",
  godparents: "Juana Rodríguez Armenta & Víctor Rodríguez García",
  date: "Sábado 23 de Mayo, 2026",
  time: "7:00 PM",
  targetDate: "2026/05/23 19:00:00",
  message: "Con la bendición de Dios y el amor de mis padres...",
  signature: "Lidiana",
  eventDetails: [
    {
      id: "ceremony",
      title: "Ceremonia Religiosa",
      icon: "🕊️",
      desc: "5:00 PM",
      address: "Col. Guadalupe",
    },
    {
      id: "reception",
      title: "Recepción",
      icon: "🥂",
      desc: "Real San Pedro, 7:00 PM",
      address: "C. San Lorenzo Victoria 71, Libertad, 45303 Tala, Jal.",
    },
    {
      id: "dresscode",
      title: "Dress Code",
      icon: "👗",
      desc: "Formal / Elegante",
      address: null,
    },
  ],
  gallery: [
    IMAGES.roses,
    IMAGES.venue,
    IMAGES.chandelier,
    IMAGES.tableDecor,
    IMAGES.heels,
    IMAGES.cake,
    IMAGES.bouquet,
  ],
  hashtag: "#MisXVLidiana",
};

export const CRITICAL_IMAGES = [
  IMAGES.heroCrown,
  IMAGES.silkTexture,
  IMAGES.marbleTexture,
];

export const SECONDARY_IMAGES = [...eventData.gallery];
