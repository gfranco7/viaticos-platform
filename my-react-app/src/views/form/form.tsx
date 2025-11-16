import React, { useState } from 'react';
import './form.css'; // We'll create this CSS file

interface Concepto {
  item: string;
  fechaFactura: string;
  nit: string;
  nombreEmisor: string;
  concepto: string;
  noFactura: string;
  observaciones: string;
  valor: number;
  soporte: string;
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleConceptChange = (index: number, field: keyof Concepto, value: string | number) => {
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
        valor: 0,
        soporte: ''
      }]
    }));
  };

  const removeConcepto = (index: number) => {
    setFormData(prev => ({
      ...prev,
      conceptos: prev.conceptos.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    // TODO: Send to MongoDB when ready
    alert('Solicitud enviada (simulado)');
  };

  return (
    <div className="form-container">
      <h1>Solicitud de Viáticos</h1>
      <form onSubmit={handleSubmit} className="viatico-form">
        <div className="form-section">
          <h2>Información General</h2>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="tipoViatico">Tipo de Viático</label>
              <input type="text" id="tipoViatico" name="tipoViatico" value={formData.tipoViatico} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="lineaNegocio">Línea de Negocio</label>
              <input type="text" id="lineaNegocio" name="lineaNegocio" value={formData.lineaNegocio} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="zonaUbicacion">ZONA/UBICACIÓN</label>
              <input type="text" id="zonaUbicacion" name="zonaUbicacion" value={formData.zonaUbicacion} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="solicitante">Solicitante</label>
              <input type="text" id="solicitante" name="solicitante" value={formData.solicitante} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="centroCostos">Centro de Costos</label>
              <input type="text" id="centroCostos" name="centroCostos" value={formData.centroCostos} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="noAnticipo">No. Anticipo</label>
              <input type="text" id="noAnticipo" name="noAnticipo" value={formData.noAnticipo} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="cedulaCiudadania">Cédula Ciudadanía</label>
              <input type="text" id="cedulaCiudadania" name="cedulaCiudadania" value={formData.cedulaCiudadania} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="fechaInicio">Fecha Inicio</label>
              <input type="date" id="fechaInicio" name="fechaInicio" value={formData.fechaInicio} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="fechaFinal">Fecha Final</label>
              <input type="date" id="fechaFinal" name="fechaFinal" value={formData.fechaFinal} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="fechaSolicitud">Fecha Solicitud</label>
              <input type="date" id="fechaSolicitud" name="fechaSolicitud" value={formData.fechaSolicitud} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="ciudadOrigen">Ciudad Origen</label>
              <input type="text" id="ciudadOrigen" name="ciudadOrigen" value={formData.ciudadOrigen} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="ciudadDestino">Ciudad Destino</label>
              <input type="text" id="ciudadDestino" name="ciudadDestino" value={formData.ciudadDestino} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="actividadRealizar">Actividad a Realizar</label>
              <textarea id="actividadRealizar" name="actividadRealizar" value={formData.actividadRealizar} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="funcionarioConsignar">Funcionario a Consignar Dinero</label>
              <input type="text" id="funcionarioConsignar" name="funcionarioConsignar" value={formData.funcionarioConsignar} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="entidadBancaria">Entidad Bancaria</label>
              <input type="text" id="entidadBancaria" name="entidadBancaria" value={formData.entidadBancaria} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="tipoCuenta">Tipo de Cuenta</label>
              <select id="tipoCuenta" name="tipoCuenta" value={formData.tipoCuenta} onChange={handleInputChange} required>
                <option value="">Seleccionar</option>
                <option value="ahorros">Ahorros</option>
                <option value="corriente">Corriente</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="noCuenta">No. De Cuenta</label>
              <input type="text" id="noCuenta" name="noCuenta" value={formData.noCuenta} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="dineroEntregado">Dinero Entregado</label>
              <input type="number" id="dineroEntregado" name="dineroEntregado" value={formData.dineroEntregado} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="saldo">Saldo</label>
              <input type="number" id="saldo" name="saldo" value={formData.saldo} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="correoFuncionario">Correo Funcionario (Retroalimentación Recibida)</label>
              <input type="email" id="correoFuncionario" name="correoFuncionario" value={formData.correoFuncionario} onChange={handleInputChange} required />
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
            <div key={index} className="concepto-item">
              <h3>Concepto {index + 1}</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>ITEM</label>
                  <input type="text" value={concepto.item} onChange={(e) => handleConceptChange(index, 'item', e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>FECHA FACTURA</label>
                  <input type="date" value={concepto.fechaFactura} onChange={(e) => handleConceptChange(index, 'fechaFactura', e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>NIT</label>
                  <input type="text" value={concepto.nit} onChange={(e) => handleConceptChange(index, 'nit', e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>NOMBRE EMISOR</label>
                  <input type="text" value={concepto.nombreEmisor} onChange={(e) => handleConceptChange(index, 'nombreEmisor', e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>CONCEPTO</label>
                  <input type="text" value={concepto.concepto} onChange={(e) => handleConceptChange(index, 'concepto', e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>No. Factura</label>
                  <input type="text" value={concepto.noFactura} onChange={(e) => handleConceptChange(index, 'noFactura', e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Observaciones</label>
                  <textarea value={concepto.observaciones} onChange={(e) => handleConceptChange(index, 'observaciones', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Valor</label>
                  <input type="number" value={concepto.valor} onChange={(e) => handleConceptChange(index, 'valor', e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Soporte (Link Imagen)</label>
                  <input type="url" value={concepto.soporte} onChange={(e) => handleConceptChange(index, 'soporte', e.target.value)} />
                </div>
              </div>
              <button type="button" onClick={() => removeConcepto(index)} className="remove-btn">Eliminar Concepto</button>
            </div>
          ))}
          <button type="button" onClick={addConcepto} className="add-btn">Agregar Concepto</button>
        </div>

        <button type="submit" className="submit-btn">Enviar Solicitud</button>
      </form>
    </div>
  );
};

export default Form;