import axios from 'axios';

const ApiUF = axios.create({
  baseURL: 'https://servicodados.ibge.gov.br/api/v1/localidades',
});

export default ApiUF;
