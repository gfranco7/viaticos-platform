import React, { useState, useEffect } from 'react';
import './form.css';
import { submitViatico } from '../../services/api';

interface Concepto {
  item: string;
  fechaFactura: string;
  nit: string;
  nombreEmisor: string;
  concepto: string;
  noFactura: string;
  observaciones: string;
  valor: string;
  soporte: File | null;
}

interface ViaticoForm {
  tipoViatico: string;
  lineaNegocio: string;
  zonaUbicacion: string;
  solicitante: string;
  centroCostos: string;
  noAnticipo: string;
  cedulaCiudadania: string;
  fechaInicio: string;
  fechaFinal: string;
  fechaSolicitud: string;
  ciudadOrigen: string;
  ciudadDestino: string;
  actividadRealizar: string;
  funcionarioConsignar: string;
  entidadBancaria: string;
  tipoCuenta: string;
  noCuenta: string;
  dineroEntregado: number;
  saldo: number;
  correoFuncionario: string;
  observaciones: string;
  conceptos: Concepto[];
}

const Form: React.FC = () => {
  const [formData, setFormData] = useState<ViaticoForm>({
    tipoViatico: '',
    lineaNegocio: '',
    zonaUbicacion: '',
    solicitante: '',
    centroCostos: '',
    noAnticipo: '',
    cedulaCiudadania: '',
    fechaInicio: '',
    fechaFinal: '',
    fechaSolicitud: '',
    ciudadOrigen: '',
    ciudadDestino: '',
    actividadRealizar: '',
    funcionarioConsignar: '',
    entidadBancaria: '',
    tipoCuenta: '',
    noCuenta: '',
    dineroEntregado: 0,
    saldo: 0,
    correoFuncionario: '',
    observaciones: '',
    conceptos: []
  });

  const [calculatedSaldo, setCalculatedSaldo] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const totalConceptos = formData.conceptos.reduce((sum, concepto) => sum + (Number(concepto.valor) || 0), 0);
    const saldo = formData.dineroEntregado - totalConceptos;
    setCalculatedSaldo(saldo);
    setFormData(prev => ({ ...prev, saldo }));
  }, [formData.dineroEntregado, formData.conceptos]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let processedValue = value;
    if (name === 'cedulaCiudadania' || name === 'noCuenta') {
      processedValue = value.replace(/\D/g, '');
    }
    setFormData(prev => ({
      ...prev,
      [name]: processedValue
    }));
  };

  const handleConceptChange = (index: number, field: keyof Concepto, value: string | number | File | null) => {
    const updatedConceptos = [...formData.conceptos];
    updatedConceptos[index] = { ...updatedConceptos[index], [field]: value };
    setFormData(prev => ({ ...prev, conceptos: updatedConceptos }));
  };

  const addConcepto = () => {
    setFormData(prev => ({
      ...prev,
      conceptos: [...prev.conceptos, {
        item: '',
        fechaFactura: '',
        nit: '',
        nombreEmisor: '',
        concepto: '',
        noFactura: '',
        observaciones: '',
        valor: '',
        soporte: null
      }]
    }));
  };

  const removeConcepto = (index: number) => {
    setFormData(prev => ({
      ...prev,
      conceptos: prev.conceptos.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const dataToSend = {
        ...formData,
        conceptos: formData.conceptos.map(concepto => ({
          ...concepto,
          soporte: concepto.soporte ? concepto.soporte.name : null
        }))
      };
      await submitViatico(dataToSend);
      alert('Solicitud enviada exitosamente');
    } catch (err) {
      setError('Error al enviar la solicitud');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h1>Solicitud de Viáticos</h1>
        <img src="/campusWhite.png" alt="Logo" className="header-logo" />
      </div>
      <form onSubmit={handleSubmit} className="viatico-form">
        <div className="form-section">
          <h2>Información General</h2>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="tipoViatico">Tipo de Viático</label>
              <select id="tipoViatico" name="tipoViatico" value={formData.tipoViatico} onChange={handleInputChange}>
                <option value="">Seleccionar</option>
                <option value="Relaciones Públicas">Relaciones Públicas</option>
                <option value="Gestión comercial">Gestión comercial</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="lineaNegocio">Línea de Negocio</label>
              <input type="text" id="lineaNegocio" name="lineaNegocio" value={formData.lineaNegocio} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="zonaUbicacion">ZONA/UBICACIÓN</label>
              <input type="text" id="zonaUbicacion" name="zonaUbicacion" value={formData.zonaUbicacion} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="solicitante">Solicitante</label>
              <input type="text" id="solicitante" name="solicitante" value={formData.solicitante} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="centroCostos">Centro de Costos</label>
              <input type="text" id="centroCostos" name="centroCostos" value={formData.centroCostos} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="noAnticipo">No. Anticipo</label>
              <input type="text" id="noAnticipo" name="noAnticipo" value={formData.noAnticipo} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="cedulaCiudadania">Cédula Ciudadanía</label>
              <input type="text" id="cedulaCiudadania" name="cedulaCiudadania" value={formData.cedulaCiudadania} onChange={handleInputChange} maxLength={11} />
            </div>
            <div className="form-group">
              <label htmlFor="fechaInicio">Fecha Inicio</label>
              <input type="date" id="fechaInicio" name="fechaInicio" value={formData.fechaInicio} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="fechaFinal">Fecha Final</label>
              <input type="date" id="fechaFinal" name="fechaFinal" value={formData.fechaFinal} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="fechaSolicitud">Fecha Solicitud</label>
              <input type="date" id="fechaSolicitud" name="fechaSolicitud" value={formData.fechaSolicitud} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="ciudadOrigen">Ciudad Origen</label>
              <input type="text" id="ciudadOrigen" name="ciudadOrigen" value={formData.ciudadOrigen} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="ciudadDestino">Ciudad Destino</label>
              <input type="text" id="ciudadDestino" name="ciudadDestino" value={formData.ciudadDestino} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="actividadRealizar">Actividad a Realizar</label>
              <textarea id="actividadRealizar" name="actividadRealizar" value={formData.actividadRealizar} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="funcionarioConsignar">Funcionario a Consignar Dinero</label>
              <input type="text" id="funcionarioConsignar" name="funcionarioConsignar" value={formData.funcionarioConsignar} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="entidadBancaria">Entidad Bancaria</label>
              <input type="text" id="entidadBancaria" name="entidadBancaria" value={formData.entidadBancaria} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="tipoCuenta">Tipo de Cuenta</label>
              <select id="tipoCuenta" name="tipoCuenta" value={formData.tipoCuenta} onChange={handleInputChange}>
                <option value="">Seleccionar</option>
                <option value="ahorros">Ahorros</option>
                <option value="corriente">Corriente</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="noCuenta">No. De Cuenta</label>
              <input type="text" id="noCuenta" name="noCuenta" value={formData.noCuenta} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="correoFuncionario">Correo Funcionario</label>
              <input type="email" id="correoFuncionario" name="correoFuncionario" value={formData.correoFuncionario} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="dineroEntregado">Dinero Entregado</label>
              <input type="number" id="dineroEntregado" name="dineroEntregado" value={formData.dineroEntregado} onChange={handleInputChange} onWheel={(e) => (e.target as HTMLInputElement).blur()} />
            </div>
            <div className="form-group">
              <label htmlFor="saldo">Saldo</label>
              <div className="saldo-display" id="saldo" data-negative={calculatedSaldo < 0 ? "true" : "false"}>
                ${calculatedSaldo.toLocaleString()}
              </div>
            </div>
            <div className="form-group full-width">
              <label htmlFor="observaciones">Observaciones</label>
              <textarea id="observaciones" name="observaciones" value={formData.observaciones} onChange={handleInputChange} />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2>Conceptos</h2>
          {formData.conceptos.map((concepto, index) => (
            <details key={index} className="concepto-item">
              <summary>Concepto {index + 1}</summary>
              <div className="form-grid">
                <div className="form-group">
                  <label>ITEM</label>
                  <input type="text" value={concepto.item} onChange={(e) => handleConceptChange(index, 'item', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>FECHA FACTURA</label>
                  <input type="date" value={concepto.fechaFactura} onChange={(e) => handleConceptChange(index, 'fechaFactura', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>NIT</label>
                  <input type="text" value={concepto.nit} onChange={(e) => handleConceptChange(index, 'nit', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>NOMBRE EMISOR</label>
                  <input type="text" value={concepto.nombreEmisor} onChange={(e) => handleConceptChange(index, 'nombreEmisor', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>CONCEPTO</label>
                  <input type="text" value={concepto.concepto} onChange={(e) => handleConceptChange(index, 'concepto', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>No. Factura</label>
                  <input type="text" value={concepto.noFactura} onChange={(e) => handleConceptChange(index, 'noFactura', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Observaciones</label>
                  <textarea value={concepto.observaciones} onChange={(e) => handleConceptChange(index, 'observaciones', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Valor</label>
                  <input type="number" value={concepto.valor} onChange={(e) => handleConceptChange(index, 'valor', e.target.value)} onWheel={(e) => (e.target as HTMLInputElement).blur()} />
                </div>
                <div className="form-group">
                  <label>Soporte (Imagen)</label>
                  <label htmlFor={`soporte-${index}`} className="file-label" style={{background: concepto.soporte ? 'darkgreen' : undefined}}>{concepto.soporte ? "Soporte Cargado" : "Seleccionar Imagen"}</label>
                  <input type="file" id={`soporte-${index}`} accept="image/*" onChange={(e) => handleConceptChange(index, 'soporte', e.target.files ? e.target.files[0] : null)} style={{display: 'none'}} />
                  {concepto.soporte && <p style={{color: 'blue', marginTop: '0.5rem'}}>{concepto.soporte.name}</p>}
                </div>
              </div>
              <button type="button" onClick={() => removeConcepto(index)} className="remove-btn">Eliminar Concepto</button>
            </details>
          ))}
          <button type="button" onClick={addConcepto} className="add-btn">Agregar Concepto</button>
        </div>

        {error && <p style={{color: 'red', textAlign: 'center'}}>{error}</p>}
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Enviando...' : 'Enviar Solicitud'}
        </button>
      </form>
    </div>
  );
};

export default Form;