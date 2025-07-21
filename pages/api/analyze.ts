// pages/api/analyze.ts
import type { NextApiRequest, NextApiResponse } from 'next';

// Definimos un tipo para la respuesta de la API, esto ayuda a la autocompletado y a prevenir errores.
// Puedes hacerlo más específico si quieres, pero 'any' es suficiente para empezar.
type PageSpeedResponse = {
  message?: string;
  error?: string;
  results?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PageSpeedResponse> // Usamos el tipo definido
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'Falta la URL para analizar' });
  }

  // **Validación de URL:** Asegúrate de que la URL sea válida antes de intentar hacer la llamada.
  try {
    new URL(url); // Esto lanzará un error si la URL no es válida
  } catch (e) {
    return res.status(400).json({ error: 'URL inválida. Asegúrate de incluir http:// o https://' });
  }

  // **Acceso a la Variable de Entorno:**
  // Asegúrate de que el nombre de la variable de entorno coincida exactamente con lo que pusiste en .env.local
  const API_KEY = process.env.GOOGLE_PAGESPEED_API_KEY;

  if (!API_KEY) {
    // Si la clave no está configurada, esto significa un error en el servidor.
    // En desarrollo, esto te ayudará a depurar. En producción, asegúrate de haberla configurado en Vercel.
    console.error("GOOGLE_PAGESPEED_API_KEY no está configurada en las variables de entorno.");
    return res.status(500).json({ error: 'Error de configuración del servidor. Falta la clave de API de PageSpeed.' });
  }

  // Construye la URL para la API de PageSpeed Insights
  // `encodeURIComponent` es importante para manejar URLs con caracteres especiales
  // `strategy=desktop` es un parámetro común, puedes cambiarlo a `mobile` o eliminarlo si quieres ambos
  const PAGE_SPEED_API_URL = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&key=${API_KEY}&strategy=desktop`;

  try {
    // Realiza la solicitud a la API de Google PageSpeed Insights
    const response = await fetch(PAGE_SPEED_API_URL);

    // Verifica si la respuesta de la API fue exitosa
    if (!response.ok) {
      const errorData = await response.json(); // Intenta leer el mensaje de error de Google
      console.error('Error al llamar a PageSpeed Insights API:', errorData);
      // Retorna un error con el mensaje de Google si está disponible, o un mensaje genérico.
      return res.status(response.status).json({ error: errorData.error?.message || 'Error al obtener datos de PageSpeed Insights' });
    }

    // Si la respuesta fue exitosa, parsea el JSON
    const data = await response.json();

    // Envía los resultados de la API de PageSpeed Insights de vuelta al frontend
    res.status(200).json({ results: data });

  } catch (error) {
    // Captura cualquier error que ocurra durante la solicitud (ej. problemas de red)
    console.error('Error en el backend al procesar la solicitud:', error);
    res.status(500).json({ error: 'Error interno del servidor al intentar analizar la URL.' });
  }
}