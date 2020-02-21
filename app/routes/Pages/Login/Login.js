import React, { Component } from "react";
import { Link, useHistory } from "react-router-dom";

import {
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  CustomInput,
  Button,
  Label,
  EmptyLayout,
  ThemeConsumer
} from "./../../../components";

import { HeaderAuth } from "../../components/Pages/HeaderAuth";
import { FooterAuth } from "../../components/Pages/FooterAuth";

import api from "../../../services/api";
import { login, author } from "../../../services/auth";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: null,
      email_valid: null,
      password: null,
      password_valid: null,
      remember_password: null,
      error: null,
      loading: false
    };
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  handleLogin = async e => {
    e.preventDefault();
    const { email, password } = this.state;

    if (email) {
      this.setState({ email_valid: true });
    } else {
      this.setState({ email_valid: false });
    }

    if (password) {
      this.setState({ password_valid: true });
    } else {
      this.setState({ password_valid: false });
    }

    if (email && password) {
      // this.props.history.push("/dashboards/dashboard");
      try {
        const response = await api.post("/sessions", { email, password });
        console.log("RESPONSE: ", response);
        if (response.data.token) {
          login(response.data.token);
          author(response.data.user.author_id);
          this.props.history.push("/dashboards/dashboard");
        } else {
          this.setState({ email_valid: false });
          this.setState({ password_valid: false });
        }
      } catch (err) {
        this.setState({
          error:
            "Houve um problema com o login, verifique suas credenciais. T.T"
        });
      }
    }
  };

  render() {
    return (
      <EmptyLayout>
        <EmptyLayout.Section center>
          {/* START Header */}
          <HeaderAuth title="" text="Informe os dados abaixo" />
          {/* END Header */}
          {/* START Form */}
          <Form className="mb-3">
            <FormGroup>
              <Label for="emailAdress">Email</Label>
              <Input
                type="email"
                name="email"
                id="emailAdress"
                placeholder="email@email.com"
                className="bg-white"
                onChange={e => this.setState({ email: e.target.value })}
                invalid={this.state.email_valid == false}
              />
              <FormFeedback>
                Ops! Preencha seu e-mail corretamente.
              </FormFeedback>
              <FormText color="muted">
                Não compartilhamos seu email com ninguém.
              </FormText>
            </FormGroup>
            <FormGroup>
              <Label for="password">Senha</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="senha"
                className="bg-white"
                onChange={e => this.setState({ password: e.target.value })}
                invalid={this.state.password_valid == false}
              />
              <FormFeedback>Ops! Preencha sua senha corretamente.</FormFeedback>
            </FormGroup>
            <FormGroup>
              <CustomInput
                type="checkbox"
                id="rememberPassword"
                label="Lembrar Senha"
                inline
              />
            </FormGroup>
            <ThemeConsumer>
              {({ color }) => (
                <Button
                  type="submit"
                  color={color}
                  block
                  tag={Link}
                  onClick={this.handleLogin}
                  // to="/dashboards/dashboard"
                >
                  Entrar
                </Button>
              )}
            </ThemeConsumer>
          </Form>
          {/* END Form */}
          {/* START Bottom Links */}
          <div className="d-flex mb-5">
            <Link to="/pages/forgotpassword" className="text-decoration-none">
              Esqueci a senha
            </Link>
            <Link to="/pages/register" className="ml-auto text-decoration-none">
              Cadastrar
            </Link>
          </div>
          {/* END Bottom Links */}
          {/* START Footer */}
          <FooterAuth />
          {/* END Footer */}
        </EmptyLayout.Section>
      </EmptyLayout>
    );
  }
}

export default Login;
