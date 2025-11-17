import React, { useState } from 'react';
import './panel.css';
import { downloadReport } from '../../services/api';

const Panel: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);

  const handleDownload = async () => {
    setShowPasswordPrompt(true);
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== 'admin123456') {
      alert('Contraseña incorrecta. Por favor, inténtelo de nuevo.');
      return;
    }

    setShowPasswordPrompt(false);
    setLoading(true);

    try {
      await downloadReport('full'); // Download full report without period filter
      alert('Reporte completo descargado exitosamente');
      setPassword('');
    } catch (error) {
      console.error('Error downloading report:', error);
      alert('Error al descargar el reporte. Por favor, inténtelo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordCancel = () => {
    setShowPasswordPrompt(false);
    setPassword('');
  };

  return (
    <div className="panel-container">
      <div className="panel-card">
        <div className="panel-header">
          <img src="/campusWhite.png" alt="Logo" className="panel-logo" />
        </div>
        <div className="panel-content">
          <h2>Reporte Completo</h2>
          <p>Descargar todos los registros de la base de datos</p>
          <button
            className="download-btn"
            disabled={loading}
            onClick={handleDownload}
          >
            {loading ? 'Descargando...' : 'Descargar Reporte Completo'}
          </button>
        </div>
      </div>

      {showPasswordPrompt && (
        <div className="password-modal-overlay">
          <div className="password-modal">
            <h3>Confirmar Descarga</h3>
            <p>Ingrese la contraseña para descargar el reporte:</p>
            <form onSubmit={handlePasswordSubmit}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                className="password-input"
                autoFocus
              />
              <div className="modal-buttons">
                <button type="button" onClick={handlePasswordCancel} className="cancel-btn">
                  Cancelar
                </button>
                <button type="submit" className="confirm-btn">
                  Confirmar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Panel;