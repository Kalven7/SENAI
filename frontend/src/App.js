import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Welcome from './components/Welcome';
import Maps from './components/Maps';
import { EditForm } from './components/EditForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const verificarToken = () => {
  const token = localStorage.getItem('token');
  return token ? true : false;
};

const RotaPrivada = ({ element: Element, ...rest }) => {
  const autenticado = verificarToken();
  return autenticado ? <Element {...rest} /> : <Navigate to="/welcome" replace />;
};


function App() {
  return (
    <BrowserRouter>
     <ToastContainer /> 
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route
            path="/maps"
            element={<RotaPrivada element={Maps} />}
          />
          <Route path="/forgot" element={<EditForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;