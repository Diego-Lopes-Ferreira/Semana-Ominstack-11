//react
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'
//aplication
import './styles.css';
import heroesImage from '../../assets/heroes.png';
import logoImage from '../../assets/logo.svg';
import api from '../../services/api';


export default function Login() {
  const [id, setId] = useState('');
  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const response = await api.post('sessions', { id });
      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', response.data.name);
      history.push('/profile');
      //console.log(response.data.name);

    } catch(err) {
      alert('Falha no login, tente novamente');
    }
  }

  return (
    <div className="login-container">
      <section className="form">
        <img src={logoImage} alt="Be The Hero" />
        <form onSubmit={handleLogin}>
          <h1>Faça seu Login</h1>

          <input 
            placeholder="Sua ID"
            value={id}
            onChange={e => setId(e.target.value)}
          />
          
          <button className="btnStyle01" type="submit">Entrar</button>
          <Link className="link-element" to="/register">
            <FiLogIn size={16} color="#e02041" />
            Não tem cadastro? Clique aqui!
          </Link>
        </form>
    </section>
    <img src={heroesImage} alt="Heroes" />
  </div>
  );
}