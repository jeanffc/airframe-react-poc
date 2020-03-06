import React from "react";
import PropTypes from "prop-types";
import faker from "faker/locale/en_US";
import _ from "lodash";
import { Container, Row, Col } from "../../../components";
import { Table } from "./components/Table";
import { AdvancedTableB } from "../../Tables/ExtendedTable/components";

import { HeaderMain } from "../../components/HeaderMain";

import classes from "./Courses.scss";

export class Courses extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Container>
          <HeaderMain title="Cursos" className="mb-5 mt-4" />
          <Row className="mb-5">
            <Col>
              <Table />
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}
