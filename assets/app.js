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
  whatsappNumber: "526629489465",
  email: "joyautospamx@gmail.com",
  // Pueden pegar aquí el enlace de Google Maps de la sucursal.
  mapsUrl: "",
  // Para mostrar un logo, indiquen su ruta dentro de assets/images en el campo logo.
  socials: [
    { label: "Instagram", text: "IG", url: "https://www.instagram.com/joyautospa/", logo: "assets/images/iglogo.png" },
    { label: "Facebook", text: "FB", url: "https://www.facebook.com/profile.php?id=61592713452634", logo: "assets/images/fblogo.png" },
    { label: "TikTok", text: "TT", url: "https://www.tiktok.com/@joyautospa", logo: "assets/images/tiktokfb.png" },
  ],
  // Logo real de la marca: peguen aquí la ruta de la imagen (ej. "assets/images/logo.png")
  // y guarden el archivo dentro de assets/images. Mientras quede vacío, se sigue mostrando
  // la "J" como marcador temporal en el encabezado y el pie de página.
  logo: {
    src: "assets/images/joylogoya.png",
    alt: "JOY AUTO SPA",
    height: 50, // Alto del logo en píxeles. Súbanlo o bájenlo hasta que se vea del tamaño correcto junto al texto.
    offsetY: 0, // Ajuste fino vertical en píxeles por si la imagen no queda centrada con el texto.
  },
};

// Cada clave coincide con un atributo data-media-slot dentro de los archivos HTML.
const IMAGE_SLOTS = {
  hero: {
  src: "assets/images/joy portada 2.jpeg",              // la foto normal (PC y tablet)
  mobileSrc: "assets/images/joylogoya.png", // opcional: solo se usa en celular
  alt: "Proceso profesional de detailing automotriz",
},
  story: { src: "assets/images/joy.jpeg", alt: "Equipo de JOY AUTO SPA trabajando" }, 
  process: { src: "assets/images/procesoreal.jpeg", alt: "Proceso de detailing en el vehículo" },
  result: { src: "assets/images/despues.jpeg", alt: "Resultado final del tratamiento en el vehículo" },
  "gallery-1": { src: "assets/images/nissan gris.jpeg", alt: "Detalle de pintura con acabado brillante" },
  "gallery-2": { src: "assets/images/honda interior frontal.jpeg", alt: "Interior limpio y acondicionado" },
  "gallery-3": { src: "assets/images/motor.jpeg", alt: "Motor detallado" },
  "gallery-4": { src: "assets/images/vocho.png", alt: "Detallado automotriz" },
  "gallery-5": { src: "assets/images/asiento.jpeg", alt: "Asiento limpio y acondicionado" },
  "gallery-6": { src: "assets/images/cadillac.jpeg", alt: "Cadillac con acabado detallado" },
  "gallery-7": { src: "assets/images/ford f150.jpeg", alt: "Ford F-150 después del lavado" },
  "gallery-8": { src: "assets/images/honda interior.png", alt: "Interior de Honda detallado" },
  "gallery-9": { src: "assets/images/honda negro frontal.png", alt: "Honda con exterior detallado" },
  "gallery-10": { src: "assets/images/nissan gris frontal.png", alt: "Nissan con acabado detallado" },
  // Fotos principales de las páginas individuales de servicio.
  "joy-care": { src: "../X", alt: "Servicio JOY CARE en JOY AUTO SPA" },
  "joy-interior": { src: "../X", alt: "Servicio JOY INTERIOR en JOY AUTO SPA" },
  "joy-restore": { src: "../X", alt: "Servicio JOY RESTORE en JOY AUTO SPA" },
  "joy-protect": { src: "../X", alt: "Servicio JOY PROTECT en JOY AUTO SPA" },
  prestige: { src: "../X", alt: "Servicio PRESTIGE en JOY AUTO SPA" }
};
//actualizacion

// Si cuentan con un video para la portada, coloquen la ruta aquí. Tiene prioridad sobre IMAGE_SLOTS.hero.
const VIDEO_SLOTS = {
  hero: { src: "", poster: "", ariaLabel: "Video de procesos de JOY AUTO SPA" },
};

function getSiteRoot() {
  const appScript = [...document.scripts].find((script) => new URL(script.src).pathname.endsWith("/assets/app.js"));
  return appScript ? new URL("../", appScript.src) : new URL("./", document.baseURI);
}

class SiteHeader {
  constructor(mountPoint, siteRoot) {
    this.mountPoint = mountPoint;
    this.siteRoot = siteRoot;
  }

  indexUrl(section) {
    const url = new URL("index.html", this.siteRoot);
    url.hash = section;
    return url.href;
  }

  render() {
    const header = document.createElement("header");
    header.className = "site-header";
    header.dataset.header = "";

    const shell = document.createElement("div");
    shell.className = "shell header-inner";

    const brand = document.createElement("a");
    brand.className = "brand";
    brand.href = this.indexUrl("inicio");
    brand.setAttribute("aria-label", "JOY AUTO SPA, inicio");
    const brandMark = document.createElement("span");
    brandMark.className = "brand-mark";
    brandMark.setAttribute("aria-hidden", "true");
    brandMark.textContent = "J";
    const brandName = document.createElement("span");
    const brandTitle = document.createElement("strong");
    brandTitle.textContent = "JOY";
    const brandSubtitle = document.createElement("small");
    brandSubtitle.textContent = "AUTO SPA";
    brandName.append(brandTitle, brandSubtitle);
    brand.append(brandMark, brandName);

    const toggle = document.createElement("button");
    toggle.className = "menu-toggle";
    toggle.type = "button";
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-controls", "main-nav");
    toggle.dataset.menuToggle = "";
    const toggleLabel = document.createElement("span");
    toggleLabel.className = "sr-only";
    toggleLabel.textContent = "Abrir menú";
    const firstLine = document.createElement("i");
    const secondLine = document.createElement("i");
    firstLine.setAttribute("aria-hidden", "true");
    secondLine.setAttribute("aria-hidden", "true");
    toggle.append(toggleLabel, firstLine, secondLine);

    const nav = document.createElement("nav");
    nav.className = "main-nav";
    nav.id = "main-nav";
    nav.setAttribute("aria-label", "Navegación principal");
    nav.dataset.nav = "";
    [["Inicio", "inicio"], ["Servicios", "servicios"], ["Nosotros", "nosotros"], ["Galería", "galeria"], ["Blog", "blog"], ["Contacto", "contacto"]].forEach(([label, section]) => {
      const link = document.createElement("a");
      link.href = this.indexUrl(section);
      link.textContent = label;
      nav.append(link);
    });

    const bookingLink = document.createElement("a");
    bookingLink.className = "button button-small";
    bookingLink.href = this.indexUrl("agenda");
    bookingLink.append(document.createTextNode("Agenda tu cita "));
    const arrow = document.createElement("span");
    arrow.setAttribute("aria-hidden", "true");
    arrow.textContent = "↗";
    bookingLink.append(arrow);
    nav.append(bookingLink);

    shell.append(brand, toggle, nav);
    header.append(shell);
    this.mountPoint.replaceWith(header);
  }
}

function renderSiteHeaders() {
  const siteRoot = getSiteRoot();
  document.querySelectorAll("[data-site-header]").forEach((mountPoint) => {
    new SiteHeader(mountPoint, siteRoot).render();
  });
}

function renderSiteFooters() {
  const siteRoot = getSiteRoot();
  document.querySelectorAll("[data-site-footer]").forEach((mountPoint) => {
    const footer = document.createElement("footer");
    footer.className = "site-footer";
    footer.id = "contacto";
    footer.innerHTML = `
      <div class="shell footer-grid">
        <div><a class="brand brand-footer" href="${new URL("index.html#inicio", siteRoot).href}"><span class="brand-mark" aria-hidden="true">J</span><span><strong>JOY</strong><small>AUTO SPA</small></span></a><p>Detailing automotriz premium en Hermosillo, Sonora.</p></div>
        <div><h2>Servicio a domicilio</h2><p>Hermosillo, Sonora, México</p></div>
        <div><h2>Horario</h2><p>Lunes a viernes · 9:00–18:00<br>Sábados · 9:00–15:00<br>Tardes de sábado y domingos: Solo urgencias con costo extra, acordado al contratar.</p></div>
        <div><h2>Contacto</h2><a data-whatsapp-direct href="#" target="_blank" rel="noopener noreferrer">WhatsApp ↗</a><a data-email-link href="#">joyautospamx@gmail.com</a><nav class="social-links" aria-label="Redes sociales"></nav></div>
        <div><h2>Legales</h2><a href="${new URL("assets/legal/AVISO_PRIVACIDAD_JOY_AUTO_SPA.pdf", siteRoot).href}" target="_blank" rel="noopener noreferrer">Aviso de Privacidad</a><a href="${new URL("assets/legal/TERMINOS_Y_CONDICIONES_JOY_AUTO_SPA.pdf", siteRoot).href}" target="_blank" rel="noopener noreferrer">Términos y Condiciones</a></div>
      </div>
      <div class="shell footer-bottom"><span>© <span data-year></span> JOY AUTO SPA. Todos los derechos reservados.</span><span>Hecho para cuidar lo que te mueve.</span></div>`;
    const socialContainer = footer.querySelector(".social-links");
    SITE_CONFIG.socials.forEach(({ label, text, url, logo }) => {
      const link = document.createElement("a");
      link.href = url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.setAttribute("aria-label", `${label} de JOY AUTO SPA`);

      if (logo) {
        const image = document.createElement("img");
        image.className = "social-logo";
        image.src = new URL(logo, siteRoot).href;
        image.alt = "";
        link.append(image);
      } else {
        link.textContent = text;
      }

      socialContainer.append(link);
    });
    mountPoint.replaceWith(footer);
  });
}

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
  const siteRoot = getSiteRoot();
  const logoSource = new URL(SITE_CONFIG.logo.src, siteRoot).href;
  document.querySelectorAll(".brand-mark").forEach((mark) => {
    mark.replaceChildren();
    const logoImage = document.createElement("img");
    logoImage.src = logoSource;
    logoImage.alt = SITE_CONFIG.logo.alt || "";
    logoImage.style.height = `${SITE_CONFIG.logo.height}px`;
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
      status.textContent = "Por favor completa los campos obligatorios y acepta los documentos legales.";
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

  const items = [...document.querySelectorAll("[data-gallery-item]")];
  const storyImage = document.querySelector("[data-story-image]");
  const dialogNavigation = [...dialog.querySelectorAll("[data-dialog-prev], [data-dialog-next]")];
  let activeIndex = 0;
  let showingStoryImage = false;

  const showItem = (index) => {
    showingStoryImage = false;
    dialogNavigation.forEach((button) => { button.hidden = false; });
    activeIndex = (index + items.length) % items.length;
    const item = items[activeIndex];
    const source = item.querySelector("[data-media-slot]");
    dialogMedia.dataset.label = source?.dataset.label || "Detalle de galería";
    renderMediaSlot(dialogMedia, item.dataset.mediaKey);
  };

  items.forEach((item, index) => {
    item.addEventListener("click", () => {
      showItem(index);
      dialog.showModal();
    });
  });
  storyImage?.addEventListener("click", () => {
    showingStoryImage = true;
    dialogNavigation.forEach((button) => { button.hidden = true; });
    dialogMedia.dataset.label = storyImage.querySelector("[data-media-slot]")?.dataset.label || "Fotografía de Joy";
    renderMediaSlot(dialogMedia, "story");
    dialog.showModal();
  });
  dialog.querySelector("[data-dialog-prev]")?.addEventListener("click", () => showItem(activeIndex - 1));
  dialog.querySelector("[data-dialog-next]")?.addEventListener("click", () => showItem(activeIndex + 1));
  dialog.querySelector("[data-dialog-close]")?.addEventListener("click", () => dialog.close());
  dialog.addEventListener("close", () => {
    showingStoryImage = false;
    dialogNavigation.forEach((button) => { button.hidden = false; });
  });
  dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener("keydown", (event) => {
    if (showingStoryImage) return;
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showItem(activeIndex - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      showItem(activeIndex + 1);
    }
  });
}

function setupGalleryCarousel() {
  const track = document.querySelector("[data-gallery-track]");
  const previous = document.querySelector("[data-gallery-prev]");
  const next = document.querySelector("[data-gallery-next]");
  if (!track || !previous || !next) return;

  const updateControls = () => {
    previous.disabled = track.scrollLeft <= 0;
    next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 1;
  };
  previous.addEventListener("click", () => track.scrollBy({ left: -track.clientWidth * 0.8 }));
  next.addEventListener("click", () => track.scrollBy({ left: track.clientWidth * 0.8 }));
  track.addEventListener("scroll", updateControls, { passive: true });
  window.addEventListener("resize", updateControls);
  updateControls();
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
  renderSiteHeaders();
  renderSiteFooters();
  renderAllMedia();
  renderBrandLogo();
  configureContactLinks();
  setupNavigation();
  setupBookingForm();
  setupComparison();
  setupGallery();
  setupGalleryCarousel();
  setupServicePage();
  document.querySelectorAll("[data-year]").forEach((node) => { node.textContent = new Date().getFullYear(); });
});
