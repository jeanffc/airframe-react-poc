import React, { Component } from "react";
import { Link, useHistory, withRouter } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import moment from "moment";
import _ from "lodash";
import faker from "faker/locale/en_US";

import api from "../../../../services/api";
import { getAuthor } from "../../../../services/auth";

import {
  Avatar,
  Badge,
  Button,
  ButtonGroup,
  Row,
  Col,
  UncontrolledModal,
  ModalHeader,
  ModalBody,
  ModalFooter
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

class Table extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      author: getAuthor() || 0,
      courses: []
      // courses: _.times(10, generateRow)
    };
  }

  async componentDidMount() {
    try {
      const response = await api.get("/courses", this.state.author);
      if (response.data) {
        this.setState({
          courses: response.data
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  handleAddRow() {
    const coursesLength = this.state.courses.length;

    this.setState({
      courses: [generateRow(coursesLength + 1), ...this.state.courses]
    });
  }

  handleModelEdit = async course => {
    console.log("course: ", course);
    this.props.history.push(`/custom/courses/${course.id}`);
    // this.props.history.push({
    //   pathname: `/custom/courses/${course.id}`,
    //   state: { course }
    // });
  };

  handleModelDelete = async course => {
    console.log("course: ", course);
    try {
      const response = await api.delete(`/courses/${course.id}`);
      if (response.data) {
        this.setState({
          courses: this.state.courses.filter(obj => {
            return obj.id != response.data.id;
          })
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

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
      },
      {
        text: "Ações",
        dataField: "",
        formatter: (cell, row) => {
          return (
            <div className="d-flex justify-content-end">
              <Button
                type="button"
                outline
                color="primary"
                className="btn btn-outline-primary btn-sm ts-buttom"
                size="sm"
                onClick={() => {
                  this.handleModelEdit(row);
                }}
              >
                Editar
              </Button>
              <Button
                id={"modal" + row.id}
                type="button"
                outline
                color="danger"
                className="btn btn-outline-danger btn-sm ml-2 ts-buttom"
                size="sm"
                // onClick={() => {
                //   this.handleModelDelete(row);
                // }}
              >
                Excluir
              </Button>
              <UncontrolledModal
                target={"modal" + row.id}
                className="modal-outline-danger"
              >
                <ModalHeader tag="h6">
                  <span className="text-danger">Cuidado!</span>
                </ModalHeader>
                <ModalBody>
                  Você tem certeza que quer excluir {row.title}?
                </ModalBody>
                <ModalFooter>
                  <UncontrolledModal.Close
                    color="danger"
                    onPress={() => {
                      this.handleModelDelete(row);
                    }}
                  >
                    Excluir
                  </UncontrolledModal.Close>
                  <UncontrolledModal.Close
                    color="link"
                    className="text-danger"
                    onPress={() => {}}
                  >
                    Cancelar
                  </UncontrolledModal.Close>
                </ModalFooter>
              </UncontrolledModal>
            </div>
          );
        }
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

    // const rowEvents = {
    //   onClick: (e, row, rowIndex) => {
    //     console.log("clicked");
    //   }
    // };

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
              // expandRow={expandRow}
              // rowEvents={rowEvents}
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

const TableHelper = withRouter(Table);

export { TableHelper as Table };
