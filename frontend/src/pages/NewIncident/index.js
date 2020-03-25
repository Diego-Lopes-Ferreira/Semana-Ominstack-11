//react
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
//aplication
import './styles.css';
import logoImage from '../../assets/logo.svg';
import api from '../../services/api'

export default function NewIncident() {
  const [title, settitle] = useState();
  const history = useHistory();
  const [description, setdescription] = useState();
  const [value, setvalue] = useState();
  const ongId = localStorage.getItem('ongId');


  async function handleNewIncident(e) {
    e.preventDefault();
    const data = {
      title,
      description,
      value,
    };
    try {
      await api.post('incidents', data, {
        headers: {
          authorization: ongId
        }
      })
      history.push('/profile');
    } catch(err) {
      alert('Erro no cadastramento do caso');
    }
  }

  return (
    <div className="newincident-container">
      <div className="content">
        <section>
          <img src={logoImage} alt="Be The Hero" />
          <h1>Caadastrar novo caso</h1>
          <p>Descreva detalhadamente o caso para que um heroi resolva.</p>
          <Link className="link-element" to="/profile">
            <FiArrowLeft size={16} color="#e02041" />
            Voltar para Home
          </Link>
        </section>

        <form onSubmit={handleNewIncident}>
          <input 
            placeholder="Título do caso"
            value={title}
            onChange={e => settitle(e.target.value)}
          />
          <textarea 
            placeholder="Descrição"
            value={description}
            onChange={e => setdescription(e.target.value)}
          />
          <input 
            placeholder="Valor em Reais (R$)"
            value={value}
            onChange={e => setvalue(e.target.value)}
          />
          
          <button className="btnStyle01" >Cadastrar</button>
        </form>

      </div>

    </div>
  );
}