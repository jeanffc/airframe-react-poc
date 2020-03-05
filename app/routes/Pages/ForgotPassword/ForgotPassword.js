import React, { Component } from "react";
import { Link } from "react-router-dom";

import {
  Form,
  FormGroup,
  FormText,
  Input,
  Button,
  Label,
  EmptyLayout,
  ThemeConsumer
} from "./../../../components";

import { HeaderAuth } from "../../components/Pages/HeaderAuth";
import { FooterAuth } from "../../components/Pages/FooterAuth";

class ForgotPassword extends Component {
  render() {
    return (
      <EmptyLayout>
        <EmptyLayout.Section center>
          {/* START Header */}
          <HeaderAuth title="Esqueci minha senha" />
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
              />
              <FormText color="muted">
                Não compartilhamos seu email com ninguém.
              </FormText>
            </FormGroup>
            <ThemeConsumer>
              {({ color }) => (
                <Button
                  color={color}
                  block
                  tag={Link}
                  onClick={this.handleResetPassword}
                  //   to="/"
                  // className="align-self-center"
                >
                  Resetar Senha
                </Button>
              )}
            </ThemeConsumer>
            {/* <Button
            color="link"
            tag={Link}
            to="/"
            className="align-self-center ml-auto pr-0 text-decoration-none"
          >
            <i className="fa fa-angle-left mr-2"></i> Back to Home
          </Button> */}
          </Form>
          {/* END Form */}
          {/* START Bottom Links */}
          <div className="d-flex mb-5">
            <Link to="/pages/login" className="text-decoration-none">
              Login
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

export default ForgotPassword;
