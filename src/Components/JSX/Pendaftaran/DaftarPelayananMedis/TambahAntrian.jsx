import React, { Component } from "react";
import tambahAntrian from "../../../../Methods/Pendaftaran/Antrian/tambahAntrian";
import tambahTransaksi from "../../../../Methods/Kasir/Transaksi/tambahTransaksi";
import ModalKonfirmasi from "../../Animasi/ModalKonfirmasi";
// import ModalKonfirmasiTindakan from "../../Animasi/ModalKonfirmasiTindakan";
import { Consumer } from "../../../../Methods/User/Auth/Store";
import listDokter from "../../../../Methods/Poli/Dokter/listDokter";
import { withContext } from "../../../../Methods/HOC/withContext";

class TambahAntrian extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);

    this.state = {
      showMe: false,
      antrian: {
        jaminan: "",
        nomor_rekam_medis: "",
        dokter: "",
        poli: "",
        notification: "0",
        jenis_pembayaran: ""
      },
      id_lokasi: "",
      list_dokter: []
    };
  }

  componentDidMount() {
    this._isMounted = true;
    listDokter(this.props.getValue)
      .then(({ data }) => {
        if (this._isMounted) {
          this.setState({
            list_dokter: data
          });
        }
      })
      .catch(err => err);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  showToggle = () => {
    const { showMe } = this.state;
    this.setState({ showMe: !showMe });
  };

  handleSave = (nik, id_lokasi) => {
    tambahTransaksi({
      nik_penerbit: nik,
      id_lokasi: id_lokasi,
      nomor_rekam_medis: this.props.pasien,
      penjamin: this.state.jaminan,
      jenis_pembayaran: this.state.jenis_pembayaran
    })
      .then(this.setState({ notification: "1" }))
      .catch(err => {
        console.log(err);
        this.setState({ notification: "0" });
      });
    tambahAntrian({
      id_lokasi: id_lokasi,
      nomor_rekam_medis: this.props.pasien,
      poli: this.state.poli,
      jaminan: this.state.jaminan,
      dokter: this.state.dokter
    })
      .then(this.setState({ notification: "1" }))
      .catch(err => {
        console.log(err);
        this.setState({ notification: "0" });
      });
  };

  render() {
    console.log("apa ni", this.state.list_dokter);
    return (
      <div className="card-box">
        <div className="flex-container">
          <div className="box column1">
            <h2 className="card-title text-left">
              Pendaftaran Pelayanan Medis
            </h2>
          </div>
        </div>
        <hr className="hr2" />
        <div className="form-group row">
          <label htmlFor="JenisPasien" className="col-sm-4 col-form-label">
            Jaminan
            <span className="required">*</span>
          </label>
          <div className="col-sm-5">
            <select
              className="form-control"
              onChange={event =>
                this.setState({
                  jaminan: event.target.value
                })
              }
              required
            >
              <option value="">--- Pilihan ---</option>
              <option value="Umum">Umum</option>
              <option value="BPJS">Asuransi BPJS</option>
              <option value="Lain-lain">Lain-lain</option>
            </select>
          </div>
        </div>
        {this.state.jaminan === "BPJS" || this.state.jaminan === "Lain-lain" ? (
          <div className="form-group row">
            <label htmlFor="nomor" className="col-sm-4 col-form-label">
              Nomor
              <span className="required">*</span>
            </label>
            <div className="col-sm-5">
              <input
                type="text"
                placeholder="Masukan Nomor"
                name="nomor"
                onChange={event => this.setState({ nomor: event.target.value })}
              />
            </div>
          </div>
        ) : null}
        <div className="form-group row">
          <label htmlFor="Poliklinik" className="col-sm-4 col-form-label">
            Poliklinik
            <span className="required">*</span>
          </label>
          <div className="col-sm-5">
            <select
              className="form-control"
              onChange={event =>
                this.setState({
                  poli: event.target.value
                })
              }
              required
            >
              <option value="">--- Pilihan ---</option>
              <option value="Poliklinik Umum">Poliklinik Umum</option>
              <option value="Poliklinik Gigi">Poliklinik Gigi</option>
            </select>
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="NamaDokter" className="col-sm-4 col-form-label">
            Nama Dokter
            <span className="required">*</span>
          </label>
          <div className="col-sm-5">
            <select
              className="form-control"
              onChange={event =>
                this.setState({
                  dokter: event.target.value
                })
              }
              required
            >
              <option value="">--- Pilihan ---</option>
              {this.state.list_dokter.map(el => (
                <option value={el.nama_dokter}>{el.nama_dokter}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="JenisPembayaran" className="col-sm-4 col-form-label">
            Jenis Pembayaran
            <span className="required">*</span>
          </label>
          <div className="col-sm-5">
            <select
              className="form-control"
              onChange={event =>
                this.setState({
                  jenis_pembayaran: event.target.value
                })
              }
              required
            >
              <option value="">--- Pilihan ---</option>
              <option value="CASH">CASH</option>
              <option value="KREDIT">KREDIT</option>
            </select>
          </div>
        </div>
        <div className="col-md-12">
          <div className="modal-footer justify-content-center">
            <Consumer>
              {({ state }) => (
                <button
                  className="btn btn-primary"
                  data-toggle="modal"
                  data-target="#konfirmasiAntrian"
                  onClick={() =>
                    this.handleSave(
                      state.dataLogin.nik,
                      state.dataLogin.id_lokasi
                    )
                  }
                  disabled={this.state.disabled}
                >
                  Simpan
                </button>
              )}
            </Consumer>
          </div>
        </div>

        <ModalKonfirmasi
          notification={this.state.notification}
          modal="konfirmasiAntrian"
        />
      </div>
    );
  }
}
export default withContext(TambahAntrian);
