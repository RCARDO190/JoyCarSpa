/*
  JOY AUTO SPA — comportamiento del sitio
  ---------------------------------------------------------------------------
  ZONA DE CONFIGURACIÓN
  Sustituyan los valores vacíos por las fotos, video y datos reales del negocio.
  No necesitan cambiar el HTML para cargar imágenes: agreguen la ruta en `src`.
  Ejemplo: src: "assets/images/hero-joy-auto-spa.jpg"

  ¿Una foto se ve muy recortada/con zoom en celular? Es porque una foto horizontal
  (ancha) no cabe completa en un espacio vertical (como el celular) sin recortarse.
  Pueden agregar `mobileSrc` con una foto recortada en vertical para ese mismo espacio,
  y el sitio la usa automáticamente solo en pantallas de celular. Ejemplo:
  hero: { src: "assets/images/hero.jpg", mobileSrc: "assets/images/hero-vertical.jpg", alt: "..." }
  Si no agregan `mobileSrc`, se sigue usando la misma foto (`src`) en todas las pantallas.
*/
const SITE_CONFIG = {
  // Escribir solo números con código de país, sin +, espacios ni guiones.
  // Ejemplo para México: "526621234567". Se deja vacío para evitar enviar mensajes a un número de muestra.
  whatsappNumber: "526623274366",
  email: "joyautospamx@gmail.com",
  // Pueden pegar aquí el enlace de Google Maps de la sucursal.
  mapsUrl: "",
  // Logo real de la marca: peguen aquí la ruta de la imagen (ej. "assets/images/logo.png")
  // y guarden el archivo dentro de assets/images. Mientras quede vacío, se sigue mostrando
  // la "J" como marcador temporal en el encabezado y el pie de página.
  logo: {
    src: "assets/images/joylogoya.png",
    alt: "JOY AUTO SPA",
    height: 50, // Alto del logo en píxeles. Súbanlo o bájenlo hasta que se vea del tamaño correcto junto al texto.
    offsetY: -55, // Ajuste fino vertical en píxeles (ej. -3 sube el logo, 3 lo baja) por si la imagen no queda centrada con el texto.
  },
};

// Cada clave coincide con un atributo data-media-slot dentro de los archivos HTML.
const IMAGE_SLOTS = {
  hero: {
  src: "assets/images/joy portada 2.jpeg",              // la foto normal (PC y tablet)
  mobileSrc: "assets/images/fondomobile.png", // opcional: solo se usa en celular
  alt: "Proceso profesional de detailing automotriz",
},
  story: { src: "assets/images/lavado.jpg", alt: "Equipo de JOY AUTO SPA trabajando" },
  before: { src: "assets/images/Gemini_Generated_Image_k33auxk33auxk33a.png", alt: "Vehículo antes del tratamiento" },
  after: { src: "assets/images/sucio.jpg", alt: "Vehículo después del tratamiento" },
  "gallery-1": { src: "assets/images/lavado.jpg", alt: "Detalle de pintura con acabado brillante" },
  "gallery-2": { src: "assets/images/lavado.jpg", alt: "Interior limpio y acondicionado" },
  "gallery-3": { src: "assets/images/lavado.jpg", alt: "Rines con acabado protegido" },
  "gallery-4": { src: "assets/images/lavado.jpg", alt: "Proceso de corrección de pintura" },
  // Fotos principales de las páginas individuales de servicio.
  "joy-care": { src: "assets/images/lavado.jpg", alt: "Servicio JOY CARE en JOY AUTO SPA" },
  "joy-interior": { src: "assets/images/lavado.jpg", alt: "Servicio JOY INTERIOR en JOY AUTO SPA" },
  "joy-restore": { src: "assets/images/lavado.jpg", alt: "Servicio JOY RESTORE en JOY AUTO SPA" },
  "joy-protect": { src: "assets/images/lavado.jpg", alt: "Servicio JOY PROTECT en JOY AUTO SPA" },
  prestige: { src: "assets/images/lavado.jpg", alt: "Servicio PRESTIGE en JOY AUTO SPA" },
  // Galerías de cada tratamiento. Pueden dejar cualquier espacio vacío mientras consiguen la foto.
  "joy-care-1": { src: "assets/images/lavado.jpg", alt: "Lavado seguro de JOY CARE" }, "joy-care-2": { src: "", alt: "Acabado de JOY CARE" }, "joy-care-3": { src: "", alt: "Detalle de JOY CARE" },
  "joy-interior-1": { src: "assets/images/lavado.jpg", alt: "Limpieza de JOY INTERIOR" }, "joy-interior-2": { src: "", alt: "Detalle de JOY INTERIOR" }, "joy-interior-3": { src: "", alt: "Acabado de JOY INTERIOR" },
  "joy-restore-1": { src: "assets/images/lavado.jpg", alt: "Corrección de JOY RESTORE" }, "joy-restore-2": { src: "", alt: "Proceso de JOY RESTORE" }, "joy-restore-3": { src: "", alt: "Reflejo de JOY RESTORE" },
  "joy-protect-1": { src: "assets/images/lavado.jpg", alt: "Aplicación de JOY PROTECT" }, "joy-protect-2": { src: "", alt: "Protección de JOY PROTECT" }, "joy-protect-3": { src: "", alt: "Acabado de JOY PROTECT" },
  "prestige-1": { src: "assets/images/lavado.jpg", alt: "Preparación PRESTIGE" }, "prestige-2": { src: "", alt: "Proceso PRESTIGE" }, "prestige-3": { src: "", alt: "Resultado PRESTIGE" },
};

// Si cuentan con un video para la portada, coloquen la ruta aquí. Tiene prioridad sobre IMAGE_SLOTS.hero.
const VIDEO_SLOTS = {
  hero: { src: "", poster: "", ariaLabel: "Video de procesos de JOY AUTO SPA" },
};

/** Crea una imagen, video o placeholder dentro de cualquier espacio de medios. */
function renderMediaSlot(slot, key) {
  const image = IMAGE_SLOTS[key];
  const video = VIDEO_SLOTS[key];
  const label = slot.dataset.label || image?.alt || "Espacio para fotografía";

  slot.replaceChildren();
  slot.classList.remove("has-media");

  if (video?.src) {
    const videoElement = document.createElement("video");
    videoElement.src = video.src;
    videoElement.poster = video.poster || "";
    videoElement.autoplay = true;
    videoElement.muted = true;
    videoElement.loop = true;
    videoElement.playsInline = true;
    videoElement.setAttribute("aria-label", video.ariaLabel || label);
    slot.append(videoElement);
    slot.classList.add("has-media");
    return;
  }

  if (image?.src) {
    const picture = document.createElement("picture");

    // Si se configuró una foto específica para celular (mobileSrc), el navegador la usa
    // automáticamente en pantallas angostas (680px o menos); si no, siempre usa `src`.
    if (image.mobileSrc) {
      const mobileSource = document.createElement("source");
      mobileSource.media = "(max-width: 680px)";
      mobileSource.srcset = image.mobileSrc;
      picture.append(mobileSource);
    }

    const imageElement = document.createElement("img");
    imageElement.src = image.src;
    imageElement.alt = image.alt || label;
    imageElement.loading = key === "hero" ? "eager" : "lazy";
    imageElement.decoding = "async";
    picture.append(imageElement);

    slot.append(picture);
    slot.classList.add("has-media");
    return;
  }

  // La etiqueta hace visible el espacio reservado hasta que se suba la fotografía final.
  const tag = document.createElement("span");
  tag.className = "media-slot__tag";
  tag.textContent = slot.querySelector(".media-slot__tag")?.textContent || label;
  slot.append(tag);
}

function renderAllMedia() {
  document.querySelectorAll("[data-media-slot]").forEach((slot) => {
    renderMediaSlot(slot, slot.dataset.mediaSlot);
  });
}

/** Sustituye la "J" por el logo real (SITE_CONFIG.logo) en el encabezado y el pie de página de cualquier página. */
function renderBrandLogo() {
  if (!SITE_CONFIG.logo.src) return; // Sin logo configurado: se conserva la "J" como marcador temporal.
  document.querySelectorAll(".brand-mark").forEach((mark) => {
    mark.replaceChildren();
    const logoImage = document.createElement("img");
    logoImage.src = SITE_CONFIG.logo.src;
    logoImage.alt = SITE_CONFIG.logo.alt || "";
    mark.append(logoImage);
    mark.classList.add("has-logo");
    mark.style.height = `${SITE_CONFIG.logo.height}px`;
    mark.style.transform = SITE_CONFIG.logo.offsetY ? `translateY(${SITE_CONFIG.logo.offsetY}px)` : "";
  });
}

/** Devuelve una URL segura de WhatsApp o null cuando aún no se configura el número. */
function buildWhatsappUrl(message) {
  const number = SITE_CONFIG.whatsappNumber.replace(/\D/g, "");
  return number ? `https://wa.me/${number}?text=${encodeURIComponent(message)}` : null;
}

function showToast(message) {
  let toast = document.querySelector("[data-site-toast]");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "site-toast";
    toast.dataset.siteToast = "";
    toast.setAttribute("role", "status");
    document.body.append(toast);
  }
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(showToast.timeout);
  showToast.timeout = window.setTimeout(() => toast.classList.remove("is-visible"), 4200);
}

function configureContactLinks() {
  document.querySelectorAll("[data-email-link]").forEach((link) => {
    link.href = `mailto:${SITE_CONFIG.email}`;
    link.textContent = SITE_CONFIG.email;
  });

  document.querySelectorAll("[data-map-link]").forEach((link) => {
    if (SITE_CONFIG.mapsUrl) link.href = SITE_CONFIG.mapsUrl;
    link.addEventListener("click", (event) => {
      if (!SITE_CONFIG.mapsUrl) {
        event.preventDefault();
        showToast("Agrega el enlace real de Google Maps en assets/app.js para activar este botón.");
      }
    });
  });

  document.querySelectorAll("[data-whatsapp-direct]").forEach((link) => {
    link.addEventListener("click", (event) => {
      const url = buildWhatsappUrl("Hola, quiero información sobre los servicios de JOY AUTO SPA.");
      if (!url) {
        event.preventDefault();
        showToast("Agrega el número de WhatsApp real en assets/app.js para activar este botón.");
        return;
      }
      link.href = url;
    });
  });
}

function setupBookingForm() {
  const form = document.querySelector("[data-booking-form]");
  if (!form) return;

  // Evita que un cliente elija una fecha anterior a hoy.
  const dateInput = form.elements.date;
  if (dateInput) dateInput.min = new Date().toISOString().split("T")[0];

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const status = form.querySelector("[data-form-status]");
    if (!form.reportValidity()) {
      status.textContent = "Por favor completa los campos obligatorios.";
      return;
    }

    const data = new FormData(form);
    const preferredDate = new Date(`${data.get("date")}T12:00:00`).toLocaleDateString("es-MX", {
      day: "2-digit", month: "long", year: "numeric",
    });
    const message = [
      "Hola, quiero solicitar disponibilidad en JOY AUTO SPA.",
      "",
      `Nombre: ${data.get("name")}`,
      `Teléfono: ${data.get("phone")}`,
      `Vehículo: ${data.get("vehicle")}`,
      `Servicio de interés: ${data.get("service")}`,
      `Fecha preferida: ${preferredDate}`,
      `Horario: ${data.get("time")}`,
      `Comentarios: ${data.get("comments") || "Sin comentarios adicionales"}`,
    ].join("\n");
    const url = buildWhatsappUrl(message);

    if (!url) {
      status.textContent = "Falta configurar el número de WhatsApp en assets/app.js.";
      return;
    }

    status.textContent = "Abriendo WhatsApp con los datos de tu solicitud…";
    window.open(url, "_blank", "noopener,noreferrer");
  });
}

function setupNavigation() {
  const header = document.querySelector("[data-header]");
  const toggle = document.querySelector("[data-menu-toggle]");
  const nav = document.querySelector("[data-nav]");
  if (!header) return;

  const updateHeader = () => header.classList.toggle("is-scrolled", window.scrollY > 25);
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  toggle?.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    document.body.classList.toggle("nav-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    document.body.classList.remove("nav-open");
    toggle?.setAttribute("aria-expanded", "false");
  }));
}

function setupComparison() {
  const comparison = document.querySelector("[data-comparison]");
  const range = document.querySelector("[data-comparison-range]");
  if (!comparison || !range) return;
  const update = () => comparison.style.setProperty("--comparison-position", `${range.value}%`);
  range.addEventListener("input", update);
  update();
}

function setupGallery() {
  const dialog = document.querySelector("[data-gallery-dialog]");
  const dialogMedia = dialog?.querySelector("[data-dialog-media]");
  if (!dialog || !dialogMedia) return;

  document.querySelectorAll("[data-gallery-item]").forEach((item) => {
    item.addEventListener("click", () => {
      const key = item.dataset.mediaKey;
      const source = item.querySelector("[data-media-slot]");
      dialogMedia.dataset.label = source?.dataset.label || "Detalle de galería";
      renderMediaSlot(dialogMedia, key);
      dialog.showModal();
    });
  });
  dialog.querySelector("[data-dialog-close]")?.addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
}

function setupServicePage() {
  const page = document.body.dataset.service;
  if (!page) return;
  // La imagen principal de cada página de servicio se configura igual que las demás imágenes.
  const heroSlot = document.querySelector("[data-service-hero]");
  if (heroSlot) renderMediaSlot(heroSlot, page);
}

// Arranque centralizado: mantengan aquí los módulos nuevos si agregan funcionalidades.
document.addEventListener("DOMContentLoaded", () => {
  renderAllMedia();
  renderBrandLogo();
  configureContactLinks();
  setupNavigation();
  setupBookingForm();
  setupComparison();
  setupGallery();
  setupServicePage();
  document.querySelectorAll("[data-year]").forEach((node) => { node.textContent = new Date().getFullYear(); });
});
