import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

type Produto = {
  pro_cod: number;
  pro_nome: string;
  pro_descri: string;
  pro_qtda: number;
  pro_fabricante: string;
};

export function Get() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const API_CLI = axios.create({
    baseURL: 'https://trabalhobackend-1.onrender.com/'
  });

  const nav = useNavigate();

  useEffect(() => {
    carregarProdutos();
  }, []);

  async function carregarProdutos() {
    setLoading(true);
    try {
      const response = await API_CLI.get<Produto[]>('produtos');
      setProdutos(response.data);
      setError(null);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
      setError('Não foi possível carregar os dados dos produtos.');
    } finally {
      setLoading(false);
    }
  }

  async function excluirProduto(pro_cod: number) {
    try {
 
      const result = await Swal.fire({
        title: 'Tem certeza?',
        text: "Você não poderá reverter essa ação!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, excluir!',
        cancelButtonText: 'Cancelar'
      });

      if (result.isConfirmed) {

        await API_CLI.delete(`produtos/${pro_cod}`);

        setProdutos(produtos.filter(product => product.pro_cod !== pro_cod));
        Swal.fire({
          icon: 'success',
          title: 'Excluído!',
          text: 'Produto excluído com sucesso!',
          confirmButtonText: 'OK',
          background: '#212121',
          color: '#ffffff',
          confirmButtonColor: '#4caf50'
        });
      }
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
      Swal.fire({
        icon: 'error',
        title: 'Erro!',
        text: 'Não foi possível excluir o produto.',
        confirmButtonText: 'OK',
        background: '#212121',
        color: '#ffffff',
        confirmButtonColor: '#f44336'
      });
    }
  }

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className='divA'>
      <h2>Produtos</h2>
      <div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Quantidade</th>
              <th>Fabricante</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map(product => (
              <tr key={product.pro_cod}>
                <td>{product.pro_cod}</td>
                <td>{product.pro_nome}</td>
                <td>{product.pro_descri}</td>
                <td>{product.pro_qtda}</td>
                <td>{product.pro_fabricante}</td>
                <td>
                  <button
                    className='btnExcluir'
                    onClick={() => excluirProduto(product.pro_cod)}
                  >
                    🗑
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <br />
      <button className='btnG' onClick={() => nav('/')}>↩</button>
      <button className='btnG2' onClick={() => nav('/post')}>Cadastrar</button>
    </div>
  );
}
