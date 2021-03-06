import React, { Component } from "react";
import tambahTindakan from "../../../Methods/Poli/Tindakan/tambahTindakan";
import editTindakan from "../../../Methods/Poli/Tindakan/editTindakan";
import Sukses from "../Animasi/Sukses";
import Gagal from "../Animasi/Gagal";
// import detailTindakan from "../../../Methods/Poli/Tindakan/detailTindakan";

class TambahTindakan extends Component {
  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
    this.state = {
      showMe: false,
      nama_tindakan: "",
      biaya_tindakan: "",
      jenis: "Oral",
      notification: ""
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.action === "edit") {
      this.setState({
        uid: nextProps.selected.uid,
        nama_tindakan: nextProps.selected.nama_tindakan,
        biaya_tindakan: nextProps.selected.biaya_tindakan,
        jenis: nextProps.selected.jenis
      });
    }
  }

  handleSave() {
    if (this.props.action === "add") {
      tambahTindakan({
        nama_tindakan: this.state.nama_tindakan,
        biaya_tindakan: this.state.biaya_tindakan,
        jenis: this.state.jenis
      })
        .then(() => {
          this.setState({ notification: <Sukses /> });
        })
        .catch(() => this.setState({ notification: <Gagal /> }));
    } else {
      editTindakan({
        uid: this.state.uid,
        nama_tindakan: this.state.nama_tindakan,
        biaya_tindakan: this.state.biaya_tindakan,
        jenis: this.state.jenis
      })
        .then(() => {
          this.setState({ notification: <Sukses /> });
        })
        .catch(() => this.setState({ notification: <Gagal /> }));
    }
  }

  render() {
    return (
      <div
        className="modal fade right"
        id="tambahTindakan"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="myModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-notify modal-info" role="document">
          <div className="modal-content">
            <div className="modal-header info-color text-white text-center ">
              <h4 className="modal-title w-100" id="myModalLabel">
                Tambah Tindakan
              </h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true" className="white-text">
                  &times;
                </span>
              </button>
            </div>

            <div className="modal-body">
              <form method="POST">
                <div className="row">
                  <div className="col-md-12">
                    <div className="md-form mb-0">
                      <input
                        type="text"
                        name="nama_tindakan"
                        value={this.state.nama_tindakan}
                        className="form-control"
                        placeholder="Nama Tindakan"
                        onChange={event =>
                          this.setState({
                            nama_tindakan: event.target.value
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="md-form mb-0">
                      <input
                        type="number"
                        name="biaya_tindakan"
                        value={this.state.biaya_tindakan}
                        className="form-control"
                        placeholder="Tarif"
                        onChange={event =>
                          this.setState({
                            biaya_tindakan: event.target.value
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="md-form mb-0">
                      <span>Jenis Tindakan</span>
                      <select
                        className="custom-select"
                        name="jenis"
                        value={this.state.jenis}
                        onChange={event =>
                          this.setState({
                            jenis: event.target.value
                          })
                        }
                      >
                        <option value="">---Jenis Tindakan---</option>
                        <option value="Oral">Oral</option>
                        <option value="Laboratorium">Laboratorium</option>
                        <option value="Radiologi">Radiologi</option>
                        <option value="Fisiologi">Fisiologi</option>
                      </select>
                    </div>
                  </div>
                </div>
              </form>
              {this.state.notification}
            </div>

            <div className="modal-footer justify-content-center">
              <button className="btn btn-info" onClick={this.handleSave}>
                Simpan
              </button>
              <button
                className="btn btn-outline-info waves-effect"
                data-dismiss="modal"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TambahTindakan;
