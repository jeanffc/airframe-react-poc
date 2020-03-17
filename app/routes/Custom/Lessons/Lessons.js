import React from "react";
import PropTypes from "prop-types";
import faker from "faker/locale/en_US";
import _ from "lodash";
import { Container, Row, Col } from "../../../components";
import { Table } from "./components/Table";
import { AdvancedTableB } from "../../Tables/ExtendedTable/components";

import { HeaderMain } from "../../components/HeaderMain";

import classes from "./Lessons.scss";

export class Lessons extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Container>
          <HeaderMain title="Lições" className="mb-5 mt-4" />
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
