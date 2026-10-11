import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Edit,
  Trash2,
  Plus,
  Building2,
} from 'lucide-react';
import nosotrosSeed from './nosotrosData';
import { nosotrosApi } from '../services/api';
import ImageUploader from '../ImageUploader/ImageUploader';
import SidePanel from '../SidePanel/SidePanel';
import logoZoom from '../../../Zoomtv2.0respaldo/src/assets/images/logoZoomtv.png';
import historiaImg from '../../../Zoomtv2.0respaldo/src/assets/images/chatbot_logo.png';
import misionImg from '../../../Zoomtv2.0respaldo/src/assets/images/profesional3.jpg';
import visionImg from '../../../Zoomtv2.0respaldo/src/assets/images/profesional5.jpg';
import equipoImg from '../../../Zoomtv2.0respaldo/src/assets/images/equipo.png';
import './NosotrosManager.css';

const NosotrosManager = () => {
  const [nosotrosData, setNosotrosData] = useState(nosotrosSeed);
  const [showForm, setShowForm] = useState(false);
  const [editingNosotros, setEditingNosotros] = useState(null);
  const [editingSection, setEditingSection] = useState('');
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    mision: '',
    vision: '',
    valores: '',
    imagen_url: '',
    nombre_empresa: '',
    slogan: '',
    email: '',
    telefono: '',
    historia: '',
    equipo: ''
  });

  useEffect(() => {
    cargarNosotros();
  }, []);

  const cargarNosotros = async () => {
    try {
      const data = await nosotrosApi.get();
      if (data && data.titulo) {
        setNosotrosData(data);
      }
    } catch (err) {
      console.warn("API de nosotros no disponible, usando datos locales:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación básica
    if (!formData.titulo.trim()) {
      alert('El título es requerido');
      return;
    }
    if (!formData.nombre_empresa.trim()) {
      alert('El nombre de la empresa es requerido');
      return;
    }

    const dataToSave = {
      titulo: formData.titulo.trim(),
      descripcion: formData.descripcion.trim(),
      mision: formData.mision.trim(),
      vision: formData.vision.trim(),
      valores: formData.valores.trim(),
      imagen_url: formData.imagen_url.trim(),
      nombre_empresa: formData.nombre_empresa.trim(),
      slogan: formData.slogan.trim(),
      email: formData.email.trim(),
      telefono: formData.telefono.trim(),
      historia: formData.historia.trim(),
      equipo: formData.equipo.trim()
    };

    try {
      if (editingNosotros && editingNosotros.id) {
        await nosotrosApi.update(editingNosotros.id, dataToSave);
        setNosotrosData(prev => ({ ...prev, ...dataToSave }));
        alert('Información actualizada exitosamente');
      } else {
        const resp = await nosotrosApi.create(dataToSave);
        const newId = resp?.id || Date.now();
        setNosotrosData({ id: newId, ...dataToSave });
        alert('Información creada exitosamente');
      }
    } catch (err) {
      console.error(err);
      alert(`No se pudo guardar la información: ${err.message || 'Error del servidor'}`);
      return;
    }
    await cargarNosotros();
    resetForm();
  };

  const handleEdit = (nosotros, section = 'toda la información') => {
    setEditingNosotros(nosotros);
    setEditingSection(section);
    const targetField = {
      encabezado: 'nombre_empresa',
      descripción: 'descripcion',
      equipo: 'equipo',
      historia: 'historia',
      misión: 'mision',
      visión: 'vision',
      valores: 'valores',
      contacto: 'email'
    }[section];
    setFormData({
      titulo: nosotros.titulo || '',
      descripcion: nosotros.descripcion || '',
      mision: nosotros.mision || '',
      vision: nosotros.vision || '',
      valores: nosotros.valores || '',
      imagen_url: nosotros.imagen_url || '',
      nombre_empresa: nosotros.nombre_empresa || '',
      slogan: nosotros.slogan || '',
      email: nosotros.email || '',
      telefono: nosotros.telefono || '',
      historia: nosotros.historia || '',
      equipo: nosotros.equipo || ''
    });
    setShowForm(true);
    if (targetField) window.setTimeout(() => formRef.current?.querySelector(`[name="${targetField}"]`)?.focus(), 350);
  };

  const handleDelete = async () => {
    if (!nosotrosData?.id || !window.confirm('¿Eliminar la información de Nosotros de forma permanente?')) return;
    try {
      await nosotrosApi.remove(nosotrosData.id);
      setNosotrosData(null);
      alert('Información eliminada exitosamente');
    } catch (err) {
      alert(`No se pudo eliminar la información: ${err.message || 'Error del servidor'}`);
    }
  };

  const handleCreate = () => {
    setEditingNosotros(null);
    setEditingSection('');
    setFormData({ ...nosotrosSeed });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      titulo: '',
      descripcion: '',
      mision: '',
      vision: '',
      valores: '',
      imagen_url: '',
      nombre_empresa: '',
      slogan: '',
      email: '',
      telefono: '',
      historia: '',
      equipo: ''
    });
    setEditingNosotros(null);
    setEditingSection('');
    setShowForm(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="manager-container"
    >
      {/* Header */}
      <div className="manager-header">
        <div className="header-left">
          <h2>Gestión de Información de la Empresa</h2>
          <p>Administra la información de ZoomTV</p>
        </div>
        <button
          onClick={nosotrosData ? () => handleEdit(nosotrosData) : handleCreate}
          className="primary-btn"
        >
          <Plus className="icon" />
          {nosotrosData ? 'Editar Información' : 'Crear Información'}
        </button>
      </div>

      <SidePanel
        isOpen={showForm}
        onClose={resetForm}
        title={editingNosotros ? `Editar ${editingSection || 'información'}` : 'Nueva Información'}
        wide
      >
            <form ref={formRef} onSubmit={handleSubmit} className="form">
              <div className="form-row">
                <div className="form-group">
                  <label>Título *</label>
                  <input
                    name="titulo"
                    type="text"
                    value={formData.titulo}
                    onChange={(e) => setFormData({...formData, titulo: e.target.value})}
                    required
                    className="form-input"
                    placeholder="ZoomTV"
                  />
                </div>
                <div className="form-group">
                  <label>Nombre de la Empresa *</label>
                  <input
                    name="nombre_empresa"
                    type="text"
                    value={formData.nombre_empresa}
                    onChange={(e) => setFormData({...formData, nombre_empresa: e.target.value})}
                    required
                    className="form-input"
                    placeholder="Zoom TV Canal 10"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Slogan</label>
                <input
                  name="slogan"
                  type="text"
                  value={formData.slogan}
                  onChange={(e) => setFormData({...formData, slogan: e.target.value})}
                  className="form-input"
                  placeholder="Información veraz, entretenimiento de calidad"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="form-input"
                    placeholder="contacto@zoomtvcanal10.com"
                  />
                </div>
                <div className="form-group">
                  <label>Teléfono</label>
                  <input
                    name="telefono"
                    type="tel"
                    value={formData.telefono}
                    onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                    className="form-input"
                    placeholder="+51 999 888 777"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Imagen</label>
                <ImageUploader
                  value={formData.imagen_url}
                  onChange={(value) => setFormData({...formData, imagen_url: value})}
                  placeholder="Selecciona una imagen o ingresa una URL"
                />
              </div>

              <div className="form-group">
                <label>Descripción</label>
                <textarea
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
                  rows={3}
                  className="form-textarea"
                  placeholder="Somos una televisora local comprometida con la comunidad"
                />
              </div>

              <div className="form-group">
                <label>Misión</label>
                <textarea
                  name="mision"
                  value={formData.mision}
                  onChange={(e) => setFormData({...formData, mision: e.target.value})}
                  rows={3}
                  className="form-textarea"
                  placeholder="Informar, entretener y educar a nuestra audiencia con contenido de calidad"
                />
              </div>

              <div className="form-group">
                <label>Visión</label>
                <textarea
                  name="vision"
                  value={formData.vision}
                  onChange={(e) => setFormData({...formData, vision: e.target.value})}
                  rows={3}
                  className="form-textarea"
                  placeholder="Ser la televisora líder en nuestra región"
                />
              </div>

              <div className="form-group">
                <label>Valores</label>
                <textarea
                  name="valores"
                  value={formData.valores}
                  onChange={(e) => setFormData({...formData, valores: e.target.value})}
                  rows={3}
                  className="form-textarea"
                  placeholder="Transparencia, compromiso, innovación y servicio a la comunidad"
                />
              </div>

              <div className="form-group">
                <label>Historia</label>
                <textarea
                  name="historia"
                  value={formData.historia}
                  onChange={(e) => setFormData({...formData, historia: e.target.value})}
                  rows={4}
                  className="form-textarea"
                  placeholder="Zoom TV Canal 10 nació en 2005 con la misión de llevar información veraz..."
                />
              </div>

               <div className="form-group">
                 <label>Equipo</label>
                 <textarea
                   name="equipo"
                   value={formData.equipo}
                   onChange={(e) => setFormData({...formData, equipo: e.target.value})}
                   rows={4}
                   className="form-textarea"
                   placeholder="Descripción del equipo de trabajo..."
                 />
                 <div className="form-help">
                   Descripción del equipo de trabajo (texto simple)
                 </div>
               </div>

              <div className="form-actions">
                <button type="button" onClick={resetForm} className="secondary-btn">
                  Cancelar
                </button>
                <button type="submit" className="primary-btn">
                  {editingNosotros ? 'Actualizar' : 'Crear'}
                </button>
              </div>
            </form>
      </SidePanel>

      {nosotrosData ? (
        <div className="nosotros-dashboard-preview">
          <div className="nd-page">
            <section className="nd-banner">
              <img src={logoZoom} alt="Logo Zoom TV" />
              <h1>{nosotrosData.nombre_empresa}</h1>
              <p>{nosotrosData.slogan}</p>
              <button type="button" className="nd-edit nd-edit-banner" onClick={() => handleEdit(nosotrosData, 'encabezado')}><Edit size={15} /> Editar encabezado</button>
            </section>

            <header className="nd-intro">
              <h2>Conoce nuestro equipo y valores</h2>
              <p>{nosotrosData.descripcion || 'Somos un equipo comprometido con la excelencia en la comunicación'}</p>
              <button type="button" className="nd-edit" onClick={() => handleEdit(nosotrosData, 'descripción')}><Edit size={15} /> Editar descripción</button>
            </header>

            <section className="nd-team">
              <button type="button" className="nd-edit" onClick={() => handleEdit(nosotrosData, 'equipo')}><Edit size={15} /> Editar equipo</button>
              <h2>Nuestro Equipo</h2>
              <div className="nd-team-content"><img src={equipoImg} alt="Equipo de Zoom TV" /><p>{nosotrosData.equipo}</p></div>
            </section>

            <div className="nd-stories">
              <article className="nd-story">
                <img src={historiaImg} alt="Historia del canal" />
                <div><button type="button" className="nd-edit" onClick={() => handleEdit(nosotrosData, 'historia')}><Edit size={15} /> Editar historia</button><h2>Nuestra Historia</h2><p>{nosotrosData.historia}</p></div>
              </article>
              <article className="nd-story nd-reverse">
                <img src={misionImg} alt="Misión de Zoom TV" />
                <div><button type="button" className="nd-edit" onClick={() => handleEdit(nosotrosData, 'misión')}><Edit size={15} /> Editar misión</button><h2>Nuestra Misión</h2><p>{nosotrosData.mision}</p></div>
              </article>
              <article className="nd-story">
                <img src={visionImg} alt="Visión de Zoom TV" />
                <div><button type="button" className="nd-edit" onClick={() => handleEdit(nosotrosData, 'visión')}><Edit size={15} /> Editar visión</button><h2>Nuestra Visión</h2><p>{nosotrosData.vision}</p></div>
              </article>
              <article className="nd-values">
                <div><button type="button" className="nd-edit" onClick={() => handleEdit(nosotrosData, 'valores')}><Edit size={15} /> Editar valores</button><h2>Nuestros Valores</h2><p>{nosotrosData.valores}</p></div>
              </article>
            </div>

            <section className="nd-contact">
              <button type="button" className="nd-edit" onClick={() => handleEdit(nosotrosData, 'contacto')}><Edit size={15} /> Editar contacto</button>
              <p>Envíanos tu información a: <a href={`mailto:${nosotrosData.email}`}>{nosotrosData.email}</a></p>
              <p>O llámanos al: <a href={`tel:${nosotrosData.telefono}`}>{nosotrosData.telefono}</a></p>
            </section>
          </div>
          <div className="nd-actions">
            <button onClick={() => handleEdit(nosotrosData)} className="action-btn edit"><Edit className="icon" /> Editar toda la información</button>
            <button onClick={handleDelete} className="action-btn delete"><Trash2 className="icon" /> Eliminar</button>
          </div>
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">
            <Building2 className="icon" />
          </div>
          <h3>No hay información de la empresa</h3>
          <p>Comienza creando la información de ZoomTV</p>
          <button
            onClick={handleCreate}
            className="primary-btn"
          >
            Crear Información
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default NosotrosManager;
