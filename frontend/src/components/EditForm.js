import React, { Component } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export class EditForm extends Component {
    state = {
        validationErrors: {},
    };

    handleSubmit = async (e) => {
        e.preventDefault();

        const { firstName, lastName, email, password, oldEmail } = e.target.elements;

        const requestBody = {
            email: email.value,
            firstName: firstName.value,
            lastName: lastName.value,
            password: password.value,
            oldEmail: oldEmail.value,
        };

        const errors = this.validateForm(requestBody);
        if (Object.keys(errors).length > 0) {
            this.setState({ validationErrors: errors });
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/${requestBody.oldEmail}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (response.ok) {
                console.log('Usuário atualizado com sucesso!');
                toast.success('Usuário atualizado com sucesso!');

            } else {
                console.error('Falha ao tentar atualizar usuário.');
                toast.error('Falha ao tentar atualizar usuário.');
            }
        } catch (error) {
            console.error('Erro:', error);
        }
    };

    validateForm = (formData) => {
        const errors = {};

        if (!formData.email) {
            errors.email = 'Campo obrigatório';
        }

        if (!formData.firstName) {
            errors.firstName = 'Campo obrigatório';
        }

        if (!formData.lastName) {
            errors.lastName = 'Campo obrigatório';
        }

        if (!formData.password) {
            errors.password = 'Campo obrigatório';
        }

        if (!formData.oldEmail) {
            errors.oldEmail = 'Campo obrigatório';
        }

        return errors;
    };

    handleInputChange = (e) => {
        const { name, value } = e.target;

        const updatedErrors = { ...this.state.validationErrors };
        delete updatedErrors[name];
        this.setState({ validationErrors: updatedErrors });

        this.setState(prevState => ({
            formData: {
                ...prevState.formData,
                [name]: value,
            }
        }));
    };


    render() {
        const { oldEmail } = this.props;
        const { validationErrors } = this.state;

        return (
            <div className="overlay">
                <div className="login-form">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="oldEmail">
                                Antigo E-mail
                            </label>
                            <input
                                type="email"
                                id="oldEmail"
                                name="oldEmail"
                                defaultValue={oldEmail}
                                className={`form-control ${validationErrors.oldEmail ? 'is-invalid' : ''}`}
                                onChange={this.handleInputChange}
                            />
                            {validationErrors.oldEmail && (
                                <div className="text-danger">{validationErrors.oldEmail}</div>
                            )}
                        </div>

                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="email">
                                Novo E-mail
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className={`form-control ${validationErrors.email ? 'is-invalid' : ''}`}
                                onChange={this.handleInputChange}
                            />
                            {validationErrors.email && (
                                <div className="text-danger">{validationErrors.email}</div>
                            )}
                        </div>

                        <div className="form-outline mb-4">

                            <label className="form-label" htmlFor="firstName">
                                Nome
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                className={`form-control ${validationErrors.firstName ? 'is-invalid' : ''}`}
                                onChange={this.handleInputChange}
                            />
                            {validationErrors.firstName && (
                                <div className="text-danger">{validationErrors.firstName}</div>
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
                                className={`form-control ${validationErrors.lastName ? 'is-invalid' : ''}`}
                                onChange={this.handleInputChange}
                            />
                            {validationErrors.lastName && (
                                <div className="text-danger">{validationErrors.lastName}</div>
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
                                className={`form-control ${validationErrors.password ? 'is-invalid' : ''}`}
                                onChange={this.handleInputChange}
                            />
                            {validationErrors.lastName && (
                                <div className="text-danger">{validationErrors.password}</div>
                            )}
                        </div>

                        <div className="form-buttons">
                            <button type="submit" className="btn btn-primary btn-block half-width">
                                Salvar
                            </button>
                            <Link to="/welcome" className="btn btn-secondary btn-block half-width">
                                Fechar
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

}
