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

class LessonCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lesson: {
        id: 0,
        order: 0,
        available: false,
        free: false,
        course_id: 0,
        title: "",
        summary: "",
        description: "",
        audio_url: "",
        duration: ""
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
        order,
        available,
        free,
        course_id,
        title,
        summary,
        description,
        audio_url,
        duration
      } = this.state.lesson;

      const response = await api.post(`/lessons/`, {
        order,
        available,
        free,
        course_id,
        title,
        summary,
        description,
        audio_url,
        duration
      });
      console.log("RESPONSE: ", response.data);
      this.props.history.push(`/custom/lessons/`);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <React.Fragment>
        <Container>
          <HeaderMain title={`Cadastrar Lição`} className="mb-5 mt-4" />
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
                          placeholder={this.state.lesson.id}
                          disabled
                          // value={this.state.lesson.id}
                        />
                      </Col>
                    </FormGroup>
                    {/* END Input */}

                    {/* START Input */}
                    <FormGroup row>
                      <Label for="input" sm={3}>
                        Curso
                      </Label>
                      <Col sm={9}>
                        <Input
                          type=""
                          name=""
                          id="input"
                          placeholder={this.state.lesson.course_id}
                          // disabled
                          // value={this.state.lesson.id}
                          onChange={e =>
                            this.setState({
                              lesson: {
                                ...this.state.lesson,
                                course_id: e.target.value
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
                        Ordem
                      </Label>
                      <Col sm={9}>
                        <Input
                          type=""
                          name=""
                          id="input"
                          placeholder={this.state.lesson.order}
                          onChange={e =>
                            this.setState({
                              lesson: {
                                ...this.state.lesson,
                                order: e.target.value
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
                        Disponível
                      </Label>
                      <Col sm={9}>
                        <CustomInput
                          type="select"
                          name="customSelect"
                          id="country-selector-2"
                          value={this.state.lesson.available}
                          onChange={e =>
                            this.setState({
                              lesson: {
                                ...this.state.lesson,
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
                        Gratuito
                      </Label>
                      <Col sm={9}>
                        <CustomInput
                          type="select"
                          name="customSelect"
                          id="country-selector-2"
                          value={this.state.lesson.free}
                          onChange={e =>
                            this.setState({
                              lesson: {
                                ...this.state.lesson,
                                free: e.target.value
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
                          value={this.state.lesson.title}
                          onChange={e =>
                            this.setState({
                              lesson: {
                                ...this.state.lesson,
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
                          value={this.state.lesson.summary}
                          onChange={e =>
                            this.setState({
                              lesson: {
                                ...this.state.lesson,
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
                          value={this.state.lesson.description}
                          onChange={e =>
                            this.setState({
                              lesson: {
                                ...this.state.lesson,
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
                        Audio
                      </Label>
                      <Col sm={9}>
                        <Input
                          type=""
                          name=""
                          id="input"
                          placeholder=""
                          value={this.state.lesson.audio_url}
                          onChange={e =>
                            this.setState({
                              lesson: {
                                ...this.state.lesson,
                                audio_url: e.target.value
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
                        Duração
                      </Label>
                      <Col sm={9}>
                        <Input
                          type=""
                          name=""
                          id="input"
                          placeholder=""
                          value={this.state.lesson.duration}
                          onChange={e =>
                            this.setState({
                              lesson: {
                                ...this.state.lesson,
                                duration: e.target.value
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
                          this.props.history.push(`/custom/lessons/`);
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

export default LessonCreate;
