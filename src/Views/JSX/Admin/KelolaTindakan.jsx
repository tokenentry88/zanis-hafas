import React, { Component } from "react";
import TambahDaftarTindakan from "../../../Components/JSX/Admin/TambahTindakan";
import HapusDaftarTindakan from "../../../Components/JSX/hapusModal";
import listTindakan from "../../../Methods/Poli/Tindakan/listTindakan";

class KelolaTindakan extends Component {
  constructor(props) {
    super(props);
    this.addModal = this.addModal.bind(this);
    this.editModal = this.editModal.bind(this);
    // this.deleteItem = this.deleteItem.bind(this);
    this.state = {
      filter: "",
      tindakan: [],
      selected: {},
      action: "",
      field: ""
    };
  }
  onChange(e) {
    var filter = e.target.value;
    listTindakan().then(({ data }) => {
      this.setState({
        obat: data,
        filter: filter
      });
    });
  }

  addModal() {
    this.setState({ selected: {}, action: "add" });
  }

  editModal({ uid, nama_tindakan, biaya_tindakan }) {
    this.setState({
      selected: {
        uid,
        nama_tindakan,
        biaya_tindakan
      },
      action: "edit"
    });
  }

  deleteModal({ uid }) {
    this.setState({
      selected: {
        uid
      },
      field: "tindakan"
    });
  }

  renderDaftarTindakan = ({ uid, nama_tindakan, biaya_tindakan }) => {
    if (this.state.filter !== "") {
      return (
        <div className="row1" key={uid}>
          <div className="cell">{nama_tindakan}</div>
          <div className="cell text-right">Rp. {biaya_tindakan}</div>

          <div className="cell text-center">
            <button
              className="btn btn-primary btn-sm"
              onClick={() =>
                this.editModal({ uid, nama_tindakan, biaya_tindakan })
              }
              data-toggle="modal"
              data-target="#tambahTindakan"
            >
              Ubah
            </button>
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={() => this.deleteModal({ uid })}
              data-toggle="modal"
              data-target="#hapus"
            >
              Hapus
            </button>
          </div>
        </div>
      );
    }
  };

  render() {
    let header;
    const { filter, tindakan } = this.state;

    const filteredTindakan = tindakan.filter(tindakan => {
      return (
        tindakan.nama_tindakan.toLowerCase().indexOf(filter.toLowerCase()) !==
        -1
      );
    });
    if (filteredTindakan.length !== 0 && filter !== "") {
      header = (
        <div className="table">
          <div className="row1 header">
            <div className="cell">Tindakan</div>
            <div className="cell">Biaya</div>
            <div className="cell">Aksi</div>
          </div>
          {filteredTindakan.map(tindakan => {
            return this.renderDaftarTindakan(tindakan);
          })}
        </div>
      );
    } else if (filteredTindakan.length === 0 && filter !== "") {
      header = (
        <div className="table">
          <div className="row1">
            <div className="cell">Tindakan tidak tersedia</div>
          </div>
        </div>
      );
    } else {
      header = (
        <div
          className="alert alert-warning alert-dismissible fade show"
          role="alert"
        >
          <strong>Untuk melihat data tindakan</strong> klik menu pencarian.
        </div>
      );
    }

    return (
      <div className="card" style={{ borderTop: "2px solid #1976d2" }}>
        <div className="card-body">
          <div className="flex-container">
            <div className="box column1">
              <h2 className="card-title text-left">
                Daftar Tindakan{" "}
                <button
                  className="btn btn-sm btn-primary"
                  data-toggle="modal"
                  data-target="#tambahTindakan"
                  onClick={() => this.addModal()}
                >
                  Tambah Tindakan{" "}
                </button>
              </h2>
            </div>

            <div className="box column2">
              <div className="mainsearch">
                <div className="form-group has-search">
                  <span className="fa fa-search form-control-feedback" />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Cari Tindakan"
                    onChange={e => this.onChange(e)}
                  />
                </div>
              </div>
            </div>
          </div>
          <hr className="hr2" />
          <div className="row">
            <div className="col-md-12 rowsoap">{header}</div>
          </div>
          <TambahDaftarTindakan
            selected={this.state.selected}
            action={this.state.action}
          />
          <HapusDaftarTindakan
            selected={this.state.selected}
            field={this.state.field}
          />
        </div>
      </div>
    );
  }
}

export default KelolaTindakan;
