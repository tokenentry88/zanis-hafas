import axios from "axios";
const apiURL = "http://10.6.35.1:8005";

let tambahDetailPesananObat = ({ uid_obat, doResep }) => {
  return axios.post(
    apiURL + "/api/v1/detail-pesanan-obat/" + uid_obat,
    doResep,
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
};

export default tambahDetailPesananObat;
