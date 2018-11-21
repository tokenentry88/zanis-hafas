import React, { Component } from "react";
import "../../../ASSETS/CSS/TambahPelayananAntrian.css";

class SoapPasien extends Component {
  constructor() {
    super();
    this.state = {
      showMe: false
    };
  }

  showHide(value) {
    this.setState({ showMe: value });
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <div className="boxsoap">Vital Sign</div>
            <div className="isisoap">
              <table>
                <tbody>
                  <tr>
                    <td>Sistole</td>
                    <td>
                      <input type="number" refs="sistole" />
                    </td>
                  </tr>
                  <tr>
                    <td>Diastole</td>
                    <td>
                      <input type="number" refs="disatole" />
                    </td>
                  </tr>
                  <tr>
                    <td>Suhu</td>
                    <td>
                      <input type="number" refs="suhu" />
                    </td>
                  </tr>
                  <tr>
                    <td>Pulse</td>
                    <td>
                      <input type="number" refs="pulse" />
                    </td>
                  </tr>
                  <tr>
                    <td>Respirasi</td>
                    <td>
                      <input type="number" refs="respirasi" />
                    </td>
                  </tr>
                  <tr>
                    <td>Tinggi</td>
                    <td>
                      <input type="number" refs="tinggi" />
                    </td>
                  </tr>
                  <tr>
                    <td>Berat</td>
                    <td>
                      <input type="number" refs="berat" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-md-10">
            <div className="row maxrow">
              <div className="col-md-10">
                <input
                  type="text"
                  refs="pencariansoap"
                  placeholder="Cari Nama Template SOAP"
                  className="form-control"
                />
              </div>
              <div className="col-md-2" style={{ marginTop: "-5px" }}>
                <button className="btn btn-cyan mt-0 mb-0 btn-sm ">
                  Salin
                </button>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 rowsoap">
                <div className="legendtitle">Subjektif</div>
                <textarea
                  placeholder="Isi Form Tindakan"
                  name="textarea"
                  className="textarea"
                />
              </div>
              <div className="col-md-6 rowsoap">
                <div className="legendtitle">Analisa</div>
                <textarea
                  placeholder="Isi Form Tindakan"
                  name="textarea"
                  className="textarea"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 rowsoap">
                <div className="legendtitle">Objektif</div>
                <textarea
                  placeholder="Isi Form Tindakan"
                  name="textarea"
                  className="textarea"
                />
              </div>
              <div className="col-md-6 rowsoap">
                <div className="legendtitle">Tindakan</div>
                <textarea
                  placeholder="Isi Form Tindakan"
                  name="textarea"
                  className="textarea"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 rowsoap">
                <div className="custom-radios">
                  <div>
                    <input
                      type="radio"
                      id="color-2"
                      name="janispasien"
                      value="color-2"
                      onClick={() => this.showHide(true)}
                    />
                    <label htmlFor="color-2" className="radio-inline">
                      <span />
                    </label>
                    Simpan Template SOAP
                  </div>
                </div>
              </div>

              <div className="col-md-6 rowsoap">
                {this.state.showMe ? (
                  <input type="text" name="nama_soap" />
                ) : null}
              </div>
            </div>
          </div>

          <div className="row maxrow" style={{ margin: "10px" }}>
            <div className="col-md-2">Diagnosa</div>
            <div className="col-md-10">
              <input
                type="text"
                placeholder="isi diagnosa"
                className="form-control"
              />
            </div>
          </div>
          <div className="col-md-12">
            <div className="modal-footer justify-content-center">
              <button className="btn btn-primary">Simpan</button>
              <button className="btn btn-warning">Bersihkan</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default SoapPasien;