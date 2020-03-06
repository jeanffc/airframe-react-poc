import React from "react";
import PropTypes from "prop-types";
import faker from "faker/locale/en_US";
import _ from "lodash";
import { Container, Row, Col } from "../../../components";
import { Table } from "./components/Table";
import { AdvancedTableB } from "../../Tables/ExtendedTable/components";

import { HeaderMain } from "../../components/HeaderMain";

import classes from "./Payment.scss";

export class Payment extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Container>
          <HeaderMain title="Pagamentos" className="mb-5 mt-4" />
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
