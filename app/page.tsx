"use client";

import React, { useMemo, useRef, useState } from "react";

type Product = {
  name: string;
  type: string;
  category: string;
  price: number;
  priceLabel: string;
  note: string;
  desc: string;
  custom: string[];
  time: string;
};

const categories = [
  "Todos",
  "Wax melts",
  "Velas aromáticas",
  "Velas florales",
  "Velas personalizadas",
  "Velas para eventos",
  "Ramos y diseños especiales",
];

const productTypeOptions = [
  "Velas aromáticas",
  "Velas florales",
  "Velas personalizadas",
  "Velas para eventos",
  "Wax melts",
  "Ramos y diseños especiales",
  "Vela temática animalito",
];

const products: Product[] = [
  {
    name: "Vela pequeña clásica",
    type: "Decorativa",
    category: "Velas aromáticas",
    price: 18000,
    priceLabel: "Desde $18.000",
    note: "Sutil, delicada y fácil de regalar.",
    desc: "Una pieza base de GAIA, ideal para detalles sencillos, regalos pequeños y rincones especiales del hogar.",
    custom: ["Color", "Aroma", "Empaque", "Etiqueta"],
    time: "2 a 4 días hábiles",
  },
  {
    name: "Vela mediana aromática",
    type: "Aromática",
    category: "Velas aromáticas",
    price: 28000,
    priceLabel: "Desde $28.000",
    note: "Pensada para transformar espacios con aroma y calma.",
    desc: "Una opción equilibrada entre presencia visual y experiencia sensorial, perfecta para decoración y uso personal.",
    custom: ["Aroma", "Color", "Etiqueta", "Presentación"],
    time: "2 a 4 días hábiles",
  },
  {
    name: "Vela floral Aura",
    type: "Floral",
    category: "Velas florales",
    price: 35000,
    priceLabel: "Desde $35.000",
    note: "Inspirada en formas orgánicas y en la belleza natural.",
    desc: "Una pieza decorativa con siluetas suaves, ideal para sorprender, regalar y elevar la estética de un espacio.",
    custom: ["Color", "Aroma", "Empaque"],
    time: "3 a 5 días hábiles",
  },
  {
    name: "Vela personalizada",
    type: "Personalizada",
    category: "Velas personalizadas",
    price: 32000,
    priceLabel: "Desde $32.000",
    note: "Creada a partir de tu idea, tamaño y cantidad.",
    desc: "Diseñada a partir de una referencia, una imagen o una idea especial. El valor final depende de complejidad y cantidad.",
    custom: ["Tamaño", "Diseño", "Color", "Aroma", "Molde", "Empaque", "Etiqueta"],
    time: "4 a 7 días hábiles",
  },
  {
    name: "Wax melts esencia suave",
    type: "Wax melts",
    category: "Wax melts",
    price: 16000,
    priceLabel: "Desde $16.000",
    note: "Ideal para aromatizar espacios con un formato delicado y práctico.",
    desc: "Pensados para quienes aman el aroma y la practicidad, con presentaciones visualmente cuidadas y fáciles de regalar.",
    custom: ["Aroma", "Color", "Empaque"],
    time: "2 a 4 días hábiles",
  },
  {
    name: "Detalle para evento",
    type: "Evento",
    category: "Velas para eventos",
    price: 12000,
    priceLabel: "Desde $12.000",
    note: "Pensado para celebraciones, recordatorios y pedidos por cantidad.",
    desc: "Un formato creado para bautizos, bodas, cumpleaños y eventos especiales, con opciones de etiqueta y empaque.",
    custom: ["Cantidad", "Etiqueta", "Color", "Empaque", "Aroma"],
    time: "Según cantidad",
  },
  {
    name: "Ramo de velas GAIA",
    type: "Especial",
    category: "Ramos y diseños especiales",
    price: 68000,
    priceLabel: "Desde $68.000",
    note: "Una propuesta visual delicada para regalar de forma diferente.",
    desc: "Composición tipo ramo con velas florales y presentación especial, ideal para aniversarios, detalles y fechas memorables.",
    custom: ["Color", "Empaque", "Mensaje", "Cantidad de piezas"],
    time: "4 a 7 días hábiles",
  },
  {
    name: "Vela temática animalito",
    type: "Temática",
    category: "Velas personalizadas",
    price: 30000,
    priceLabel: "Desde $30.000",
    note: "Una pieza encantadora para regalos, recuerdos y detalles creativos.",
    desc: "Velas inspiradas en figuras especiales o referencias visuales, pensadas para momentos tiernos y personalizados.",
    custom: ["Diseño", "Color", "Tamaño", "Empaque"],
    time: "4 a 7 días hábiles",
  },
];

const steps = [
  "Explora el catálogo o comparte tu idea.",
  "Recibe una cotización aproximada.",
  "Confirmamos detalles por WhatsApp.",
  "Creamos tu pedido con delicadeza artesanal.",
  "Despachamos para que llegue a tus manos.",
];

const faqs = [
  {
    q: "¿Hacen envíos nacionales?",
    a: "Sí. Despachamos desde Rionegro, Antioquia, y realizamos envíos nacionales.",
  },
  {
    q: "¿Puedo pedir una sola unidad?",
    a: "Sí. Trabajamos pedidos por unidad y también por cantidad para eventos o detalles especiales.",
  },
  {
    q: "¿El precio que veo en la web es final?",
    a: "En personalizados, el valor mostrado es aproximado y se confirma contigo por WhatsApp antes de cerrar el pedido.",
  },
  {
    q: "¿Puedo enviar una imagen de referencia?",
    a: "Sí. Ya puedes seleccionar un archivo como referencia visual dentro del formulario de cotización.",
  },
  {
    q: "¿Con cuánto tiempo debo pedir para eventos?",
    a: "Depende de la cantidad. Para eventos, lo ideal es escribir con anticipación para revisar tiempos, materiales y viabilidad.",
  },
  {
    q: "¿Qué significa pequeño, mediano y grande?",
    a: "Como guía general: pequeño puede rondar 6 a 8 cm, mediano 9 a 12 cm y grande 13 a 16 cm. Estas medidas son aproximadas y pueden variar según el molde o diseño.",
  },
  {
    q: "¿Qué significa simple, detallado y premium?",
    a: "Simple es una propuesta base con menor complejidad visual. Detallado incluye más acabado o elementos decorativos. Premium contempla un nivel más alto de personalización, presentación o trabajo artesanal.",
  },
];

const whatsappNumber = "573021277385";

function formatCOP(value: number) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value);
}

function LogoMark() {
  return (
    <div className="flex items-center gap-4">
      <div className="relative h-14 w-14 overflow-hidden rounded-full border border-[#d8d2c8] bg-[#f8f5ef]">
        <div className="absolute left-1/2 top-1/2 h-10 w-[1px] -translate-x-1/2 -translate-y-1/2 bg-[#809084]" />
        <div className="absolute left-1/2 top-[17px] h-[1px] w-8 -translate-x-1/2 bg-[#809084] opacity-60" />
        <div className="absolute left-[15px] top-[15px] h-5 w-5 rounded-full border border-[#d9d4ca]" />
        <div className="absolute right-[15px] top-[15px] h-5 w-5 rounded-full border border-[#d9d4ca]" />
        <div className="absolute left-[10px] top-[22px] h-5 w-5 rounded-full border border-[#e2ddd4]" />
        <div className="absolute right-[10px] top-[22px] h-5 w-5 rounded-full border border-[#e2ddd4]" />
        <div className="absolute left-1/2 bottom-[8px] h-5 w-5 -translate-x-1/2 rounded-full border border-[#e8e2d8]" />
      </div>
      <div>
        <div className="font-serif text-[32px] tracking-[0.24em] text-[#5b6e66]">GAIA</div>
        <div className="text-[10px] uppercase tracking-[0.38em] text-[#8a867c]">Velas artesanales</div>
      </div>
    </div>
  );
}

function ProductVisual({ index }: { index: number }) {
  const shapes = [
    "h-44 w-32 rounded-[2rem]",
    "h-40 w-36 rounded-[1.75rem]",
    "h-44 w-28 rounded-[999px]",
    "h-40 w-32 rounded-[1.5rem]",
  ];

  return (
    <div className="relative h-72 overflow-hidden rounded-[2rem] bg-[#f5f1e9]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(243,226,230,0.5),transparent_38%)]" />
      <div className="absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#ece4d8]" />
      <div className="absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#f1eadf]" />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <div
          className={`${shapes[index % shapes.length]} border border-[#d7cebf] bg-[linear-gradient(180deg,#ebe6dc_0%,#ebe6dc_68%,#d0ad91_68%,#d0ad91_100%)] shadow-sm`}
        />
      </div>
      <div className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 text-[10px] uppercase tracking-[0.26em] text-[#7c8178]">
        Pieza GAIA
      </div>
    </div>
  );
}

function SectionTitle({
  eyebrow,
  title,
  body,
  light = false,
}: {
  eyebrow: string;
  title: string;
  body?: string;
  light?: boolean;
}) {
  return (
    <div className="max-w-3xl">
      <p className={`text-[11px] uppercase tracking-[0.34em] ${light ? "text-white/70" : "text-[#8b877d]"}`}>
        {eyebrow}
      </p>
      <h2 className={`mt-3 font-serif text-4xl leading-tight md:text-5xl ${light ? "text-white" : "text-[#4a5e56]"}`}>
        {title}
      </h2>
      {body ? (
        <p className={`mt-5 max-w-2xl text-sm leading-8 md:text-base ${light ? "text-white/80" : "text-[#6b6b64]"}`}>
          {body}
        </p>
      ) : null}
    </div>
  );
}

export default function GaiaWebV1() {
  const quoteSectionRef = useRef<HTMLElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [search, setSearch] = useState("");
  const [quoteName, setQuoteName] = useState("");
  const [quoteCity, setQuoteCity] = useState("Rionegro, Antioquia");
  const [quoteType, setQuoteType] = useState("Velas personalizadas");
  const [quoteSize, setQuoteSize] = useState("Mediano");
  const [quoteQuantity, setQuoteQuantity] = useState(1);
  const [quoteStyle, setQuoteStyle] = useState("Simple");
  const [quoteAroma, setQuoteAroma] = useState("");
  const [quoteDetails, setQuoteDetails] = useState("");
  const [quoteReferenceStyle, setQuoteReferenceStyle] = useState("");
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedProductQty, setSelectedProductQty] = useState(1);

  const filteredProducts = useMemo(() => {
    const base =
      selectedCategory === "Todos"
        ? products
        : products.filter((item) => item.category === selectedCategory);

    if (!search.trim()) return base;

    return base.filter((item) =>
      `${item.name} ${item.type} ${item.category}`.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, selectedCategory]);

  const estimatedPrice = useMemo(() => {
    const typeMap: Record<string, number> = {
      "Velas aromáticas": 26000,
      "Velas florales": 34000,
      "Velas personalizadas": 32000,
      "Velas para eventos": 12000,
      "Wax melts": 16000,
      "Ramos y diseños especiales": 68000,
      "Vela temática animalito": 30000,
    };

    const sizeMap: Record<string, number> = {
      Pequeño: 0.85,
      Mediano: 1,
      Grande: 1.35,
    };

    const styleMap: Record<string, number> = {
      Simple: 1,
      Detallado: 1.15,
      Premium: 1.3,
    };

    const base = typeMap[quoteType] || 30000;
    const price = Math.round(base * sizeMap[quoteSize] * styleMap[quoteStyle] * Math.max(1, quoteQuantity));

    return {
      min: Math.round(price * 0.92),
      max: Math.round(price * 1.08),
    };
  }, [quoteQuantity, quoteSize, quoteStyle, quoteType]);

  const selectedProductTotal = useMemo(() => {
    if (!selectedProduct) return 0;
    return selectedProduct.price * Math.max(1, selectedProductQty);
  }, [selectedProduct, selectedProductQty]);

  const whatsappMessage = encodeURIComponent(
    `Hola, quiero cotizar una vela en GAIA. Nombre: ${quoteName || "No indicado"}. Ciudad: ${
      quoteCity || "No indicada"
    }. Tipo: ${quoteType}. Estilo base: ${quoteReferenceStyle || "No definido"}. Tamaño: ${quoteSize}. Cantidad: ${
      quoteQuantity
    }. Nivel: ${quoteStyle}. Aroma: ${quoteAroma || "Por definir"}. Referencia: ${
      uploadedFileName || "Sin archivo"
    }. Detalles: ${quoteDetails || "Por definir"}.`
  );

  function openProduct(product: Product) {
    setSelectedProduct(product);
    setSelectedProductQty(1);
  }

  function handlePersonalizeProduct(product: Product) {
    setQuoteType(product.category);
    setQuoteReferenceStyle(product.name);
    setQuoteQuantity(1);
    setSelectedProduct(null);

    setTimeout(() => {
      quoteSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    setUploadedFileName(file ? file.name : "");
  }

  return (
    <div className="min-h-screen bg-[#f7f4ee] text-[#44564f]">
      <div className="mx-auto max-w-[1600px]">
        <header className="sticky top-0 z-50 border-b border-[#e8e1d5] bg-[#f7f4ee]/95 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
            <LogoMark />

            <nav className="hidden items-center gap-8 text-sm text-[#5f655f] xl:flex">
              <a href="#inicio" className="transition hover:text-[#44564f]">
                Inicio
              </a>
              <a href="#catalogo" className="transition hover:text-[#44564f]">
                Catálogo
              </a>
              <a href="#personaliza" className="transition hover:text-[#44564f]">
                Personaliza
              </a>
              <a href="#eventos" className="transition hover:text-[#44564f]">
                Eventos
              </a>
              <a href="#sobre" className="transition hover:text-[#44564f]">
                Sobre GAIA
              </a>
              <a href="#faq" className="transition hover:text-[#44564f]">
                FAQ
              </a>
              <a href="#contacto" className="transition hover:text-[#44564f]">
                Contacto
              </a>
            </nav>

            <a
              href="#personaliza"
              className="rounded-full border border-[#52665d] px-5 py-2.5 text-sm font-medium text-[#52665d] transition hover:bg-[#52665d] hover:text-white"
            >
              Cotizar
            </a>
          </div>
        </header>

        <main>
          <section
            id="inicio"
            className="mx-auto grid max-w-7xl gap-6 px-4 py-6 md:px-6 lg:px-10 lg:py-10 xl:grid-cols-[310px_1fr]"
          >
            <aside className="rounded-[2rem] border border-[#e7dfd3] bg-[#f4f0e9] p-7">
              <div className="mb-10 flex justify-between">
                <div className="grid gap-1">
                  <div className="h-2.5 w-2.5 rounded-full bg-[#5b6e66]" />
                  <div className="ml-3 h-2.5 w-2.5 rounded-full bg-[#5b6e66]" />
                  <div className="-mt-1 h-2.5 w-2.5 rounded-full bg-[#5b6e66]" />
                </div>
                <div className="h-8 w-8 border border-[#d8d2c7] bg-[#fdfbf8]" />
              </div>

              <div className="space-y-2 text-[12px] uppercase tracking-[0.22em] text-[#5f655f]">
                <a href="#inicio" className="block">
                  Index
                </a>
                <a href="#catalogo" className="block">
                  Shop
                </a>
                <a href="#contacto" className="block">
                  Contact
                </a>
              </div>

              <div className="mt-12 space-y-3 text-[11px] text-[#8a867d]">
                <div>@velasgaia.26</div>
                <div>@velas.gaia</div>
                <div>Rionegro, Antioquia</div>
              </div>

              <div className="mt-16 min-h-[240px] rounded-[1.75rem] border border-[#ece5da] bg-[#faf8f4] p-5">
                <div className="flex h-full items-end">
                  <div>
                    <div className="mb-6 h-24 w-[2px] bg-[#d8d0c3]" />
                    <div className="font-serif text-4xl italic text-[#4d625a]">GAIA</div>
                    <p className="mt-3 max-w-[180px] text-xs leading-6 text-[#7c7a72]">
                      Inspirada en la tierra, la belleza natural y la delicadeza de lo hecho a mano.
                    </p>
                  </div>
                </div>
              </div>
            </aside>

            <div className="rounded-[2.25rem] border border-[#e7dfd3] bg-white p-5 shadow-[0_18px_70px_rgba(89,84,76,0.06)] md:p-7 lg:p-8">
              <div className="grid gap-5 xl:grid-cols-[1fr_1.1fr] xl:gap-8">
                <div className="flex flex-col justify-between rounded-[1.8rem] bg-[#fbf9f5] p-7">
                  <div>
                    <div className="inline-flex rounded-full border border-[#e7dfd3] bg-white px-4 py-1.5 text-[10px] uppercase tracking-[0.32em] text-[#8a867d]">
                      New collection
                    </div>
                    <h1 className="mt-8 max-w-xl font-serif text-5xl leading-[1.02] text-[#4a5e56] md:text-6xl xl:text-[68px]">
                      Velas que abrazan, decoran y cuentan historias
                    </h1>
                    <p className="mt-6 max-w-lg text-sm leading-8 text-[#696862] md:text-base">
                      GAIA crea piezas artesanales pensadas para transformar espacios, envolver emociones y
                      convertir momentos simples en recuerdos especiales.
                    </p>
                  </div>

                  <div className="mt-10 flex flex-wrap gap-3">
                    <a href="#catalogo" className="rounded-full bg-[#52665d] px-6 py-3 text-sm font-medium text-white">
                      Ver catálogo
                    </a>
                    <a
                      href="#personaliza"
                      className="rounded-full border border-[#d4cabc] px-6 py-3 text-sm font-medium text-[#52665d]"
                    >
                      Personaliza tu vela
                    </a>
                  </div>
                </div>

                <div className="grid gap-5 rounded-[1.8rem] bg-[#f6f2ea] p-5 md:grid-cols-[1.2fr_0.8fr] md:p-6">
                  <div className="relative min-h-[420px] overflow-hidden rounded-[1.8rem] bg-[#fcfbf8] p-6">
                    <div className="absolute right-6 top-5 text-[11px] font-medium uppercase tracking-[0.28em] text-[#6b6f67]">
                      + info
                    </div>
                    <div className="absolute left-8 top-10 max-w-[180px] text-[11px] uppercase tracking-[0.28em] text-[#8f8a80]">
                      Minimalismo natural · regalos · recuerdos especiales
                    </div>
                    <div className="absolute bottom-10 left-8 h-28 w-28 rounded-[1.5rem] border border-[#d9d1c4] bg-[linear-gradient(180deg,#e9e4da_0%,#e9e4da_70%,#cfae91_70%,#cfae91_100%)] shadow-sm" />
                    <div className="absolute bottom-14 left-32 h-24 w-24 rounded-[1.25rem] border border-[#dbd2c5] bg-[#e5dfd5] shadow-sm" />
                    <div className="absolute right-8 top-20 flex h-64 w-40 items-start justify-center">
                      <div className="mt-4 h-36 w-28 rounded-[1.4rem] border border-[#d6cdbf] bg-[linear-gradient(180deg,#ece7de_0%,#ece7de_68%,#cfac90_68%,#cfac90_100%)] shadow-md" />
                    </div>
                  </div>

                  <div className="flex flex-col justify-between gap-5">
                    <div className="rounded-[1.5rem] bg-white p-5">
                      <div className="text-[11px] uppercase tracking-[0.28em] text-[#8f8a80]">Esencia</div>
                      <p className="mt-4 text-sm leading-7 text-[#666760]">
                        Inspirada en la calma, los aromas, las formas orgánicas y la delicadeza de lo hecho a mano.
                      </p>
                    </div>
                    <div className="rounded-[1.5rem] bg-[#52665d] p-5 text-white">
                      <div className="text-[11px] uppercase tracking-[0.28em] text-white/70">Detalles especiales</div>
                      <p className="mt-4 text-sm leading-7 text-white/85">
                        Regalos, decoración, eventos y piezas personalizadas con una estética delicada y emocional.
                      </p>
                    </div>
                    <div className="rounded-[1.5rem] border border-[#e4dccf] bg-[#fbf8f4] p-5">
                      <div className="text-[11px] uppercase tracking-[0.28em] text-[#8f8a80]">Precio guía</div>
                      <div className="mt-3 font-serif text-3xl text-[#4f625a]">$10.000 - $150.000</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
            <SectionTitle
              eyebrow="Categorías"
              title="Descubre el universo GAIA"
              body="Explora nuestras líneas de velas y encuentra inspiración para regalos, decoración, eventos y momentos especiales."
            />

            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {categories.slice(1).map((item, index) => (
                <div
                  key={item}
                  className="group rounded-[1.7rem] border border-[#e8e1d6] bg-[#faf8f4] p-6 transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-md"
                >
                  <div className="mb-7 flex items-center justify-between">
                    <div className="text-[11px] uppercase tracking-[0.3em] text-[#8f8a80]">0{index + 1}</div>
                    <div className="h-9 w-9 rounded-full border border-[#dfd7ca] bg-[#f3eee6]" />
                  </div>
                  <h3 className="font-serif text-[30px] leading-none text-[#53675f]">{item}</h3>
                  <p className="mt-4 text-sm leading-7 text-[#6c6c65]">
                    Diseños delicados y personalizables pensados para decorar, regalar y acompañar momentos memorables.
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section id="catalogo" className="border-y border-[#ebe4d9] bg-white/60">
            <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                <SectionTitle
                  eyebrow="Catálogo inicial"
                  title="Favoritos de la colección"
                  body="Una selección base pensada para quienes buscan belleza, aroma y detalle en una sola pieza."
                />
                <a href="#personaliza" className="w-fit rounded-full border border-[#52665d] px-5 py-2.5 text-sm text-[#52665d]">
                  ¿No encuentras lo que buscas?
                </a>
              </div>

              <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar por nombre, tipo o categoría"
                  className="w-full rounded-full border border-[#ddd4c7] bg-[#faf8f4] px-5 py-3 text-sm outline-none placeholder:text-[#9a958c]"
                />
                <div className="flex flex-wrap gap-3">
                  {categories.map((item) => (
                    <button
                      key={item}
                      onClick={() => setSelectedCategory(item)}
                      className={`rounded-full px-4 py-2 text-sm transition ${
                        selectedCategory === item
                          ? "bg-[#52665d] text-white"
                          : "border border-[#ddd4c7] bg-[#faf8f4] text-[#5f655f]"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {filteredProducts.map((product, index) => (
                  <div
                    key={product.name}
                    className="overflow-hidden rounded-[2rem] border border-[#e8e0d4] bg-white shadow-[0_10px_40px_rgba(84,82,77,0.05)]"
                  >
                    <ProductVisual index={index} />
                    <div className="p-6">
                      <div className="text-[11px] uppercase tracking-[0.28em] text-[#8f8a80]">{product.type}</div>
                      <h3 className="mt-3 font-serif text-[31px] leading-none text-[#4f625a]">{product.name}</h3>
                      <p className="mt-4 text-sm leading-7 text-[#6d6b63]">{product.note}</p>
                      <div className="mt-6 flex items-center justify-between gap-3">
                        <div>
                          <div className="text-[11px] uppercase tracking-[0.28em] text-[#8f8a80]">Precio base</div>
                          <div className="mt-1 text-base font-medium text-[#465952]">{product.priceLabel}</div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => openProduct(product)}
                            className="rounded-full border border-[#d5ccbf] px-4 py-2 text-sm text-[#5f655f]"
                          >
                            Ver
                          </button>
                          <a href="#personaliza" className="rounded-full border border-[#52665d] px-4 py-2 text-sm text-[#52665d]">
                            Cotizar
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="personaliza" ref={quoteSectionRef} className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
            <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
              <div className="rounded-[2rem] border border-[#e7dfd3] bg-[#eef0ea] p-8 lg:p-10">
                <SectionTitle
                  eyebrow="Cotización personalizada"
                  title="Haz de tu idea una vela especial"
                  body="Puedes elegir tamaño, aroma, color, diseño, molde, empaque, cantidad e incluso subir una imagen de referencia. El valor mostrado será aproximado y se confirmará contigo por WhatsApp."
                />

                <div className="mt-10 grid gap-3 text-sm text-[#56645e] sm:grid-cols-2">
                  {[
                    "Tamaño",
                    "Aroma",
                    "Color",
                    "Diseño",
                    "Tipo de molde",
                    "Empaque",
                    "Etiqueta o mensaje",
                    "Cantidad",
                    "Imagen de referencia",
                    "Fecha de entrega",
                  ].map((item) => (
                    <div key={item} className="rounded-full border border-[#d9d2c6] bg-white px-4 py-3">
                      {item}
                    </div>
                  ))}
                </div>

                <div className="mt-10 rounded-[1.75rem] border border-[#d7d1c4] bg-white p-6">
                  <div className="text-[11px] uppercase tracking-[0.28em] text-[#8f8a80]">Resumen del pedido</div>
                  <div className="mt-4 space-y-3 text-sm text-[#63665f]">
                    <div className="flex justify-between gap-4">
                      <span>Tipo</span>
                      <span className="font-medium text-[#4f625a]">{quoteType}</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span>Estilo base</span>
                      <span className="font-medium text-[#4f625a]">{quoteReferenceStyle || "Por definir"}</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span>Tamaño</span>
                      <span className="font-medium text-[#4f625a]">{quoteSize}</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span>Cantidad</span>
                      <span className="font-medium text-[#4f625a]">{quoteQuantity}</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span>Nivel</span>
                      <span className="font-medium text-[#4f625a]">{quoteStyle}</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span>Referencia</span>
                      <span className="font-medium text-[#4f625a]">{uploadedFileName || "Sin archivo"}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-[2rem] border border-[#e7dfd3] bg-white p-8 shadow-[0_18px_60px_rgba(86,87,82,0.06)] lg:p-10">
                <div className="grid gap-4 md:grid-cols-2">
                  <input
                    value={quoteName}
                    onChange={(e) => setQuoteName(e.target.value)}
                    className="rounded-[1.2rem] border border-[#ddd6cb] px-4 py-3 outline-none placeholder:text-[#9a958c]"
                    placeholder="Nombre"
                  />
                  <input
                    value={quoteCity}
                    onChange={(e) => setQuoteCity(e.target.value)}
                    className="rounded-[1.2rem] border border-[#ddd6cb] px-4 py-3 outline-none placeholder:text-[#9a958c]"
                    placeholder="Ciudad"
                  />
                  <select
                    value={quoteType}
                    onChange={(e) => setQuoteType(e.target.value)}
                    className="rounded-[1.2rem] border border-[#ddd6cb] px-4 py-3 text-[#6d6b63] outline-none"
                  >
                    {productTypeOptions.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                  <select
                    value={quoteSize}
                    onChange={(e) => setQuoteSize(e.target.value)}
                    className="rounded-[1.2rem] border border-[#ddd6cb] px-4 py-3 text-[#6d6b63] outline-none"
                  >
                    <option>Pequeño</option>
                    <option>Mediano</option>
                    <option>Grande</option>
                  </select>
                  <input
                    type="number"
                    min={1}
                    value={quoteQuantity}
                    onChange={(e) => setQuoteQuantity(Number(e.target.value) || 1)}
                    className="rounded-[1.2rem] border border-[#ddd6cb] px-4 py-3 outline-none placeholder:text-[#9a958c]"
                    placeholder="Cantidad"
                  />
                  <select
                    value={quoteStyle}
                    onChange={(e) => setQuoteStyle(e.target.value)}
                    className="rounded-[1.2rem] border border-[#ddd6cb] px-4 py-3 text-[#6d6b63] outline-none"
                  >
                    <option>Simple</option>
                    <option>Detallado</option>
                    <option>Premium</option>
                  </select>
                  <input
                    value={quoteAroma}
                    onChange={(e) => setQuoteAroma(e.target.value)}
                    className="rounded-[1.2rem] border border-[#ddd6cb] px-4 py-3 outline-none placeholder:text-[#9a958c] md:col-span-2"
                    placeholder="Aroma deseado"
                  />
                  <input
                    value={quoteReferenceStyle}
                    onChange={(e) => setQuoteReferenceStyle(e.target.value)}
                    className="rounded-[1.2rem] border border-[#ddd6cb] px-4 py-3 outline-none placeholder:text-[#9a958c] md:col-span-2"
                    placeholder="Estilo de vela a personalizar"
                  />
                </div>

                <textarea
                  value={quoteDetails}
                  onChange={(e) => setQuoteDetails(e.target.value)}
                  className="mt-4 min-h-[130px] w-full rounded-[1.5rem] border border-[#ddd6cb] px-4 py-3 outline-none placeholder:text-[#9a958c]"
                  placeholder="Cuéntanos tu idea, los colores, la ocasión, el diseño o los detalles especiales"
                />

                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-4 flex w-full items-center justify-between rounded-[1.5rem] border border-dashed border-[#d7cebf] bg-[#faf8f4] p-5 text-left text-sm text-[#807d74]"
                >
                  <span>{uploadedFileName || "Haz clic para cargar una imagen de referencia"}</span>
                  <span className="rounded-full border border-[#d6cebf] px-3 py-1 text-xs text-[#5f655f]">Subir imagen</span>
                </button>

                <div className="mt-5 rounded-[1.7rem] bg-[#f5f1ea] p-5">
                  <div className="text-[11px] uppercase tracking-[0.28em] text-[#8f8a80]">Precio estimado</div>
                  <div className="mt-2 font-serif text-4xl text-[#4f625a]">
                    {formatCOP(estimatedPrice.min)} - {formatCOP(estimatedPrice.max)}
                  </div>
                  <p className="mt-2 text-sm leading-7 text-[#6d6b63]">
                    Este valor es aproximado y se confirma contigo por WhatsApp antes de finalizar el pedido.
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap gap-4">
                  <button className="rounded-full bg-[#52665d] px-6 py-3 text-sm font-medium text-white">
                    Solicitar cotización
                  </button>
                  <a
                    href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                    className="rounded-full border border-[#52665d] px-6 py-3 text-sm font-medium text-[#52665d]"
                  >
                    Continuar por WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section id="eventos" className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
            <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
              <div className="rounded-[2rem] border border-[#e7dfd3] bg-white p-8 shadow-[0_18px_60px_rgba(84,82,77,0.05)] lg:p-10">
                <SectionTitle
                  eyebrow="Eventos y recordatorios"
                  title="Velas para celebrar, regalar y recordar"
                  body="Creamos detalles para bodas, cumpleaños, bautizos, baby showers, recordatorios y eventos corporativos, con opciones de personalización según cantidad, estilo, aroma y presentación."
                />

                <div className="mt-10 grid gap-3 sm:grid-cols-2">
                  {["Bodas", "Cumpleaños", "Bautizos", "Baby showers", "Corporativos", "Recordatorios"].map((item) => (
                    <div key={item} className="rounded-full border border-[#dfd8cb] px-4 py-3 text-sm text-[#55615a]">
                      {item}
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a href="#contacto" className="rounded-full bg-[#52665d] px-6 py-3 text-sm font-medium text-white">
                    Cotizar evento
                  </a>
                  <a
                    href="#personaliza"
                    className="rounded-full border border-[#52665d] px-6 py-3 text-sm font-medium text-[#52665d]"
                  >
                    Personalizar detalle
                  </a>
                </div>
              </div>

              <div className="rounded-[2rem] border border-[#e7dfd3] bg-[#f3efe7] p-8 lg:p-10">
                <div className="grid gap-4 rounded-[1.75rem] border border-[#e3dacd] bg-[#faf8f4] p-6">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="h-28 rounded-[1.3rem] border border-[#ddd1c1] bg-[linear-gradient(180deg,#e9e4da_0%,#e9e4da_68%,#d1ae91_68%,#d1ae91_100%)]" />
                    <div className="h-28 rounded-[1.3rem] border border-[#ddd1c1] bg-[linear-gradient(180deg,#ede8de_0%,#ede8de_68%,#d7b498_68%,#d7b498_100%)]" />
                    <div className="h-28 rounded-[1.3rem] border border-[#ddd1c1] bg-[linear-gradient(180deg,#ebe6dc_0%,#ebe6dc_68%,#cfae90_68%,#cfae90_100%)]" />
                  </div>
                  <div className="rounded-[1.4rem] bg-white p-5">
                    <div className="text-[11px] uppercase tracking-[0.28em] text-[#8f8a80]">Tiempos de producción</div>
                    <div className="mt-3 space-y-3 text-sm leading-7 text-[#6d6b63]">
                      <p>
                        <span className="font-medium text-[#4f625a]">Estándar:</span> 2 a 4 días hábiles
                      </p>
                      <p>
                        <span className="font-medium text-[#4f625a]">Personalizados:</span> 4 a 7 días hábiles
                      </p>
                      <p>
                        <span className="font-medium text-[#4f625a]">Eventos:</span> según cantidad y complejidad
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="border-y border-[#ebe4d9] bg-white/60">
            <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
              <SectionTitle
                eyebrow="Proceso GAIA"
                title="Tu pedido en cinco pasos"
                body="Un recorrido simple, claro y delicado para que tu experiencia con GAIA se sienta cercana desde la cotización hasta la entrega."
              />

              <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                {steps.map((step, index) => (
                  <div key={step} className="rounded-[1.6rem] border border-[#e5ddd2] bg-[#faf8f4] p-5">
                    <div className="text-[11px] uppercase tracking-[0.3em] text-[#8f8a80]">0{index + 1}</div>
                    <p className="mt-5 text-sm leading-7 text-[#61645e]">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="sobre" className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
            <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
              <div className="rounded-[2rem] border border-[#e7dfd3] bg-[#f4f0e8] p-8 lg:p-10">
                <div className="relative flex min-h-[430px] items-center justify-center overflow-hidden rounded-[1.75rem] border border-[#e2dbcf] bg-[#faf8f4]">
                  <div className="absolute h-72 w-72 rounded-full border border-[#e8e0d4]" />
                  <div className="absolute h-56 w-56 rounded-full border border-[#efe8dc]" />
                  <div className="absolute top-16 text-[11px] uppercase tracking-[0.34em] text-[#8f8a80]">
                    Origen · Tierra · Belleza natural
                  </div>
                  <div className="text-center">
                    <div className="font-serif text-7xl tracking-[0.24em] text-[#62756d] md:text-8xl">GAIA</div>
                    <p className="mx-auto mt-5 max-w-sm text-sm leading-7 text-[#6e6d66]">
                      Cada vela nace como una pieza especial, diseñada para conectar con regalos, recuerdos, celebraciones
                      y momentos únicos.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-[2rem] border border-[#e7dfd3] bg-white p-8 shadow-[0_18px_60px_rgba(84,82,77,0.05)] lg:p-10">
                <SectionTitle
                  eyebrow="Sobre GAIA"
                  title="La esencia de una marca hecha con intención"
                  body="GAIA representa el origen, la tierra y la belleza natural. Nuestra marca se inspira en la calma, los aromas, las formas orgánicas y la delicadeza de lo hecho a mano para crear velas que van más allá de la decoración."
                />

                <p className="mt-5 text-sm leading-8 text-[#676860] md:text-base">
                  Cada pieza está pensada para transformar espacios, envolver emociones y convertir momentos simples en
                  recuerdos especiales. Inspirada en la esencia de la tierra, GAIA crea velas que abrazan, decoran y
                  cuentan historias.
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {["Personalización con sentido", "Estética delicada", "Inspiración natural", "Conexión emocional"].map(
                    (item) => (
                      <div
                        key={item}
                        className="rounded-[1.35rem] border border-[#e4dccf] bg-[#faf8f4] px-5 py-4 text-sm text-[#56645e]"
                      >
                        {item}
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </section>

          <section id="faq" className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
            <SectionTitle
              eyebrow="Preguntas frecuentes"
              title="Todo lo que necesitas saber"
              body="Respuestas rápidas sobre envíos, personalización, tiempos y cotizaciones para que tu experiencia con GAIA sea clara desde el inicio."
            />

            <div className="mt-10 grid gap-4">
              {faqs.map((item, index) => (
                <button
                  key={item.q}
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="rounded-[1.6rem] border border-[#e7dfd3] bg-white p-6 text-left shadow-[0_6px_30px_rgba(84,82,77,0.04)]"
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-medium text-[#4f625a]">{item.q}</h3>
                    <span className="text-xl text-[#738178]">{openFaq === index ? "−" : "+"}</span>
                  </div>
                  {openFaq === index ? <p className="mt-3 text-sm leading-7 text-[#6d6b63]">{item.a}</p> : null}
                </button>
              ))}
            </div>
          </section>

          <section id="contacto" className="bg-[#52665d] text-white">
            <div className="mx-auto grid max-w-7xl gap-6 px-6 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
              <div>
                <SectionTitle
                  eyebrow="Contacto"
                  title="Hablemos de tu idea"
                  body="Si quieres cotizar, resolver dudas o pedir más información, puedes escribirnos y con gusto te ayudamos."
                  light
                />
                <div className="mt-8 space-y-3 text-sm text-white/80">
                  <p>
                    <span className="font-medium text-white">Ciudad base:</span> Rionegro, Antioquia
                  </p>
                  <p>
                    <span className="font-medium text-white">Canal principal:</span> WhatsApp
                  </p>
                  <p>
                    <span className="font-medium text-white">Instagram:</span> velasgaia.26
                  </p>
                  <p>
                    <span className="font-medium text-white">TikTok:</span> @velas.gaia
                  </p>
                </div>
              </div>

              <div className="rounded-[2rem] bg-white p-8 text-[#4f625a] shadow-[0_18px_60px_rgba(27,31,30,0.18)] lg:p-10">
                <div className="grid gap-4 md:grid-cols-2">
                  <input
                    className="rounded-[1.2rem] border border-[#ddd6cb] px-4 py-3 outline-none placeholder:text-[#9a958c]"
                    placeholder="Nombre"
                  />
                  <input
                    className="rounded-[1.2rem] border border-[#ddd6cb] px-4 py-3 outline-none placeholder:text-[#9a958c]"
                    placeholder="Celular"
                  />
                </div>
                <input
                  className="mt-4 w-full rounded-[1.2rem] border border-[#ddd6cb] px-4 py-3 outline-none placeholder:text-[#9a958c]"
                  placeholder="Correo"
                />
                <input
                  className="mt-4 w-full rounded-[1.2rem] border border-[#ddd6cb] px-4 py-3 outline-none placeholder:text-[#9a958c]"
                  placeholder="Motivo de contacto"
                />
                <textarea
                  className="mt-4 min-h-[140px] w-full rounded-[1.5rem] border border-[#ddd6cb] px-4 py-3 outline-none placeholder:text-[#9a958c]"
                  placeholder="Cuéntanos qué necesitas"
                />
                <div className="mt-6 flex flex-wrap gap-4">
                  <button className="rounded-full bg-[#52665d] px-6 py-3 text-sm font-medium text-white">
                    Enviar mensaje
                  </button>
                  <a
                    href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hola, quiero más información sobre GAIA.")}`}
                    className="rounded-full border border-[#52665d] px-6 py-3 text-sm font-medium text-[#52665d]"
                  >
                    Ir a WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="border-t border-[#e6ded2] bg-[#f7f4ee]">
          <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-10">
            <div>
              <LogoMark />
              <p className="mt-4 max-w-md text-sm leading-7 text-[#6d6b63]">
                Velas artesanales inspiradas en la tierra, la belleza natural y la delicadeza de lo hecho a mano.
              </p>
            </div>

            <div>
              <div className="text-[11px] uppercase tracking-[0.28em] text-[#8f8a80]">Navegación</div>
              <div className="mt-4 space-y-3 text-sm text-[#5c625c]">
                <a href="#inicio" className="block">
                  Inicio
                </a>
                <a href="#catalogo" className="block">
                  Catálogo
                </a>
                <a href="#personaliza" className="block">
                  Personaliza tu vela
                </a>
                <a href="#eventos" className="block">
                  Eventos
                </a>
              </div>
            </div>

            <div>
              <div className="text-[11px] uppercase tracking-[0.28em] text-[#8f8a80]">Contacto</div>
              <div className="mt-4 space-y-3 text-sm text-[#5c625c]">
                <div>Rionegro, Antioquia</div>
                <div>3021277385</div>
                <div>velasgaia.26</div>
                <div>@velas.gaia</div>
              </div>
            </div>
          </div>
        </footer>

        <a
          href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hola, quiero cotizar una vela en GAIA.")}`}
          className="fixed bottom-5 right-5 rounded-full bg-[#52665d] px-5 py-3 text-sm font-medium text-white shadow-[0_18px_40px_rgba(53,61,57,0.28)] transition hover:opacity-90"
        >
          WhatsApp
        </a>

        {selectedProduct ? (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4">
            <div className="max-h-[90vh] w-full max-w-4xl overflow-auto rounded-[2rem] bg-[#f9f7f2] p-5 shadow-2xl md:p-7">
              <div className="grid gap-6 md:grid-cols-[0.9fr_1.1fr]">
                <ProductVisual index={1} />
                <div className="flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-[11px] uppercase tracking-[0.28em] text-[#8f8a80]">{selectedProduct.type}</div>
                        <h3 className="mt-3 font-serif text-4xl leading-none text-[#4f625a]">{selectedProduct.name}</h3>
                      </div>
                      <button
                        onClick={() => setSelectedProduct(null)}
                        className="rounded-full border border-[#d7cebf] px-4 py-2 text-sm text-[#5f655f]"
                      >
                        Cerrar
                      </button>
                    </div>

                    <p className="mt-5 text-sm leading-8 text-[#686861]">{selectedProduct.desc}</p>

                    <div className="mt-6 rounded-[1.5rem] bg-white p-5">
                      <div className="text-[11px] uppercase tracking-[0.28em] text-[#8f8a80]">Precio base</div>
                      <div className="mt-2 font-serif text-3xl text-[#4f625a]">{selectedProduct.priceLabel}</div>
                      <p className="mt-3 text-sm leading-7 text-[#6d6b63]">{selectedProduct.note}</p>
                    </div>

                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-[1.5rem] border border-[#e4dccf] bg-white p-5">
                        <div className="text-[11px] uppercase tracking-[0.28em] text-[#8f8a80]">Personalizable en</div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {selectedProduct.custom.map((item) => (
                            <span key={item} className="rounded-full border border-[#ddd4c7] px-3 py-1 text-xs text-[#5f655f]">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="rounded-[1.5rem] border border-[#e4dccf] bg-white p-5">
                        <div className="text-[11px] uppercase tracking-[0.28em] text-[#8f8a80]">Tiempo estimado</div>
                        <div className="mt-3 text-sm text-[#5d615b]">{selectedProduct.time}</div>
                      </div>
                    </div>

                    <div className="mt-6 rounded-[1.5rem] border border-[#e4dccf] bg-white p-5">
                      <div className="flex flex-wrap items-end justify-between gap-4">
                        <div>
                          <div className="text-[11px] uppercase tracking-[0.28em] text-[#8f8a80]">Cantidad</div>
                          <input
                            type="number"
                            min={1}
                            value={selectedProductQty}
                            onChange={(e) => setSelectedProductQty(Number(e.target.value) || 1)}
                            className="mt-3 w-28 rounded-full border border-[#ddd4c7] px-4 py-2 text-sm outline-none"
                          />
                        </div>
                        <div className="text-right">
                          <div className="text-[11px] uppercase tracking-[0.28em] text-[#8f8a80]">Total estándar</div>
                          <div className="mt-2 font-serif text-3xl text-[#4f625a]">{formatCOP(selectedProductTotal)}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <a
                      href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                        `Hola, quiero comprar ${selectedProductQty} unidad(es) del producto ${selectedProduct.name} de GAIA. Total base: ${formatCOP(selectedProductTotal)}.`
                      )}`}
                      className="rounded-full bg-[#52665d] px-6 py-3 text-sm font-medium text-white"
                    >
                      Pagar
                    </a>
                    <button
                      onClick={() => handlePersonalizeProduct(selectedProduct)}
                      className="rounded-full border border-[#52665d] px-6 py-3 text-sm font-medium text-[#52665d]"
                    >
                      Personalizar esta vela
                    </button>
                    <a
                      href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                        `Hola, quiero pedir por WhatsApp el producto ${selectedProduct.name} de GAIA.`
                      )}`}
                      className="rounded-full border border-[#52665d] px-6 py-3 text-sm font-medium text-[#52665d]"
                    >
                      Pedir por WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
