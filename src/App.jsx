import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx'; 
import ListaFuncionarios from './pages/ListaFuncionarios.jsx';

const App = props => {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/ListaFuncionarios" element={<ListaFuncionarios />} />
    </Routes>
  </Router>
  );
}

export default App;
