import {Constants} from "../constants/Constants";
import CookieHandler from "../utils/cookieHandler";

const getAuthHeader = () => {
  return {
    "Accept": "application/json, text/plain",
    "Content-Type": "application/json; charset=UTF-8",
    "Authorization": "Bearer " + CookieHandler.getCookie("access"),
  }
};

const statusHandler = (response) => {
  return response.status === 200 || response.status === 201
    ? Promise.resolve(response)
    : Promise.reject(response);
};

const jsonHandler = (response) => {
  return response.json();
};

const makePostRequest = (relativeUrl, requestBody, isAuth, isFormData) => {
  const url = Constants.HOST + relativeUrl;
  let options = {
    method: "POST",
    body: requestBody,
  }
  if (!isFormData) {
    options.headers = getAuthHeader();
  }
  return fetch(url, options)
    .then(statusHandler)
    .then(jsonHandler)
    .then((data) => data)
    .catch((error) => false);
};

const makeGetRequest = (relativeUrl) => {
  const url = Constants.HOST + relativeUrl;
  const options = { headers: getAuthHeader() };
  return fetch(url, options)
    .then(statusHandler)
    .then(jsonHandler)
    .then((data) => data)
    .catch((error) => false);
};

const Api = {
  makePostRequest,
  makeGetRequest
}

export default Api;