import axios from 'axios';

const API_BASE_URL = (import.meta as any).env.VITE_API_URL || 'https://wl8c8h8m-3002.use2.devtunnels.ms/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
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
    const response = await api.post(`/document`, {
      responseType: 'blob' // Important for file downloads
    });

    console.log('Download response received, size:', response.data.size);
    console.log('Content type:', response.headers['content-type']);

    // Check if we actually got an Excel file or HTML error
    if (response.headers['content-type']?.includes('text/html')) {
      console.error('ERROR: Backend returned HTML instead of Excel!');
      const textContent = await response.data;
      console.log('HTML content received:', textContent);
      throw new Error('El backend retornó HTML en lugar de un archivo Excel. Revisa la implementación del endpoint.');
    }

    // Create a blob URL and trigger download
    const url = window.URL.createObjectURL(new Blob([response.data], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    }));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `reporte_solicitudes_${period}.xlsx`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);

    return response.data;
  } catch (error: any) {
    console.error('Error downloading report:', error);
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
      console.error('Backend response data:', error.response.data);
      const errorMessage = error.response.data?.message || error.response.data?.error || error.response.statusText;
      throw new Error(`Error del servidor: ${error.response.status} - ${errorMessage}`);
    } else if (error.request) {
      throw new Error('No se recibió respuesta del servidor. Verifica la conexión a internet.');
    } else {
      throw error;
    }
  }
};

export default api;