import axios from 'axios';

const ApiCamara = axios.create({
  baseURL: 'https://dadosabertos.camara.leg.br/api/v2',
});

export default ApiCamara;
