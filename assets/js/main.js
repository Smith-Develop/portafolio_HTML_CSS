// Smith Grisales · Portafolio — interacciones sin dependencias

const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.getElementById("nav-menu");

// Cabecera con fondo al hacer scroll
const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 12);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

// Menú móvil
const setMenu = (open) => {
  navMenu.classList.toggle("is-open", open);
  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  navToggle.querySelector("use").setAttribute("href", open ? "#i-close" : "#i-menu");
};
navToggle.addEventListener("click", () => setMenu(!navMenu.classList.contains("is-open")));
navMenu.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && navMenu.classList.contains("is-open")) {
    setMenu(false);
    navToggle.focus();
  }
});

// Enlace activo según la sección visible
const navLinks = [...document.querySelectorAll(".nav-links a")];
const sections = navLinks.map((a) => document.querySelector(a.getAttribute("href"))).filter(Boolean);
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((a) => a.classList.toggle("is-current", a.getAttribute("href") === `#${entry.target.id}`));
  });
}, { rootMargin: "-45% 0px -50% 0px" });
sections.forEach((s) => sectionObserver.observe(s));

// Animación de entrada
const revealObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("is-visible");
    obs.unobserve(entry.target);
  });
}, { rootMargin: "0px 0px -8% 0px" });
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

// Filtro de proyectos
const chips = document.querySelectorAll(".filters .chip");
const projects = document.querySelectorAll(".projects .project");
chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    const filter = chip.dataset.filter;
    chips.forEach((c) => {
      const active = c === chip;
      c.classList.toggle("is-active", active);
      c.setAttribute("aria-pressed", String(active));
    });
    projects.forEach((p) => {
      p.hidden = filter !== "all" && !p.dataset.cat.split(" ").includes(filter);
      if (!p.hidden) p.classList.add("is-visible");
    });
  });
});

// Copiar correo
document.querySelectorAll("[data-copy]").forEach((btn) => {
  btn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(btn.dataset.copy);
      btn.classList.add("is-done");
      btn.querySelector("use").setAttribute("href", "#i-check");
      btn.setAttribute("aria-label", "Correo copiado");
      setTimeout(() => {
        btn.classList.remove("is-done");
        btn.querySelector("use").setAttribute("href", "#i-copy");
        btn.setAttribute("aria-label", "Copiar correo");
      }, 2000);
    } catch {
      window.location.href = `mailto:${btn.dataset.copy}`;
    }
  });
});

// Formulario: compone el mensaje y lo abre en el correo o en WhatsApp
const form = document.getElementById("contact-form");
const status = form.querySelector(".form-status");
const EMAIL = "developers.smith@gmail.com";
const WHATSAPP = "34613203129";

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const fields = [...form.querySelectorAll("[required]")];
  let firstInvalid = null;
  fields.forEach((f) => {
    const valid = f.checkValidity() && f.value.trim() !== "";
    f.setAttribute("aria-invalid", String(!valid));
    if (!valid && !firstInvalid) firstInvalid = f;
  });
  if (firstInvalid) {
    status.textContent = "Revisa los campos marcados: nombre, un correo válido y tu mensaje.";
    status.classList.add("is-error");
    firstInvalid.focus();
    return;
  }

  const data = Object.fromEntries(new FormData(form));
  const body = `Hola Smith, soy ${data.nombre} (${data.correo}).\n\nMotivo: ${data.motivo}\n\n${data.mensaje}`;
  const channel = e.submitter?.dataset.channel || "email";
  const url = channel === "whatsapp"
    ? `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(body)}`
    : `mailto:${EMAIL}?subject=${encodeURIComponent(`${data.motivo} · ${data.nombre}`)}&body=${encodeURIComponent(body)}`;

  status.classList.remove("is-error");
  status.textContent = channel === "whatsapp"
    ? "Abriendo WhatsApp con tu mensaje listo para enviar…"
    : "Abriendo tu aplicación de correo con el mensaje listo para enviar…";
  if (channel === "whatsapp") window.open(url, "_blank", "noopener");
  else window.location.href = url;
});

form.addEventListener("input", (e) => {
  if (e.target.getAttribute("aria-invalid") === "true" && e.target.checkValidity()) {
    e.target.setAttribute("aria-invalid", "false");
  }
});

document.getElementById("year").textContent = new Date().getFullYear();
