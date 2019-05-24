import React, { Component } from "react";
import Form from "../../../Components/JSX/Kasir/FormPembayaran";
class Pembayaran extends Component {
  render() {
    return (
      <div
        className="card"
        style={{ width: "99%", borderTop: "2px solid #1976d2" }}
      >
        <div className="card-body">
          <div className="flex-container">
            <div className="box column1">
              <h2 className="card-title text-left">Kasir</h2>
            </div>

            <div className="box column2" />
          </div>
          <hr className="hr2" />
          <div
            className="alert alert-warning alert-dismissible fade show"
            role="alert"
          >
            <strong>Lengkapi Form Pembayaran </strong>
            dibawah.
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <Form
            antrian_kasir={this.props.antrian.id}
            kasir={this.props.antrian.no_rm}
          />
        </div>
      </div>
    );
  }
}

export default Pembayaran;
