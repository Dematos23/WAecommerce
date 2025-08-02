# **App Name**: Kima

## Core Features:

- Product Catalog: Display products organized by categories in a grid layout, showing image, name, price, description, and 'Add to cart' button.
- Shopping Cart: Display a persistent cart icon/link with the number of items. Show a list of selected products with name, quantity, and subtotal. Include a 'Finalize order' button and an automatically calculated subtotal.
- Simplified Checkout: Upon clicking 'Finalize order,' present a form for Name, Telephone, optional Delivery Address, and Additional Notes. Provide a 'Send order via WhatsApp' button that redirects to WhatsApp with order details and customer information.
- Homepage Configuration: The 'Homepage' has a Hero section, a brief welcome message from the JSON configuration file, a list of featured products and a direct call-to-action to the product catalog
- JSON Configuration: Load general site configuration, menus, text content, and contact information from JSON files in the /lib directory, including CSS variables for easy customization.
- variables CSS definidas en el archivo de configuración JSON: variables CSS definidas en el archivo de configuración JSON:
  - --color-primario
  - --color-secundario
  - --color-fondo
  - --color-texto
  - --font-family
  - --margin-base
  - --padding-base
  - --border-radius
  - --heading-size
  - --paragraph-size
- Archivo JSON en la carpeta /lib que centralice toda la configuración de la app, incluyendo: Archivo JSON en la carpeta /lib que centralice toda la configuración de la app, incluyendo:
  - **variablesCss:** { colorPrimario, colorSecundario, colorFondo, colorTexto, fontFamily, marginBase, paddingBase, borderRadius, headingSize, paragraphSize }
  - **menus:** lista de objetos con { titulo: string, enlace: string }
  - **titulos:** { homepageHero, catalogo, carrito, checkout, sobreNosotros, contacto }
  - **textos:** { mensajeBienvenida, pieDePagina, instruccionesCheckout, descripcionHomepage, descripcionSobreNosotros, infoContacto }
  - **contacto:** { telefono, correo, direccion, horarioAtencion }
  - **configuracionGeneral:** { numeroWhatsApp, logoUrl, eslogan }
- AI Product Description Generation: Use a tool to create product descriptions based on the product name and other available attributes, if some of these attributes are missing.
- Backend y manejo de datos: Imágenes en carpeta /public, nombradas con el ID del producto.
  - **Productos:** en JSON: { id, nombre, descripcion, precio, categoria, imagen }
  - **Pedidos:** en JSON: { id, cliente, productos, subtotal, estado, fecha }
  - Panel admin protegido por contraseña:
    - CRUD de productos.
    - Lista de pedidos con filtro por estado.
    - Actualización de estado de pedido.
    - Exportación de pedidos a CSV.

## Style Guidelines:

- Primary color: Soft Blue (#A0D2EB) to convey trust and tranquility, commonly associated with commercial activities.
- Background color: Light gray (#F0F4F8), subtly desaturated, to ensure readability and contrast with other elements.
- Accent color: Light Violet (#B4A0EB), analogous to blue, providing contrast to highlight key interactive elements and CTAs.
- Body and headline font: 'Inter' (sans-serif) for a modern and neutral feel, which renders very well on screens.
- Note: currently only Google Fonts are supported.
- Card-based layout for products in the catalog, offering a clean and structured presentation.
- Simple and clear icons for navigation, cart, and other UI elements, enhancing usability.