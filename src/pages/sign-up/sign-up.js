import React, { useContext, useState } from 'react';
import AuthService from '../../services/auth';
import schema from './sign-up-schema-validator';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import { Redirect, Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth/auth';
import { FormInputError } from '../../components/input-form-error/input-form-error'
import { replaceSpecialCharacters } from '../../utils/utils';

const SignUp = () => {
	const history = useHistory();
    const { isAuthenticated, userAccountName } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const { register, handleSubmit, formState, errors, setValue } = useForm({
		resolver: yupResolver(schema.form.validator),
		defaultValues: schema.form.initialValues,
		mode: 'onBlur'
	});

    const signUpForm = async (values) => {
		try {
			const { name, account, cpfCnpj, telephone, email, password } = values;

			setIsLoading(true);

			await AuthService.signUp({
				name,
				email,
				password,
				telephone,
				cpf_cnpj: cpfCnpj,
				account: account.toLowerCase(),
			});

			history.push('/signin');
		} catch ({ response }) {
			setError(response.data);
			setIsLoading(false);
		}
	};

	if (isAuthenticated) {
        return <Redirect to={`/${userAccountName}`} />;
    }

    return (
        <div className="container p-b-30">
			<div className="page__header">
				<div className="container">
					{isLoading ? (
						<span className="loading"></span>
					) : (
						<h1 className="page__title">Solicite seu cadastro</h1>
					)}
					<div className="m-t-5">
						<span className="page__description">Retornaremos a liberação de sua conta em instantes.</span>
					</div>
				</div>
			</div>
            <form onSubmit={handleSubmit(signUpForm)} className="m-t-30 m-b-15">
				{error && <div className="text--center m-b-15">{error}</div>}
				<div className="m-b-15">
					<input
						name="name"
						type="text"
						ref={register}
						placeholder="Nome"
						disabled={isLoading}
						className="input"
					/>
					<FormInputError
						error={errors.name && errors.name.message}
					/>
				</div>
				<div className="m-b-15">
					<input
						name="email"
						type="email"
						ref={register}
						placeholder="Email"
						disabled={isLoading}
						className="input"
					/>
					<FormInputError
						error={errors.email && errors.email.message}
					/>
				</div>
				<div className="m-b-15">
					<input
						name="account"
						type="text"
						ref={register}
						placeholder="Nome da conta EX: salaodamaria"
						disabled={isLoading}
						className="input"
						onBlur={(event) => setValue('account', replaceSpecialCharacters(event.target.value))}
					/>
					<FormInputError
						error={errors.account && errors.account.message}
					/>
				</div>
				<div className="m-b-15">
					<input
						name="telephone"
						type="tel"
						ref={register}
						placeholder="Telefone"
						className="input input--dark"
					/>
					<FormInputError
						error={errors.telephone && errors.telephone.message}
					/>
				</div>
				<div className="m-b-15">
					<input
						name="cpfCnpj"
						type="text"
						ref={register}
						placeholder="Cpf/Cnpj sem pontos e barras"
						className="input input--dark"
					/>
					<FormInputError
						error={errors.cpfCnpj && errors.cpfCnpj.message}
					/>
				</div>
				<div className="m-b-15">
					<input
						name="password"
						type="password"
						ref={register}
						placeholder="Senha"
						disabled={isLoading}
						className="input"
					/>
					<FormInputError
						error={errors.password && errors.password.message}
					/>
				</div>
				<div className="m-b-15">
					<input
						name="confirmPassword"
						type="password"
						ref={register}
						placeholder="Confirme sua senha"
						disabled={isLoading}
						className="input"
					/>
					<FormInputError
						error={errors.confirmPassword && errors.confirmPassword.message}
					/>
				</div>
				<div>
					<button
						type="submit"
						disabled={!formState.isValid || isLoading}
						className="button button--block"
					>
						Cadastrar
					</button>
				</div>
            </form>
			<div className="text--center">
				<Link to="/signin" className="color--white">Entrar</Link>
			</div>
        </div>
    );
};

export default SignUp;
