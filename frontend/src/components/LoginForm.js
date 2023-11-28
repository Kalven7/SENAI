import React, { Component } from 'react';
import classNames from 'classnames';
import '../App.css';
import { Link } from 'react-router-dom';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 'login',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      loginFieldTouched: {},
      loginValidationErrors: {},
      registerFieldTouched: {},
      registerValidationErrors: {},
    };
  }

  onChangeHandler = (event) => {
    const { name, value } = event.target;

    this.setState((prevState) => ({
      [name]: value,
      loginFieldTouched: { ...prevState.loginFieldTouched, [name]: true },
      registerFieldTouched: { ...prevState.registerFieldTouched, [name]: true },
      loginValidationErrors: { ...prevState.loginValidationErrors, [name]: '' },
      registerValidationErrors: { ...prevState.registerValidationErrors, [name]: '' },
    }));
  };

  handleTabClick = (tab) => {
    this.setState({ active: tab });
  };

  handleCancel = () => {
    this.props.onCancel();
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { email, password, firstName, lastName } = this.state;

    this.setState({
      loginFieldTouched: { email: true, password: true },
      registerFieldTouched: { firstName: true, lastName: true, email: true, password: true },
    });

    if (this.state.active === 'login') {
      this.validateLoginForm(email, password);
    } else {
      this.validateRegisterForm(firstName, lastName, email, password);
    }
  };

  validateLoginForm = (email, password) => {
    const errors = {};

    if (!email.trim()) {
      errors.email = 'Campo obrigatório';
    }
    if (!password.trim()) {
      errors.password = 'Campo obrigatório';
    }

    if (Object.keys(errors).length > 0) {
      this.setState({ loginValidationErrors: errors });
    } else {
      this.setState({ loginValidationErrors: {} });
      this.props.onLogin(email, password);
    }
  };

  validateRegisterForm = (firstName, lastName, email, password) => {
    const errors = {};

    if (!firstName.trim()) {
      errors.firstName = 'Campo obrigatório';
    }
    if (!lastName.trim()) {
      errors.lastName = 'Campo obrigatório';
    }
    if (!email.trim()) {
      errors.email = 'Campo obrigatório';
    }
    if (!password.trim()) {
      errors.password = 'Campo obrigatório';
    }

    if (Object.keys(errors).length > 0) {
      this.setState({ registerValidationErrors: errors });
    } else {
      this.setState({ registerValidationErrors: {} });
      this.props.onRegister(firstName, lastName, email, password);
    }
  };

  render() {
    return (
      <div className="overlay">
        <div className="login-form">
          <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className={classNames("nav-link", this.state.active === "login" ? "active" : "")}
                id="tab-login"
                onClick={() => this.handleTabClick("login")}
              >
                Login
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={classNames("nav-link", this.state.active === "register" ? "active" : "")}
                id="tab-register"
                onClick={() => this.handleTabClick("register")}
              >
                Cadastro
              </button>
            </li>
          </ul>

          <div className="tab-content">
            <div className={classNames("tab-pane fade", this.state.active === "login" && "show active")} id="pills-login">
              <form onSubmit={this.handleSubmit}>
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="email">
                    E-mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className={`form-control ${this.state.loginFieldTouched.email && this.state.loginValidationErrors.email ? 'is-invalid' : ''}`}
                    onChange={this.onChangeHandler}
                  />

                  {this.state.loginFieldTouched.email && this.state.loginValidationErrors.email && (
                    <span className="help-block text-danger">{this.state.loginValidationErrors.email}</span>
                  )}
                </div>

                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="loginPassword">
                    Senha
                  </label>
                  <input
                    type="password"
                    id="loginPassword"
                    name="password"
                    className={`form-control ${this.state.loginFieldTouched.password && this.state.loginValidationErrors.password ? 'is-invalid' : ''}`}

                    onChange={this.onChangeHandler}
                  />
                  {this.state.loginFieldTouched.password && this.state.loginValidationErrors.password && (
                    <span className="help-block text-danger">{this.state.loginValidationErrors.password}</span>
                  )}

                  <div className="forgot-register-links">
                    <p>
                      Esqueceu a senha? <Link to={'/forgot'} className="link-azul">Clique aqui</Link>.
                    </p>
                  </div>

                </div>

                <div className="form-buttons">
                  <button type="submit" className="btn btn-primary btn-block half-width">
                    Entrar
                  </button>
                  <button type="button" className="btn btn-secondary btn-block half-width" onClick={this.handleCancel}>
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
            <div className={classNames("tab-pane fade", this.state.active === "register" && "show active")} id="pills-register">
              <form onSubmit={this.handleSubmit}>
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="firstName">
                    Nome
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className={`form-control ${this.state.registerFieldTouched.firstName && this.state.registerValidationErrors.firstName ? 'is-invalid' : ''}`}
                    onChange={this.onChangeHandler}
                  />
                  {this.state.registerFieldTouched.firstName && this.state.registerValidationErrors.firstName && (
                    <span className="help-block text-danger">{this.state.registerValidationErrors.firstName}</span>
                  )}

                </div>

                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="lastName">
                    Sobrenome
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className={`form-control ${this.state.registerFieldTouched.lastName && this.state.registerValidationErrors.lastName ? 'is-invalid' : ''}`}
                    onChange={this.onChangeHandler}
                  />
                  {this.state.registerFieldTouched.lastName && this.state.registerValidationErrors.lastName && (
                    <span className="help-block text-danger">{this.state.registerValidationErrors.lastName}</span>
                  )}

                </div>

                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="registerEmail">
                    E-mail
                  </label>
                  <input
                    type="email"
                    id="registerEmail"
                    name="email"
                    className={`form-control ${this.state.registerFieldTouched.email && this.state.registerValidationErrors.email ? 'is-invalid' : ''}`}
                    onChange={this.onChangeHandler}
                  />

                  {this.state.registerFieldTouched.email && this.state.registerValidationErrors.email && (
                    <span className="help-block text-danger">{this.state.registerValidationErrors.email}</span>
                  )}
                </div>

                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="registerPassword">
                    Senha
                  </label>
                  <input
                    type="password"
                    id="registerPassword"
                    name="password"
                    className={`form-control ${this.state.registerFieldTouched.password && this.state.registerValidationErrors.password ? 'is-invalid' : ''}`}
                    onChange={this.onChangeHandler}
                  />
                  {this.state.registerFieldTouched.password && this.state.registerValidationErrors.password && (
                    <span className="help-block text-danger">{this.state.registerValidationErrors.password}</span>
                  )}

                </div>

                <div className="form-buttons">
                  <button type="submit" className="btn btn-primary btn-block half-width">
                    Salvar
                  </button>
                  <button type="button" className="btn btn-secondary btn-block half-width" onClick={this.handleCancel}>
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="mb-2"></div>
      </div>
    );
  }
}

export default LoginForm;