 import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './App.css';

export function App() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');

  const API_CLI = axios.create({
    baseURL: 'https://trabalhobackend-1.onrender.com/'
  });

  const nav1 = useNavigate();

  async function Cadastro() {
    try {
      await API_CLI.post('cliente', {
        cli_nome: nome,
        cli_email: email,
        cli_tel: telefone,
      });
      Swal.fire({
        icon: 'success',
        title: 'Sucesso!',
        text: 'Cliente cadastrado com sucesso!',
        confirmButtonText: 'OK',
        background: '#212121',
        color: '#ffffff',
        confirmButtonColor: '#4caf50'
      });
    } catch (error) {
      console.error('Erro ao cadastrar cliente:', error);
      Swal.fire({
        icon: 'error',
        title: 'Erro!',
        text: 'Erro ao cadastrar cliente. Verifique o console para mais detalhes.',
        confirmButtonText: 'OK',
        background: '#212121',
        color: '#ffffff',
        confirmButtonColor: '#f44336'
      });
    }
  }

  return (
    <div className='d1'>
      <h2>Cadastro de Cliente 👤</h2>
      <label className='o1' htmlFor="Onome">Nome: </label>
      <input
        type="text"
        id='nome'
        placeholder='Insira um nome'
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <br /><br />
      <label className='o2' htmlFor="Oemail">Email: </label>
      <input
        type="email"
        id='email'
        placeholder='Insira um email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br /><br />
      <label htmlFor="Otelefone">Telefone: </label>
      <input
        type="tel"
        id='telefone'
        placeholder='9998-45323'
        value={telefone}
        onChange={(e) => setTelefone(e.target.value)}
      />
      <br /><br /><br />
      <button className='btnC' onClick={Cadastro}>Confirmar</button>
      <button className='btnN' onClick={() => nav1('/get')}>→</button>
    </div>
  );
}
