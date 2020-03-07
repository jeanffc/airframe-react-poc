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
  FormText
} from "./../../../components";

import { HeaderMain } from "../../components/HeaderMain";
import { HeaderDemo } from "../../components/HeaderDemo";

class CourseForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false
    };

    componentDidUpdate() {
      console.log(this.state);
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
                        Input
                      </Label>
                      <Col sm={9}>
                        <Input type="" name="" id="input" placeholder="" />
                      </Col>
                    </FormGroup>
                    {/* END Input */}
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
