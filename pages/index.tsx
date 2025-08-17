// pages/index.tsx
import Head from "next/head";
import Link from "next/link";
import PerformanceAnalyzer from "../components/PerformanceAnalyzer"; // Asegúrate que la ruta sea correcta

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased">
      <Head>
        <title>
          Consultoría de Análisis de Datos y Rendimiento Web | Tu Nombre/Empresa
        </title>
        <meta
          name="description"
          content="Consultoría especializada en análisis de datos para eCommerce, rendimiento web (SEO, Core Web Vitals), Google Ads y Meta Ads. Optimiza tu presencia digital y maximiza tus resultados."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header/Navbar */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex-shrink-0">
            {/* Logo o Nombre de la Empresa */}
            <a href="#" className="text-2xl font-bold text-gray-900">
              [Tu Logo/Nombre Empresa]
            </a>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a
                href="#hero"
                className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Inicio
              </a>
              <a
                href="#services"
                className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Servicios
              </a>
              <a
                href="#about"
                className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Acerca de
              </a>
              <a
                href="#contact"
                className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Contacto
              </a>
            </div>
          </div>
          {/* Mobile menu button (para luego si implementas un menú responsivo) */}
          <div className="-mr-2 flex md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              {/* Icono de menú (ej. SVG de hamburguesa) */}
              <span className="sr-only">Abrir menú principal</span>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section
          id="hero"
          className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 px-4 sm:px-6 lg:px-8 text-center"
        >
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
              Transforma tus Datos en Crecimiento Real
            </h1>
            <p className="mt-6 text-xl sm:text-2xl font-light opacity-90">
              Análisis estratégico de datos, optimización de rendimiento web y
              gestión de campañas publicitarias para maximizar tu rentabilidad
              online.
            </p>
            <div className="mt-10">
              <a
                href="#contact"
                className="inline-block bg-white text-blue-700 px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:bg-gray-100 transition duration-300"
              >
                Agenda una Consulta Gratuita
              </a>
            </div>
          </div>
        </section>

        {/* Sección del Analizador de Rendimiento */}
        <section id="analyzer" className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
              Evalúa la Salud de tu Sitio Web
            </h2>
            <PerformanceAnalyzer />
          </div>
        </section>

        {/* Sección de Servicios */}
        <section id="services" className="py-16 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-12">
              Nuestros Servicios Especializados
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {/* Servicio 1: Análisis de Datos eCommerce */}
              <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Análisis de Datos eCommerce
                </h3>
                <p className="text-gray-600">
                  Convertimos tus datos de ventas en estrategias accionables.
                  Identificamos KPIs clave, optimizamos embudos de conversión, y
                  aplicamos segmentación avanzada para aumentar tu facturación.
                </p>
                <ul className="mt-4 text-left text-gray-700 list-disc list-inside">
                  <li>Dashboard de Rendimiento Personalizado</li>
                  <li>Identificación de Patrones de Compra</li>
                  <li>Optimización de Tasas de Conversión</li>
                  <li>Análisis de Clientes y Fidelización</li>
                </ul>
              </div>

              {/* Servicio 2: Análisis Web General y SEO Técnico */}
              <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Análisis Web y SEO Técnico
                </h3>
                <p className="text-gray-600">
                  Mejora la experiencia de usuario y la visibilidad de tu sitio
                  en buscadores. Nos enfocamos en Core Web Vitals, arquitectura
                  de la información, y optimización para rastreadores.
                </p>
                <ul className="mt-4 text-left text-gray-700 list-disc list-inside">
                  <li>
                    Auditorías de Rendimiento (con herramientas como PageSpeed
                    Insights)
                  </li>
                  <li>Optimización de la Velocidad de Carga</li>
                  <li>Estructura Web y Usabilidad (UX)</li>
                  <li>Recomendaciones de SEO On-Page y Técnico</li>
                </ul>
              </div>

              {/* Servicio 3: Gestión de Google Ads */}
              <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Gestión Estratégica de Google Ads
                </h3>
                <p className="text-gray-600">
                  Campañas de búsqueda, display y shopping que generan ROI
                  positivo. Análisis de palabras clave, optimización de pujas y
                  reportes transparentes.
                </p>
                <ul className="mt-4 text-left text-gray-700 list-disc list-inside">
                  <li>Investigación de Palabras Clave de Alto Valor</li>
                  <li>Optimización de Anuncios y Landing Pages</li>
                  <li>Estrategias de Pujas Avanzadas</li>
                  <li>Reportes de Rendimiento Detallados</li>
                </ul>
              </div>

              {/* Servicio 4: Gestión de Meta Ads (Facebook/Instagram) */}
              <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Gestión de Meta Ads (Facebook/Instagram)
                </h3>
                <p className="text-gray-600">
                  Diseño y ejecución de campañas en Facebook e Instagram para
                  alcanzar a tu audiencia ideal, aumentar la notoriedad de marca
                  y las conversiones.
                </p>
                <ul className="mt-4 text-left text-gray-700 list-disc list-inside">
                  <li>Segmentación de Audiencias Precisa</li>
                  <li>Creación de Creativos Efectivos</li>
                  <li>Campañas de Retargeting</li>
                  <li>Análisis de Métricas de Redes Sociales</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Sección "Sobre Mí" o "Acerca de" */}
        <section id="about" className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-8">
              Acerca de [Tu Nombre/Empresa]
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Soy [Tu Nombre], un [tu profesión/rol clave, ej. consultor de
              marketing digital, analista de datos] apasionado por ayudar a
              empresas a [tu misión principal, ej. desentrañar el valor de sus
              datos y optimizar su presencia online]. Con [X años] de
              experiencia en [áreas clave, ej. análisis web, performance
              marketing], mi objetivo es ofrecer soluciones personalizadas que
              impulsen el crecimiento y la rentabilidad. Mi enfoque se basa en
              datos concretos y estrategias probadas para asegurar resultados
              medibles.
            </p>
            {/* Puedes añadir una foto tuya o un logo aquí */}
          </div>
        </section>

        {/* Sección de Contacto */}
        <section id="contact" className="py-16 bg-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-8">
              Contacta para una Consulta
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              ¿Listo para llevar tu negocio al siguiente nivel? Contáctame hoy
              mismo para discutir cómo puedo ayudarte a alcanzar tus objetivos
              digitales.
            </p>
            <div className="bg-white p-8 rounded-lg shadow-md max-w-lg mx-auto">
              {/* Formulario de Contacto (Placeholder por ahora) */}
              <form
                className="space-y-4"
                onSubmit={async (e) => {
                  e.preventDefault();
                  const form = e.target as HTMLFormElement;
                  const name = (
                    form.elements.namedItem("name") as HTMLInputElement
                  ).value;
                  const email = (
                    form.elements.namedItem("email") as HTMLInputElement
                  ).value;
                  const message = (
                    form.elements.namedItem("message") as HTMLTextAreaElement
                  ).value;

                  const res = await fetch("/api/users", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name, email, message }),
                  });

                  if (res.ok) {
                    alert("Gracias, tu mensaje fue enviado correctamente.");
                    form.reset();
                  } else {
                    alert("Hubo un error al enviar el mensaje.");
                  }
                }}
              >
                <div>
                  <label htmlFor="name" className="sr-only">
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Tu Nombre"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Tu Correo Electrónico"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="sr-only">
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Tu Mensaje"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-blue-700 transition duration-300"
                >
                  Enviar Mensaje
                </button>
              </form>
              <p className="mt-4 text-sm text-gray-500">
                También puedes contactarme directamente en: <br />
                Email:{" "}
                <a
                  href="mailto:tu_correo@ejemplo.com"
                  className="text-blue-600 hover:underline"
                >
                  tu_correo@ejemplo.com
                </a>{" "}
                | Tel:{" "}
                <a
                  href="tel:+5989xxxxxxx"
                  className="text-blue-600 hover:underline"
                >
                  +598 9xxxxxxx
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p>
            &copy; {new Date().getFullYear()} [Tu Nombre/Empresa]. Todos los
            derechos reservados.
          </p>
          <div className="mt-4 space-x-4">
            {/* Íconos de redes sociales (ej. LinkedIn) */}
            <a href="#" className="text-gray-400 hover:text-white">
              LinkedIn
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              Twitter
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
