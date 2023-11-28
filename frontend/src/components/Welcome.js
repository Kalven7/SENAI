import React, { useState } from 'react';
import logo from '../assets/logo.jpg';
import LoginForm from './LoginForm';
import { setAuthHeader } from '../helpers/axios_helper';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Welcome() {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [isLoggedIn] = useState(false);
  const navigate = useNavigate(); 

  const imgStyle = {
    width: '100%',
    height: '100%',
  };

  const buttonStyle = {
    position: 'fixed',
    top: '20px',
    right: '20px',
    padding: '10px 20px',
    background: 'blue',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    zIndex: '999',
  };

  const handleLoginClick = () => {
    setShowLoginForm(true);
  };

  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post('/login', { email, password });
      const token = response.data.token;
      localStorage.setItem('token', token);
      console.log('Usuário logado com sucesso:', response.data);
      toast.success('Login bem-sucedido!');
      navigate('/maps');

    } catch (error) {
      console.error('Erro:', error);
      toast.error('Falha! Verifique seu Usuario/Senha e tente novamente.');
    }
  };

  const handleRegister = async (firstName, lastName, email, password) => {
    try {
      const response = await axios.post('/register', { firstName, lastName, email, password });
      const authToken = response.data.token;
      setAuthHeader(authToken);
      console.log('Novo usuário registrado com sucesso!');
      toast.success('Novo usuário registrado com sucesso!');
      setShowLoginForm(false);
    } catch (error) {
      console.error('Erro:', error);
      toast.error('Falha ao tentar registrar novo usuário.');
      setShowLoginForm(false);
    }
  };

  const handleCancel = () => {
    setShowLoginForm(false);
  };

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      {!isLoggedIn && (
        <button style={buttonStyle} onClick={handleLoginClick}>
          Login
        </button>
      )}
      {showLoginForm && <LoginForm onLogin={handleLogin} onRegister={handleRegister} onCancel={handleCancel} />}
      <img src={logo} alt="Logo" style={imgStyle} className="img-fluid mb-4" />
    </div>
  );
}

export default Welcome;