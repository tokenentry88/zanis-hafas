import axios from "axios";

const apiURL = "http://192.168.100.250:8005";

let listStokObat = uid => {
  return axios.get(apiURL + "/api/v1/stok-obat/" + uid);
};

export default listStokObat;
