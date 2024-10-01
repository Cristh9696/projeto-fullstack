import "../assets/css/Menu.css";
import React from "react";
import { Link } from 'react-router-dom';

function Menu() {
  return (
    <nav className="header">
      <ul>
        <li>
          <Link to="/">Início</Link>
        </li>
        <li>
          <Link to="/ListaFuncionarios">Lista de Funcionários</Link>
        </li>
      </ul>
    </nav>
  );
}
export default Menu;