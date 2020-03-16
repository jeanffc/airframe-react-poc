import React, { Component } from "react";

import {
  Container,
  Row,
  Col,
  Card,
  CardTitle,
  CardBody,
  FormFeedback,
  Badge,
  CustomInput,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Button
} from "./../../../components";

import { HeaderMain } from "../../components/HeaderMain";
import { HeaderDemo } from "../../components/HeaderDemo";

import api from "../../../services/api";
import { getAuthor } from "../../../services/auth";

class CourseCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      course: {
        id: 0,
        available: false,
        author_id: 0,
        // author: "",
        title: "",
        summary: "",
        description: "",
        topics_json: "",
        skills_json: "",
        image_url: "",
        price: 0
      },
      loading: false
    };
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  async componentDidMount() {}

  handleSave = async e => {
    console.log("handleSave");
    try {
      const {
        id,
        available,
        author_id,
        title,
        summary,
        description,
        topics_json,
        skills_json,
        image_url,
        price
      } = this.state.course;

      const response = await api.post(`/courses/`, {
        available,
        author_id,
        title,
        summary,
        description,
        topics_json,
        skills_json,
        image_url,
        price
      });
      console.log("RESPONSE: ", response.data);
      this.props.history.push(`/custom/courses/`);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <React.Fragment>
        <Container>
          <HeaderMain title={`Cadastrar Curso`} className="mb-5 mt-4" />
          <Row>
            <Col lg={12}>
              <Card className="mb-3">
                <CardBody>
                  {/* <CardTitle tag="h6" className="mb-4">
                    Forms: Inputs
                    <span className="small ml-1 text-muted">#1.01</span>
                  </CardTitle> */}
                  {/* START Form */}
                  <Form>
                    {/* START Input */}
                    <FormGroup row>
                      <Label for="input" sm={3}>
                        Id
                      </Label>
                      <Col sm={9}>
                        <Input
                          type=""
                          name=""
                          id="input"
                          placeholder={this.state.course.id}
                          disabled
                          // value={this.state.course.id}
                        />
                      </Col>
                    </FormGroup>
                    {/* END Input */}

                    {/* START Input */}
                    <FormGroup row>
                      <Label for="input" sm={3}>
                        Autor
                      </Label>
                      <Col sm={9}>
                        <Input
                          type=""
                          name=""
                          id="input"
                          placeholder={this.state.course.author_id}
                          disabled
                          // value={this.state.course.id}
                        />
                      </Col>
                    </FormGroup>
                    {/* END Input */}

                    {/* START Input */}
                    <FormGroup row>
                      <Label for="input" sm={3}>
                        Disponível
                      </Label>
                      <Col sm={9}>
                        <CustomInput
                          type="select"
                          name="customSelect"
                          id="country-selector-2"
                          value={this.state.course.available}
                          onChange={e =>
                            this.setState({
                              course: {
                                ...this.state.course,
                                available: e.target.value
                              }
                            })
                          }
                        >
                          <option value="">Selecione...</option>
                          <option value="true">Sim</option>
                          <option value="false">Não</option>
                        </CustomInput>
                      </Col>
                    </FormGroup>
                    {/* END Input */}

                    {/* START Input */}
                    <FormGroup row>
                      <Label for="input" sm={3}>
                        Nome
                      </Label>
                      <Col sm={9}>
                        <Input
                          type=""
                          name=""
                          id="input"
                          placeholder=""
                          value={this.state.course.title}
                          onChange={e =>
                            this.setState({
                              course: {
                                ...this.state.course,
                                title: e.target.value
                              }
                            })
                          }
                        />
                      </Col>
                    </FormGroup>
                    {/* END Input */}

                    {/* START Input */}
                    <FormGroup row>
                      <Label for="input" sm={3}>
                        Resumo
                      </Label>
                      <Col sm={9}>
                        <Input
                          type="textarea"
                          name="text"
                          id="message-1"
                          placeholder="Enter Your Message..."
                          className=""
                          value={this.state.course.summary}
                          onChange={e =>
                            this.setState({
                              course: {
                                ...this.state.course,
                                summary: e.target.value
                              }
                            })
                          }
                        />
                      </Col>
                    </FormGroup>
                    {/* END Input */}

                    {/* START Input */}
                    <FormGroup row>
                      <Label for="input" sm={3}>
                        Descrição
                      </Label>
                      <Col sm={9}>
                        <Input
                          type="textarea"
                          name="text"
                          id="message-1"
                          placeholder="Enter Your Message..."
                          className=""
                          value={this.state.course.description}
                          onChange={e =>
                            this.setState({
                              course: {
                                ...this.state.course,
                                description: e.target.value
                              }
                            })
                          }
                        />
                      </Col>
                    </FormGroup>
                    {/* END Input */}

                    {/* START Input */}
                    <FormGroup row>
                      <Label for="input" sm={3}>
                        Tópicos
                      </Label>
                      <Col sm={9}>
                        <Input
                          type="textarea"
                          name="text"
                          id="message-1"
                          placeholder="Enter Your Message..."
                          className=""
                          value={this.state.course.topics_json}
                          onChange={e =>
                            this.setState({
                              course: {
                                ...this.state.course,
                                topics_json: e.target.value
                              }
                            })
                          }
                        />
                      </Col>
                    </FormGroup>
                    {/* END Input */}

                    {/* START Input */}
                    <FormGroup row>
                      <Label for="input" sm={3}>
                        Habilidades
                      </Label>
                      <Col sm={9}>
                        <Input
                          type="textarea"
                          name="text"
                          id="message-1"
                          placeholder="Enter Your Message..."
                          className=""
                          value={this.state.course.skills_json}
                          onChange={e =>
                            this.setState({
                              course: {
                                ...this.state.course,
                                skills_json: e.target.value
                              }
                            })
                          }
                        />
                      </Col>
                    </FormGroup>
                    {/* END Input */}

                    {/* START Input */}
                    <FormGroup row>
                      <Label for="input" sm={3}>
                        Imagem
                      </Label>
                      <Col sm={9}>
                        <Input
                          type=""
                          name=""
                          id="input"
                          placeholder=""
                          value={this.state.course.image_url}
                          onChange={e =>
                            this.setState({
                              course: {
                                ...this.state.course,
                                image_url: e.target.value
                              }
                            })
                          }
                        />
                      </Col>
                    </FormGroup>
                    {/* END Input */}

                    {/* START Input */}
                    <FormGroup row>
                      <Label for="input" sm={3}>
                        Preço
                      </Label>
                      <Col sm={9}>
                        <Input
                          type=""
                          name=""
                          id="input"
                          placeholder=""
                          value={this.state.course.price}
                          onChange={e =>
                            this.setState({
                              course: {
                                ...this.state.course,
                                price: e.target.value
                              }
                            })
                          }
                        />
                      </Col>
                    </FormGroup>
                    {/* END Input */}
                    <div className="d-flex justify-content-end">
                      <Button
                        color="primary"
                        className=""
                        onClick={() => {
                          console.log("clicked");
                          this.handleSave();
                        }}
                      >
                        Salvar
                      </Button>
                      <Button
                        color="danger"
                        className="ml-2"
                        onClick={() => {
                          console.log("clicked");
                          this.props.history.push(`/custom/courses/`);
                        }}
                      >
                        Cancelar
                      </Button>
                    </div>
                  </Form>
                  {/* END Form */}
                </CardBody>
              </Card>
            </Col>
          </Row>
          {/* END Section 1 */}
        </Container>
      </React.Fragment>
    );
  }
}

export default CourseCreate;
