import Axios from "axios";
import _ from "lodash";


const API_HOST =  process.env.REACT_APP_API_BASE_URL;
export { API_HOST }

const getApiFinalEndpoint = (endpoint) =>
  endpoint[0] === "/" ? `${API_HOST}${endpoint}` : `${API_HOST}/${endpoint}`;

/*
const getheaders = () => { return {
    authorization : `Basic ${getToken()}` || ""
}};*/

const apiDefaultOptions = () => { return {
 // headers: getheaders(),
  crossDomain : true,
  resultCondition: (r) => true,
}};


export const api = {

    post: (endpoint, data = {}, options) => {
      options = Object.assign(_.cloneDeep(apiDefaultOptions()), options);
      return new Promise((resolve, reject) => {
        Axios.post(getApiFinalEndpoint(endpoint), data, options)
          .then((suc) => {
            let success = _.get(suc, "data.success") || (suc.status ===200);
            if (success)
              return resolve(suc.data);
            return reject(suc);
          })
          .catch(reject);
      });
    },
    get: (endpoint, options) => {
      options = Object.assign(_.cloneDeep(apiDefaultOptions()), options);
      return new Promise((resolve, reject) => {
        //console.log(endpoint)
        Axios.get(getApiFinalEndpoint(endpoint), options)
          .then((suc) => {
            let success = _.get(suc, "data.success") || (suc.status ===200);
            if (success)
              return resolve(suc.data);
            return reject(suc);
          })
          .catch(reject);
      });
    },
    delete: (endpoint, options) => {
      options = Object.assign(_.cloneDeep(apiDefaultOptions()), options);
      return new Promise((resolve, reject) => {
        Axios.delete(getApiFinalEndpoint(endpoint), options)
          .then((suc) => {
            let success = _.get(suc, "data.success") || (suc.status ===200);
            if (success)
              return resolve(suc.data);
            return reject(suc);
          })
          .catch(reject);
      });
    },
  };