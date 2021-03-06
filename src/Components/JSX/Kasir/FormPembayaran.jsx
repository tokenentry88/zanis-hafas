import React, { Component } from "react";
import "../../ASSETS/CSS/form.css";
import "../../ASSETS/CSS/Kwitansi.css";

import listTransaksi from "../../../Methods/Kasir/DetailTransaksi/listTransaksi";
import list from "../../../Methods/Kasir/Transaksi/listTransaksi";

import bayarTransaksi from "../../../Methods/Kasir/Transaksi/bayarTransaksi";
import ModalKonfirmasi from "../Animasi/ModalKonfirmasi";
import { date_format, conversi } from "../../../Methods/waktu";
import { Consumer } from "../../../Methods/User/Auth/Store";
import ReactToPrint from "react-to-print";
import { withContext } from "../../../Methods/HOC/withContext";
import { api } from "../../../Methods/api";

class FormPembayaran extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transaksi: [],
      daftarTransaksi: [],
      diskon: 0,
      notification: "0",
      selected: {},
      action: "",
      uid: "",

      no_transaksi: "",
      waktu_terbit: "",
      nama_pasien: "",
      total: 0
    };
  }

  componentDidMount = () => {
    listTransaksi(this.props.antrian_kasir)
      .then(({ data }) => {
        this.setState({
          transaksi: data,
          uid_transaksi: data[0].uid_transaksi
        });
      })
      .catch(err => err);
    list(this.props.getValue, this.props.antrian_kasir).then(({ data }) => {
      const filter = data.filter(e => e.uid === this.props.antrian_kasir);
      this.setState({
        daftarTransaksi: filter,
        no_transaksi: filter[0].no_transaksi,
        waktu_terbit: filter[0].waktu_terbit,
        alamat: filter[0].alamat,
        nama_pasien: filter[0].nama_pasien,
        total: filter[0].total
      });
    });
  };

  totalPrice = () => {
    return this.state.transaksi.reduce(
      (sum, i) => (sum += i.jumlah_item * i.biaya),
      0
    );
  };

  details = () => {
    return this.state.transaksi.map(e => (
      <tr key={e.uid}>
        <td className="fontBold">{e.item_transaksi}</td>
        <td style={{ fontSize: "12.5pt" }}>{e.jumlah_item} </td>
        <td style={{ fontSize: "12.5pt" }}>Rp.{conversi(e.biaya)}</td>
        <td style={{ fontSize: "12.5pt" }}>
          Rp.{conversi(e.jumlah_item * e.biaya)}
        </td>
      </tr>
    ));
  };

  getDiskon = () => {
    let harga = this.totalPrice();
    return harga - this.state.diskon;
  };

  reset = nik => {
    bayarTransaksi({
      uid_transaksi: this.props.antrian_kasir,
      nik_kasir: nik,
      status: "CANCEL"
    })
      .then(
        this.setState({
          disabled: true,
          notification: "1"
        })
      )
      .catch(err => {
        console.log(err);
        this.setState({ notification: "0" });
      });
  };

  handleSave = nik => {
    bayarTransaksi({
      uid_transaksi: this.props.antrian_kasir,
      nik_kasir: nik,
      nomor_rekam_medis: this.props.kasir,
      status: "DONE",
      diskon: this.state.diskon,
      total: this.totalPrice()
    })
      .then(
        this.setState({
          disabled: true,
          notification: "1"
        })
      )
      .catch(err => {
        console.log(err);
        this.setState({ notification: "0" });
      });
  };

  render() {
    return (
      <React.Fragment>
        <div ref={el => (this.componentRef = el)}>
          <Consumer>
            {({ state }) => (
              <div className="container-flex">
                <div className="item-flex">
                  <img
                    src={api.logo + state.dataLogin.id_lokasi}
                    alt=""
                    style={{ width: "15%" }}
                  />
                  <h4>{state.dataLogin.alamat}</h4>
                </div>
              </div>
            )}
          </Consumer>
          <div className="boxpelayanan">
            <div className="container-flex">
              <h4>Tanggal: {date_format(this.state.waktu_terbit)}</h4>
              <h3>No: {this.state.no_transaksi}</h3>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th className="fontBold">Deskripsi</th>
                  <th className="fontBold">Jumlah</th>
                  <th className="fontBold">Harga</th>
                  <th className="fontBold">Total Harga</th>
                </tr>
              </thead>
              <tbody>
                {this.details()}
                <tr>
                  <td colSpan="2" />
                  <td className="fontBold">Total</td>

                  <td className="fontBold">Rp.{conversi(this.totalPrice())}</td>
                </tr>
                <tr>
                  <td colSpan="2" style={{ border: "none" }} />

                  <td className="fontBold">Disc</td>

                  <td style={{ fontSize: "12.5pt" }}>
                    Rp.
                    <input
                      type="text"
                      className="center"
                      value={this.state.diskon}
                      style={{
                        width: "150px",
                        outline: "none",
                        fontSize: "12.5pt"
                      }}
                      onChange={e => this.setState({ diskon: e.target.value })}
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan="2" style={{ border: "none" }} />
                  <td className="fontBold" style={{ background: "papayawhip" }}>
                    Total Pembayaran
                  </td>
                  <td
                    className="fontBold"
                    style={{ background: "papayawhip", fontSize: "12.5pt" }}
                  >
                    Rp.{conversi(this.getDiskon())}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <Consumer>
            {({ state }) => (
              <ul className="cont">
                <li>Pasien</li>
                <li>Petugas</li>
                <li style={{ marginTop: "40px" }}>{this.state.nama_pasien}</li>
                <li style={{ marginTop: "40px" }}>{state.dataLogin.nama}</li>
              </ul>
            )}
          </Consumer>

          <ModalKonfirmasi
            notification={this.state.notification}
            modal="notification2"
          />
        </div>
        <div className="main">
          <div className="modal-footer justify-content-center">
            <Consumer>
              {({ state }) => (
                <button
                  className="btn btn-primary"
                  data-toggle="modal"
                  data-target="#notification2"
                  onClick={() => this.handleSave(state.dataLogin.nik)}
                >
                  Simpan
                </button>
              )}
            </Consumer>

            <button
              className="btn btn-warning"
              disabled={this.state.disabled}
              data-toggle="modal"
              data-target="#notification2"
              onClick={() => this.reset()}
            >
              Cancel
            </button>

            <ReactToPrint
              trigger={() => (
                <a href={null}>
                  <button className="btn btn-warning md">Print</button>
                </a>
              )}
              content={() => this.componentRef}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withContext(FormPembayaran);
