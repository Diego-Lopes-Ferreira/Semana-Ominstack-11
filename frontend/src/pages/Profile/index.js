//react
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi'
//aplication
import './styles.css';
import logoImage from '../../assets/logo.svg';
import api from '../../services/api';


export default function Profile() {
  const [casos, setCasos] = useState([]);
  const history = useHistory();
  const ongName = localStorage.getItem('ongName');
  const ongId = localStorage.getItem('ongId');


  useEffect(() => {
    api.get('profile', {
      headers: {
        Authorization: ongId,
      }
    }).then(response => {
      setCasos(response.data.incidents);
    })
  }, [ongId]);


  function handleLogout() {
    localStorage.clear();
    history.push('/')
  }

  
  async function handleDeleteIncident(id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ongId,
        }
      });
      setCasos(casos.filter(incident => incident.id !== id));
    } catch(err) {
      alert('Erro ao deletar caso, tente novamente.');
    }
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImage} alt="Be The Hero" />
        <span>Bem vinda, {ongName} {ongId}</span>
        <Link className="btnStyle01" to="/incidents/new">Cadastrar novo caso</Link>
        <button onClick={handleLogout}><FiPower size={18} color="#e02041" /></button>
      </header>

      <h1>Casos cadastrados:</h1>

      <ul>
        {casos.map(incident => (          
          <li key={incident.id} >
          <strong>CASO:</strong>
            <p>{incident.title}</p>
            
          <strong>DESCRIÇÃO</strong>
            <p>{incident.description}</p>

          <strong>VALOR:</strong>
            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

          <button onClick={() => handleDeleteIncident(incident.id)}>
            <FiTrash2 size={20} color="#a8a8b3" />
          </button>
        </li>
        ))}
      </ul>
    </div>
  );
}