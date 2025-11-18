import axios from 'axios';

const API_BASE_URL = (import.meta as any).env.VITE_API_URL || 'https://wl8c8h8m-3002.use2.devtunnels.ms/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'form-data',
  },
  timeout: 10000, // 10 second timeout
  withCredentials: false, // Disable credentials for CORS
});

export const submitViatico = async (data: any) => {
  try {
    console.log('Submitting to:', API_BASE_URL + '/form');
    console.log('Data:', data);
    const response = await api.post('/form', data);
    console.log('Response:', response);
    return response.data;
  } catch (error: any) {
    console.error('Error submitting viatico:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      response: error.response,
      config: error.config
    });

    // Provide more specific error messages
    if (error.code === 'ECONNREFUSED') {
      throw new Error('No se puede conectar al servidor. Verifica que el backend esté ejecutándose.');
    } else if (error.code === 'ENOTFOUND') {
      throw new Error('URL del servidor no encontrada. Verifica la configuración de la API.');
    } else if (error.response) {
      console.error('Backend response:', error.response.data);
      const errorMessage = error.response.data?.message || error.response.data?.error || error.response.statusText;
      throw new Error(`Error del servidor: ${error.response.status} - ${errorMessage}`);
    } else if (error.request) {
      throw new Error('No se recibió respuesta del servidor. Verifica la conexión a internet.');
    } else {
      throw error;
    }
  }
};

export const downloadReport = async (period: string) => {
  try {
    console.log('Downloading from:', API_BASE_URL + `/document`);

    // CORRECCIÓN: Configurar responseType en el axios call, no en el body
    const response = await api.post(`/document`,
      { period }, // Enviar el periodo en el body si es necesario
      {
        responseType: 'blob', // Configurar aquí, no en el body
        timeout: 30000, // Aumentar timeout para archivos grandes
      }
    );

    console.log('Download response received, status:', response.status);
    console.log('Content type:', response.headers['content-type']);
    console.log('Content length:', response.headers['content-length']);

    // Verificar que sea un archivo Excel
    const contentType = response.headers['content-type'];
    if (!contentType || !contentType.includes('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
      console.error('ERROR: Content-Type incorrecto:', contentType);

      // Si es texto, intentar leer el error
      if (contentType?.includes('text/')) {
        const text = await new Response(response.data).text();
        console.error('Contenido de error:', text.substring(0, 500));
        throw new Error(`El servidor retornó un error: ${text.substring(0, 200)}`);
      }

      throw new Error(`Tipo de archivo no válido. Se esperaba Excel pero se recibió: ${contentType}`);
    }

    // Crear blob con el tipo correcto
    const blob = new Blob([response.data], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });

    // Verificar que el blob no esté vacío
    if (blob.size === 0) {
      throw new Error('El archivo recibido está vacío');
    }

    console.log('Blob size:', blob.size, 'bytes');

    // Crear URL y descargar
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `reporte_solicitudes_${period}.xlsx`);
    document.body.appendChild(link);
    link.click();

    // Limpiar
    setTimeout(() => {
      link.remove();
      window.URL.revokeObjectURL(url);
    }, 100);

    return true;
  } catch (error: any) {
    console.error('Error downloading report:', error);

    // Mensajes de error más específicos
    if (error.message.includes('Tipo de archivo no válido')) {
      throw error;
    } else if (error.message.includes('archivo recibido está vacío')) {
      throw error;
    } else if (error.code === 'ECONNREFUSED') {
      throw new Error('No se puede conectar al servidor. Verifica que el backend esté ejecutándose.');
    } else if (error.code === 'ENOTFOUND') {
      throw new Error('URL del servidor no encontrada. Verifica la configuración de la API.');
    } else if (error.response) {
      // Si el backend retorna un error HTTP
      const status = error.response.status;
      if (status === 404) {
        throw new Error('Endpoint no encontrado. Verifica la ruta del backend.');
      } else if (status === 500) {
        throw new Error('Error interno del servidor al generar el archivo.');
      } else {
        const errorMessage = error.response.data?.message || error.response.statusText;
        throw new Error(`Error del servidor: ${status} - ${errorMessage}`);
      }
    } else if (error.request) {
      throw new Error('No se recibió respuesta del servidor. Verifica la conexión a internet.');
    } else {
      throw error;
    }
  }
};

export default api;