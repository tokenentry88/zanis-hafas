import axios from "axios";
import { api } from "../../api";

let puyer = ({
  nomor_rekam_medis,
  nama_racik,
  komposisi,
  nama_dokter,
  jumlah_racik,
  id_lokasi
}) => {
  console.log("miaww", {
    nomor_rekam_medis,
    nama_racik,
    komposisi,
    nama_dokter,
    jumlah_racik,
    id_lokasi
  });
  // return axios.post(api.apotik + "/racik", {
  //   nomor_rekam_medis,
  //   nama_racik,
  //   komposisi,
  //   nama_dokter,
  //   jumlah_racik,
  //   id_lokasi
  // });
};

export default puyer;
