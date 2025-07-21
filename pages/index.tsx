import { NextPage } from 'next'
import Head from 'next/head'
import PerformanceAnalyzer from '@/components/PerformanceAnalyzer';

const Home: NextPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Análisis Data | Consultoría eCommerce & Ads</title>
        <meta name="description" content="Optimización de rendimiento web y gestión de campañas digitales" />
      </Head>

      {/* Header/Navbar */}
      <header className="bg-indigo-700 text-white py-6 shadow-md">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold">DataConsult</h1>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Potencia tu eCommerce con Data Science</h2>
          <p className="text-xl mb-8">Análisis de rendimiento web + Gestión inteligente de Google/Meta Ads</p>
        </div>
      </section>

      {/* Analyzer Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-semibold mb-6 text-gray-800">Analizador de Rendimiento Web</h3>
          <PerformanceAnalyzer />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} DataConsult - Todos los derechos reservados</p>
        </div>
      </footer>
    </div>
  )
}

export default Home