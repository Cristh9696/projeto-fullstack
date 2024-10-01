import React, { useState, useEffect } from 'react';
import "../assets/css/ListaFuncionarios.css";
import "../App.css";
import Menu from '../component/Menu';
import Footer from '../component/Footer';

function ListaFuncionarios() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchFilter, setSearchFilter] = useState('nome');
  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [newUser, setNewUser] = useState({ nome: '', profissao: '', idade: '', estado: '' });
  const [editingUserId, setEditingUserId] = useState(null);
  const [message, setMessage] = useState('');
  const rowsPerPage = 5;

  useEffect(() => {
    fetch('https://apimocha.com/stackfullapi/posts')
      .then(response => response.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => console.error('Erro ao buscar dados:', error));
  }, []);

  const handleRowSelect = (id) => {
    setSelectedRows((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((rowId) => rowId !== id)
        : [...prevSelected, id]
    );
  };

  const filteredData = data.filter((row) =>
    row[searchFilter].toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const handleSave = () => {
    // Verificar se os campos estão vazios
    if (newUser.nome.trim() === '' || newUser.profissao.trim() === '' || newUser.idade === '' || newUser.estado.trim() === '') {
      alert('Todos os campos são obrigatórios.');
      return;
    }

    if (editingUserId !== null) {
      // Editar usuário
      setData((prevData) =>
        prevData.map((item) =>
          item.id === editingUserId ? { ...item, ...newUser } : item
        )
      );
      setMessage('Usuário atualizado com sucesso.');
    } else {
      // Criar novo usuário
      setData((prevData) => [
        ...prevData,
        { ...newUser, id: Date.now() }
      ]);
      setMessage('Usuário criado com sucesso.');
    }

    // Limpar o formulário e fechar o modal
    setNewUser({ nome: '', profissao: '', idade: '', estado: '' });
    setShowForm(false);
    setEditingUserId(null);
  };

  const handleEdit = (row) => {
    setNewUser(row);
    setEditingUserId(row.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setData((prevData) => prevData.filter((row) => row.id !== id));
    setMessage('Usuário excluído com sucesso.');
  };

  const handleDeleteSelected = () => {
    setData((prevData) => prevData.filter((row) => !selectedRows.includes(row.id)));
    setSelectedRows([]);
    setMessage('Usuários excluídos com sucesso.');
  };

  const handleCreateUser = () => {
    setNewUser({ nome: '', profissao: '', idade: '', estado: '' });
    setEditingUserId(null);
    setShowForm(true);
  };

  if (loading) {
    return (
      <div>
        <Menu />
        <div className='wait'>
          <h1>Por favor, aguarde um momento</h1>
          <div className='wait-text'>
            <span>O</span>
            <span>B</span>
            <span>R</span>
            <span>I</span>
            <span>G</span>
            <span>A</span>
            <span>D</span>
            <span>O</span>
          </div>
          <div className="doll-space">
            <div className="loader">
              <div className="jelly">
                <div className="body"></div>
                <div className="eye"></div>
                <div className="eye"></div>
                <div className="mouth"></div>
              </div>
              <div className="shadow"></div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="App">
      <Menu />
      <div className="container">
        <div className="controls">
          <input
            type="text"
            placeholder={`Buscar por ${searchFilter}`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select onChange={(e) => setSearchFilter(e.target.value)} value={searchFilter}>
            <option value="nome">Nome</option>
            <option value="profissao">Profissão</option>
            <option value="idade">Idade</option>
            <option value="estado">Estado</option>
          </select>
          <button className="create-user" onClick={handleCreateUser}>
            Criar Usuário
          </button>
          <button className="delete-selected" onClick={handleDeleteSelected} disabled={selectedRows.length === 0}>
            Excluir Selecionados
          </button>
        </div>

        {showForm && (
          <div className="new-user-form">
            <input
              type="text"
              placeholder="Nome"
              value={newUser.nome}
              onChange={(e) => setNewUser({ ...newUser, nome: e.target.value })}
            />
            <input
              type="text"
              placeholder="Profissão"
              value={newUser.profissao}
              onChange={(e) => setNewUser({ ...newUser, profissao: e.target.value })}
            />
            <input
              type="number"
              placeholder="Idade"
              value={newUser.idade}
              onChange={(e) => setNewUser({ ...newUser, idade: e.target.value })}
            />
            <input
              type="text"
              placeholder="Estado"
              value={newUser.estado}
              onChange={(e) => setNewUser({ ...newUser, estado: e.target.value })}
            />
            <button className='salvar' onClick={handleSave}>
              {editingUserId !== null ? 'Salvar' : 'Adicionar'}
            </button>
            <button className='error' onClick={() => { setShowForm(false); setEditingUserId(null); }}>Cancelar</button>
          </div>
        )}

        {message && <div className="alert">{message}</div>}

        <table className="table">
          <thead>
            <tr>
              <th>Selecionar</th>
              <th>Nome</th>
              <th>Profissão</th>
              <th>Idade</th>
              <th>Estado</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((row) => (
              <tr key={row.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(row.id)}
                    onChange={() => handleRowSelect(row.id)}
                  />
                </td>
                <td>{row.nome}</td>
                <td>{row.profissao}</td>
                <td>{row.idade}</td>
                <td>{row.estado}</td>
                <td>
  <button className="edit" onClick={() => handleEdit(row)}>Editar</button>
  <button className="delete" onClick={() => handleDelete(row.id)}>Excluir</button>
</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          <button
            className="pagination-button"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Anterior
          </button>
          <span>
            Página {currentPage} de {totalPages}
          </span>
          <button
            className="pagination-button"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Próximo
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ListaFuncionarios;