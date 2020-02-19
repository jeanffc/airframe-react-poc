import React, { Component } from "react";
import { Link } from "react-router-dom";

import {
  Form,
  FormGroup,
  FormText,
  Input,
  CustomInput,
  Button,
  Label,
  EmptyLayout,
  ThemeConsumer
} from "./../../../components";

import { HeaderAuth } from "../../components/Pages/HeaderAuth";
import { FooterAuth } from "../../components/Pages/FooterAuth";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: null,
      email_valid: null,
      password: null,
      repeat_password: null,
      password_valid: null,
      error: null
    };
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  handleSigup = async e => {
    e.preventDefault();
    const { email, password, repeat_password } = this.state;

    if (email) {
      this.setState({ email_valid: true });
    } else {
      this.setState({ email_valid: false });
    }

    if (password && password == repeat_password) {
      this.setState({ password_valid: true });
    } else {
      this.setState({ password_valid: false });
    }

    if (email && password && password == repeat_password) {
      this.props.history.push("/dashboards/dashboard");
    }
  };

  render() {
    return (
      <EmptyLayout>
        <EmptyLayout.Section center width={480}>
          {/* START Header */}
          <HeaderAuth title="Cadastrar" />
          {/* END Header */}
          {/* START Form */}
          <Form className="mb-3">
            <FormGroup>
              <Label for="username">Nome</Label>
              <Input
                type="text"
                name="text"
                id="username"
                placeholder=""
                className="bg-white"
              />
            </FormGroup>
            <FormGroup>
              <Label for="emailAdress">Email</Label>
              <Input
                type="email"
                name="email"
                id="emailAdress"
                placeholder=""
                className="bg-white"
                onChange={e => this.setState({ email: e.target.value })}
                invalid={this.state.email_valid == false}
              />
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
                placeholder=""
                className="bg-white"
                onChange={e => this.setState({ password: e.target.value })}
                invalid={this.state.password_valid == false}
              />
            </FormGroup>
            <FormGroup>
              <Label for="repeatPassword">Confirme sua Senha</Label>
              <Input
                type="password"
                name="password"
                id="repeatPassword"
                placeholder=""
                className="bg-white"
                onChange={e =>
                  this.setState({ repeat_password: e.target.value })
                }
                invalid={this.state.password_valid == false}
              />
            </FormGroup>

            <FormGroup>
              <CustomInput
                type="checkbox"
                id="acceptTerms"
                label="Aceito os Termos e Política de Privacidade"
                inline
              />
            </FormGroup>
            <ThemeConsumer>
              {({ color }) => (
                <Button
                  color={color}
                  block
                  tag={Link}
                  // to="/"
                  onClick={this.handleSigup}
                >
                  Cadastrar
                </Button>
              )}
            </ThemeConsumer>
          </Form>
          {/* END Form */}
          {/* START Bottom Links */}
          <div className="d-flex mb-5">
            <Link to="/pages/forgot-password" className="text-decoration-none">
              Esqueci a senha
            </Link>
            <Link to="/pages/login" className="ml-auto text-decoration-none">
              Login
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

export default Register;
