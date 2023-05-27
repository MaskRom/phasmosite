import axios from "axios";

const uri = new URL(window.location.href);

export const api = axios.create({
  baseURL: `${uri.protocol}//${uri.hostname}${process.env.REACT_APP_DEBUG === 'true' ? ':8000' : ''}/api`,
  paramsSerializer: { indexes: null },
});