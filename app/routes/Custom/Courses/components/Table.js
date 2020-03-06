import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import moment from "moment";
import _ from "lodash";
import faker from "faker/locale/en_US";

import { getAuthor } from "../../../../services/auth";

import {
  Avatar,
  Badge,
  Button,
  ButtonGroup,
  Row,
  Col
} from "./../../../../components";
import { CustomExportCSV } from "./CustomExportButton";
import { CustomSearch } from "./CustomSearch";
import { CustomPaginationPanel } from "./CustomPaginationPanel";
import { CustomSizePerPageButton } from "./CustomSizePerPageButton";
import { CustomPaginationTotal } from "./CustomPaginationTotal";
import { randomArray, randomAvatar } from "./../../../../utilities";

import axios from "axios";
const pagarme = require("pagarme");

const generateRow = id => ({
  id,
  available: randomArray([true, false]),
  title: faker.name.findName(),
  summary: faker.lorem.sentence(8)
});

const sortCaret = order => {
  if (!order) return <i className="fa fa-fw fa-sort text-muted"></i>;
  if (order) return <i className={`fa fa-fw text-muted fa-sort-${order}`}></i>;
};

export class Table extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      courses: _.times(10, generateRow)
    };
  }

  async componentDidMount() {}

  handleAddRow() {
    const coursesLength = this.state.courses.length;

    this.setState({
      courses: [generateRow(coursesLength + 1), ...this.state.courses]
    });
  }

  createColumnDefinitions() {
    return [
      {
        dataField: "id",
        text: "Id",
        sort: true,
        sortCaret
      },
      {
        dataField: "available",
        text: "Disponível",
        sort: true,
        sortCaret
      },
      {
        dataField: "title",
        text: "Nome",
        sort: true,
        sortCaret
      },
      {
        dataField: "summary",
        text: "Resumo",
        sort: true,
        sortCaret
      }
    ];
  }

  render() {
    const columnDefs = this.createColumnDefinitions();

    const paginationDef = paginationFactory({
      paginationSize: 5,
      showTotal: true,
      pageListRenderer: props => (
        <CustomPaginationPanel
          {...props}
          size="sm"
          className="ml-md-auto mt-2 mt-md-0"
        />
      ),
      sizePerPageRenderer: props => <CustomSizePerPageButton {...props} />,
      paginationTotalRenderer: (from, to, size) => (
        <CustomPaginationTotal {...{ from, to, size }} />
      )
    });

    const expandRow = {
      renderer: row => (
        <Row>
          <Col md={6}>
            <dl className="row">
              <dt className="col-sm-6 text-right">Nome:</dt>
              <dd className="col-sm-6">{row.title}</dd>
            </dl>
          </Col>
        </Row>
      ),
      showExpandColumn: true,
      expandHeaderColumnRenderer: ({ isAnyExpands }) =>
        isAnyExpands ? (
          <i className="fa fa-angle-down fa-fw fa-lg text-muted"></i>
        ) : (
          <i className="fa fa-angle-right fa-fw fa-lg text-muted"></i>
        ),
      expandColumnRenderer: ({ expanded }) =>
        expanded ? (
          <i className="fa fa-angle-down fa-fw fa-lg text-muted"></i>
        ) : (
          <i className="fa fa-angle-right fa-fw fa-lg text-muted"></i>
        )
    };

    return (
      <ToolkitProvider
        keyField="id"
        data={this.state.courses}
        columns={columnDefs}
        search
        exportCSV
      >
        {props => (
          <React.Fragment>
            <div className="d-flex justify-content-end align-items-center mb-2">
              <div className="d-flex ml-auto">
                <CustomSearch className="mr-2" {...props.searchProps} />
                <ButtonGroup>
                  <CustomExportCSV {...props.csvProps}>Export</CustomExportCSV>
                  <Button
                    size="sm"
                    outline
                    onClick={this.handleAddRow.bind(this)}
                  >
                    Add <i className="fa fa-fw fa-plus"></i>
                  </Button>
                </ButtonGroup>
              </div>
            </div>
            <BootstrapTable
              classes="table-responsive-lg"
              pagination={paginationDef}
              bordered={false}
              expandRow={expandRow}
              responsive
              hover
              {...props.baseProps}
            />
          </React.Fragment>
        )}
      </ToolkitProvider>
    );
  }
}
