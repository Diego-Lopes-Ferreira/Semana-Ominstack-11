//react
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
//aplication
import './styles.css';
import logoImage from '../../assets/logo.svg';
import api from '../../services/api';


export default function Register() {
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [whatsapp, setwhatsapp] = useState('');
  const [cidade, setcidade] = useState('');
  const [uf, setuf] = useState('');

  const history = useHistory();


  async function handleRegister(e) {
    e.preventDefault();
    console.log({name, email, whatsapp, cidade, uf});
    const data = {name, email, whatsapp, cidade, uf};

    try {
      const response = await api.post('ongs', data);
      history.push('/')
      alert(`Seu ID de acesso: ${response.data.id}`);
    } catch(err) {
      alert('Erro no cadastro, tente novamente');
    }
  }

  return (
    <div className="register-container">
      <div className="content">

        <section>
          <img src={logoImage} alt="Be The Hero" />
          <h1>Cadastro</h1>
          <p>Faça seu cadastro, entre na plataforma e encontre pessoas para ajudar nos casos da sua ONG.</p>
          <Link className="link-element" to="/">
            <FiArrowLeft size={16} color="#e02041" />
            Voltar para Login
          </Link>
        </section>
        
        <form onSubmit={handleRegister}>
          <input 
            placeholder="Nome da ONG"
            value={name}
            onChange={e => setname(e.target.value)}
          />
          <input 
            placeholder="E-Mail" type="email"
            value={email}
            onChange={e => setemail(e.target.value)}
          />
          <input 
            placeholder="Whatsapp"
            value={whatsapp}
            onChange={e => setwhatsapp(e.target.value)}
          />
          <div className="group">
            <input 
              placeholder="Cidade"
              value={cidade}
              onChange={e => setcidade(e.target.value)}
            />
            <input 
              placeholder="Uf" style={{ width: 80 }}
              value={uf}
              onChange={e => setuf(e.target.value)}
            />
          </div>

          <button className="btnStyle01" >Cadastrar</button>
        </form>

      </div>

    </div>
  );
}