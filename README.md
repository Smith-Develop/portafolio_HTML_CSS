# Smith Grisales · Portafolio

Portafolio y web de servicios de **Smith Grisales**, desarrollador Full Stack en Madrid.

**Demo:** https://smith-develop.github.io/portafolio_HTML_CSS/

HTML, CSS y JavaScript sin dependencias ni paso de compilación: carga rápido y se publica tal cual en GitHub Pages.

## Estructura

```
index.html            Página única: hero, proyectos, servicios, stack, trayectoria, FAQ y contacto
404.html              Página de error
assets/css/styles.css Estilos (tokens de color en :root)
assets/js/main.js     Menú móvil, filtro de proyectos, animaciones y formulario
assets/img/           Foto, imagen para redes (og-image.jpg) e iconos
assets/projects/      Capturas de proyectos
robots.txt, sitemap.xml, site.webmanifest, favicon.ico
```

## Probar en local

```bash
python3 -m http.server 8000
# http://localhost:8000
```

## Publicar en GitHub Pages

La web se publica desde la rama `master` de este repositorio (**Settings → Pages → Deploy from a branch**, carpeta `/ (root)`). Cada `git push` a `master` la actualiza en un par de minutos.

> Si más adelante usas un dominio propio, sustituye `https://smith-develop.github.io/portafolio_HTML_CSS/` en `index.html`, `robots.txt` y `sitemap.xml`, y cambia las rutas `/portafolio_HTML_CSS/` de `404.html`.

## Posicionamiento en Google (pendiente tras publicar)

Lo que ya está hecho en el código:

- Título y descripción con las búsquedas objetivo («desarrollador web Full Stack en Madrid», «aplicaciones web a medida», «TPV para restaurantes»…).
- Datos estructurados JSON-LD: `Person`, `ProfessionalService` (con zona de servicio Madrid, España y Colombia), `WebSite` y `FAQPage`.
- Open Graph y Twitter Card con imagen propia para que el enlace se vea bien en LinkedIn y WhatsApp.
- `sitemap.xml`, `robots.txt`, URL canónica, HTML semántico y accesible, imágenes WebP con tamaño fijo y carga diferida.

Lo que tienes que hacer tú (son lo que más pesa para salir en Google):

1. **Google Search Console**: añade la propiedad, verifícala y envía `sitemap.xml`. Después pide la indexación de la portada.
2. **Perfil de Empresa en Google** (Google Business Profile) como «Desarrollador de software» en Madrid, con enlace a esta web. Es lo que te hace aparecer en Maps y en búsquedas locales.
3. **Dominio propio** (por ejemplo `smithgrisales.dev`): da más confianza a clientes y ayuda al SEO. GitHub Pages lo admite gratis con HTTPS.
4. **Enlaces**: pon la URL en LinkedIn, en el README de tu perfil de GitHub y en los README de tus proyectos.
5. Pide **reseñas** en Google a tus clientes.

## Personalizar

- Colores: variables al inicio de `assets/css/styles.css`.
- Proyectos: cada tarjeta es un `<article class="project">` en `index.html`; el atributo `data-cat` (`saas`, `apps`, `tools`, `mobile`) controla el filtro.
- Al añadir contenido, actualiza `<lastmod>` en `sitemap.xml`.
