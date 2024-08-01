import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

type Produto = {
  pro_cod?: number;
  pro_nome: string;
  pro_descri: string;
  pro_qtda: number;
  pro_fabricante: string;
};

export function Post() {
  const [nome, setNome] = useState<string>('');
  const [descri, setDescri] = useState<string>('');
  const [qtda, setQtda] = useState<string>('');
  const [fabricante, setFabricante] = useState<string>('');

  const API_CLI = axios.create({
    baseURL: 'https://trabalhobackend-1.onrender.com/'
  });

  const nav = useNavigate();

  async function Inserir() {
    try {
      await API_CLI.post('produtos', {
        pro_nome: nome,
        pro_descri: descri,
        pro_qtda: Number(qtda),
        pro_fabricante: fabricante,
      });

      // Mostrar um alerta de sucesso
      Swal.fire({
        icon: 'success',
        title: 'Produto cadastrado com sucesso!',
        text: 'O produto foi cadastrado com sucesso.',
        confirmButtonText: 'OK',
        background: '#212121',
        color: '#ffffff',
        confirmButtonColor: '#4caf50'
      });

      // Limpar os campos do formulário
      setNome('');
      setDescri('');
      setQtda('');
      setFabricante('');

    } catch (error) {
      console.error('Erro ao cadastrar produto:', error);

      // Mostrar um alerta de erro
      Swal.fire({
        icon: 'error',
        title: 'Erro ao cadastrar produto',
        text: 'Não foi possível cadastrar o produto. Verifique o console para mais detalhes.',
        confirmButtonText: 'OK',
        background: '#212121',
        color: '#ffffff',
        confirmButtonColor: '#f44336'
      });
    }
  }

  return (
    <div className='divA'>
      <h2>Cadastro de Produto ⚙</h2>
      <label className='N1'>Nome: </label>
      <input
        type="text"
        placeholder='Insira um Nome'
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <br /><br />
      <label className='Desc'>Descrição: </label>
      <input
        type="text"
        placeholder='Fale sobre o Produto'
        value={descri}
        onChange={(e) => setDescri(e.target.value)}
      />
      <br /><br />
      <label className='qtd'>Quantidade: </label>
      <input
        type="number"
        placeholder='Informe a quantidade'
        value={qtda}
        onChange={(e) => setQtda(e.target.value)}
      />
      <br /><br />
      <label className='Fab1'>Fabricante: </label>
      <input
        type="text"
        placeholder='Informe o fabricante'
        value={fabricante}
        onChange={(e) => setFabricante(e.target.value)}
      />
      <br /><br />
      <button className='btnG2' onClick={() => nav('/get')}>↩</button>
      <button className='btnP' onClick={Inserir}>Confirmar</button>
    </div>
  );
}
