import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';
import logo from '../images/logo.svg';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      userName: '',
      isLoginBtnDisabled: true,
      loading: false,
      logged: false,
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
  }

  handleUsernameChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.validateFields);
  };

  validateFields = () => {
    const { userName } = this.state;
    const MIN_USERNAME_LENGTH = 3;
    const userNameLength = userName.length >= MIN_USERNAME_LENGTH;
    if (userNameLength) {
      this.setState({ isLoginBtnDisabled: false });
    } else {
      this.setState({ isLoginBtnDisabled: true });
    }
  };

  handleSubmitDefault = (event) => {
    event.preventDefault();
  };

  loginBtn = async (user) => {
    this.setState({ loading: true });
    await createUser(user);
    this.setState({ loading: false, logged: true });
  };

  render() {
    const { userName, isLoginBtnDisabled, loading, logged } = this.state;
    const user = { name: userName };
    return (
      <div data-testid="page-login" className="form-container">
        <form className="login-form" onSubmit={ this.handleSubmitDefault }>
          <img src={ logo } alt="logo" />
          <fieldset>
            <label>
              <input
                name="userName"
                value={ userName }
                type="text"
                data-testid="login-name-input"
                onChange={ this.handleUsernameChange }
                placeholder="qual é o seu nome?"
                maxLength="20"

              />
            </label>
            <button
              type="submit"
              disabled={ isLoginBtnDisabled }
              data-testid="login-submit-button"
              onClick={ () => this.loginBtn(user) }
            >
              Entrar

            </button>
            {logged && <Redirect to="/search" />}
          </fieldset>
          {loading && <Loading />}
        </form>
      </div>
    );
  }
}

export default Login;
