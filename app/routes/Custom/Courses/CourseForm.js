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

class CourseForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      course: {
        id: 0,
        available: false,
        // author_id: 0,
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

  async componentDidMount() {
    // console.log("PARAMS: ", this.props.location.state.course);
    console.log("LOCATION: ", this.props.location);
    console.log("PARAM: ", this.props.location.pathname.split("/").pop());
    const param = this.props.location.pathname.split("/").pop();
    try {
      const response = await api.get(`/courses/${param}`);
      console.log("RESPONSE: ", response.data);
      if (response.data) {
        this.setState({
          course: response.data
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <React.Fragment>
        <Container>
          <HeaderMain title={`Curso ${1}`} className="mb-5 mt-4" />
          {/* START Header 1 */}
          {/* <Row>
            <Col lg={12}>
              <HeaderDemo
                no={1}
                title="Basic Inputs"
                subTitle={
                  <React.Fragment>
                    Indicate the current page’s location within a navigational
                    hierarchy that automatically adds separators via CSS.
                  </React.Fragment>
                }
              />
            </Col>
          </Row> */}
          {/* END Header 1 */}
          {/* START Section 1 */}
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
                        Disponível
                      </Label>
                      <Col sm={9}>
                        <CustomInput
                          type="select"
                          name="customSelect"
                          id="country-selector-2"
                          value={this.state.course.available}
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

export default CourseForm;
