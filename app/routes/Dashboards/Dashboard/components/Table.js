import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import moment from "moment";
import _ from "lodash";
import faker from "faker/locale/en_US";

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

const pagarme = require("pagarme");

const generateRow = id => ({
  id,
  status: randomArray(["paid", "waiting_payment"]),
  name: faker.name.findName(),
  email: faker.internet.email(),
  payment_method: randomArray(["credit_card", "boleto"]),
  amount: 500 + Math.random() * 1000,
  currency: <i className="fa fa-fw fa-dollar text-muted" key="cur_usd"></i>,
  date: faker.date.recent()
});

const sortCaret = order => {
  if (!order) return <i className="fa fa-fw fa-sort text-muted"></i>;
  if (order) return <i className={`fa fa-fw text-muted fa-sort-${order}`}></i>;
};

export class Table extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      transactions: _.times(50, generateRow)
    };
  }

  async componentDidMount() {
    pagarme.client
      .connect({ api_key: "ak_test_TkP0pqMRsXUT4IcwREFujs2qoivCqB" })
      .then(client => client.transactions.all())
      .then(transactions => {
        console.log(transactions);
        this.setState({
          transactions: transactions
        });
      });
  }

  handleAddRow() {
    const transactionsLength = this.state.transactions.length;

    this.setState({
      transactions: [
        generateRow(transactionsLength + 1),
        ...this.state.transactions
      ]
    });
  }

  createColumnDefinitions() {
    return [
      {
        dataField: "status",
        text: "Status",
        sort: true,
        sortCaret,
        formatter: cell => {
          const text = status => {
            const map = {
              processing: "Processando",
              authorized: "Autorizado",
              paid: "Pago",
              refunded: "Reembolsado",
              waiting_payment: "Aguardando",
              pending_refund: "Pendente",
              refused: "Recusado"
            };
            return map[status];
          };

          const color = status => {
            const map = {
              processing: "secondary",
              authorized: "warning",
              paid: "success",
              refunded: "success",
              waiting_payment: "warning",
              pending_refund: "danger",
              refused: "danger"
            };
            return map[status];
          };

          return <Badge color={color(cell)}>{text(cell)}</Badge>;
        }
      },
      {
        dataField: "date",
        text: "Data",
        sort: true,
        sortCaret,
        formatter: cell => {
          return moment(cell).format("DD-MMM-YYYY");
        }
      },
      {
        dataField: "customer",
        text: "Nome",
        sort: true,
        sortCaret,
        formatter: cell => {
          return cell && cell.name ? cell.name : "";
        }
      },
      {
        dataField: "customer",
        text: "Email",
        sort: true,
        sortCaret,
        formatter: cell => {
          return cell && cell.email ? cell.email : "";
        }
      },
      {
        dataField: "payment_method",
        text: "Forma de Pagamento",
        sort: true,
        sortCaret,
        formatter: cell => {
          const type = {
            credit_card: "Cartão de Crédito",
            boleto: "Boleto"
          };
          return type[cell];
        }
      },
      {
        dataField: "amount",
        text: "Valor",
        sort: true,
        sortCaret,
        formatter: (cell, row) => (
          <span>
            {row.currency}
            {_.isNumber(cell) && cell.toFixed(2)}
          </span>
        )
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
              <dd className="col-sm-6">{row.name}</dd>
            </dl>
          </Col>
          <Col md={6}>
            <dl className="row">
              <dt className="col-sm-6 text-right">Data:</dt>
              <dd className="col-sm-6">
                {moment(row.date).format("DD-MMM-YYYY")}
              </dd>
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
        data={this.state.transactions}
        columns={columnDefs}
        search
        exportCSV
      >
        {props => (
          <React.Fragment>
            <div className="d-flex justify-content-end align-items-center mb-2">
              <h6 className="my-0">AdvancedTable B</h6>
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
