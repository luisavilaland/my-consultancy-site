// components/PerformanceAnalyzer.tsx
import { useState } from 'react';

// Helper para determinar el color del score (verde, amarillo, rojo)
const getScoreColor = (score: number | undefined) => {
  if (score === undefined) return 'text-gray-600';
  if (score >= 0.9) return 'text-green-600'; // 90-100
  if (score >= 0.5) return 'text-orange-600'; // 50-89
  return 'text-red-600'; // 0-49
};

const PerformanceAnalyzer = () => {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any>(null); // Type 'any' for simplicity, could be more specific
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!url.trim()) {
      setError('Por favor, ingresa una URL válida.');
      return;
    }
    
    setIsLoading(true);
    setResults(null); // Clear previous results
    setError(null);   // Clear previous errors

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al analizar el sitio web.');
      }

      const data = await response.json();
      setResults(data.results); 

    } catch (err: any) {
      console.error('Error en el frontend al procesar la solicitud:', err);
      setError(err.message || 'Ocurrió un error inesperado al analizar. Inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  // Función para renderizar una métrica (ej. FCP, LCP) con su valor y color
  const renderMetric = (auditName: string, title: string, unit: string = '') => {
    if (!results || !results.lighthouseResult?.audits?.[auditName]) return null;
    const audit = results.lighthouseResult.audits[auditName];
    const displayValue = audit.displayValue;
    const score = audit.score; // Score de 0 a 1

    let colorClass = 'text-gray-700';
    if (score !== undefined) {
      if (score >= 0.9) colorClass = 'text-green-600';
      else if (score >= 0.5) colorClass = 'text-orange-600';
      else colorClass = 'text-red-600';
    }

    return (
      <p className="mb-1 text-lg">
        <strong className={colorClass}>{title}:</strong> {displayValue} {unit}
      </p>
    );
  };

  // Función para obtener sugerencias de auditorías
  const getSuggestions = () => {
    if (!results || !results.lighthouseResult?.audits) return [];
    
    const audits = results.lighthouseResult.audits;
    const suggestions: string[] = [];

    // Iterar sobre las categorías o directamente sobre auditorías con un score bajo
    for (const key in audits) {
      const audit = audits[key];
      // Mostrar auditorías que tienen un score definido y que no pasaron (score < 0.9)
      // y que tienen un título que las describe.
      if (audit.score !== undefined && audit.score < 0.9 && audit.title && audit.description) {
        // Evitar algunas auditorías internas o muy técnicas si no se quieren detallar
        if (!audit.id.includes('metrics') && !audit.id.includes('diagnostics')) {
             suggestions.push(audit.title); // O incluso audit.description para más detalle
        }
      }
    }
    // O puedes filtrar por un subset de auditorías conocidas que son comunes:
    const commonFailingAudits = [
      'server-response-time', // Reducir el tiempo de respuesta inicial del servidor
      'uses-text-compression', // Habilitar compresión de texto
      'unminified-css', // Minificar CSS
      'unminified-javascript', // Minificar JavaScript
      'uses-optimized-images', // Optimizar imágenes
      'offscreen-images', // Retrasar imágenes fuera de pantalla
      'uses-long-cache-ttl', // Usar política de caché eficaz en recursos estáticos
      'mainthread-work-breakdown', // Reducir el trabajo del hilo principal
      'total-blocking-time', // Reducir el tiempo total de bloqueo
      'max-potential-fid', // Reducir el retardo de la primera entrada
      'render-blocking-resources', // Eliminar recursos que bloquean el renderizado
      'unused-css-rules', // Eliminar CSS no utilizado
      'unused-javascript', // Eliminar JavaScript no utilizado
      'viewport', // Asegurarse de que viewport esté configurado
      'legacy-javascript' // Evitar JavaScript heredado
    ];

    const specificSuggestions: string[] = [];
    for (const auditId of commonFailingAudits) {
      const audit = audits[auditId];
      if (audit && audit.score !== undefined && audit.score < 0.9 && audit.title) {
        specificSuggestions.push(audit.title);
      }
    }

    return Array.from(new Set(specificSuggestions)); // Eliminar duplicados
  };


  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Analiza el Rendimiento de tu Web
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Ingresa una URL para obtener un análisis básico de velocidad y rendimiento.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <input
            type="url" // Using 'url' type for better validation in some browsers
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Ej: https://tudominio.com"
            className="w-full sm:w-80 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            id="website-url-input" // Añadido id para accesibilidad
            name="website-url" // Añadido name para accesibilidad
          />
          <button
            onClick={handleAnalyze}
            disabled={isLoading || !url.trim()}
            className="w-full sm:w-auto px-6 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isLoading ? 'Analizando...' : 'Analizar Web'}
          </button>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
            <p>Error: {error}</p>
          </div>
        )}

        {results && (
          <div className="mt-8 text-left bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Resultados del Análisis</h3>
            
            {results.lighthouseResult?.categories?.performance?.score !== undefined && (
              <div className="mb-4">
                <p className={`text-3xl font-bold ${getScoreColor(results.lighthouseResult.categories.performance.score)}`}>
                  Rendimiento: {(results.lighthouseResult.categories.performance.score * 100).toFixed(0)} / 100
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div 
                    className={`h-2.5 rounded-full ${results.lighthouseResult.categories.performance.score >= 0.9 ? 'bg-green-500' : results.lighthouseResult.categories.performance.score >= 0.5 ? 'bg-orange-500' : 'bg-red-500'}`} 
                    style={{ width: `${(results.lighthouseResult.categories.performance.score * 100).toFixed(0)}%` }}
                  ></div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {renderMetric('first-contentful-paint', 'First Contentful Paint (FCP)', 's')}
              {renderMetric('largest-contentful-paint', 'Largest Contentful Paint (LCP)', 's')}
              {renderMetric('cumulative-layout-shift', 'Cumulative Layout Shift (CLS)', '')}
              {renderMetric('interactive', 'Time to Interactive (TTI)', 's')}
              {renderMetric('speed-index', 'Speed Index', 's')}
              {renderMetric('total-blocking-time', 'Total Blocking Time (TBT)', 'ms')}
            </div>

            {getSuggestions().length > 0 && (
              <div className="mt-6">
                <h4 className="text-xl font-semibold text-gray-800 mb-3">Sugerencias para Mejorar:</h4>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  {getSuggestions().map((suggestion, index) => (
                    <li key={index}>{suggestion}</li>
                  ))}
                </ul>
              </div>
            )}

            <p className="mt-6 text-sm text-gray-500">
              Para un análisis más detallado y completo, visita{' '}
              <a
                href={results.id && `https://pagespeed.web.dev/report?url=${encodeURIComponent(url)}&hl=es`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                el reporte completo en PageSpeed Insights
              </a>.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default PerformanceAnalyzer;