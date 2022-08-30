import {
    useEffect,
    useReducer,
    useState,
 } from 'react';
 import axios from 'axios';
 
 /**
  * Action types for the apiReducer.
  */
 const REQUEST = 'REQUEST';
 const SUCCESS = 'SUCCESS';
 const FAILURE = 'FAILURE';
 
 /**
  * The reducer that updates the state of the useApi hook.
  */
 const apiReducer = (state = [], action = {}) => {
    switch (action.type) {
       case REQUEST:
          return {
             ...state,
             status: 'loading'
          };
       case SUCCESS:
          return {
             ...state,
             status: null,
             data: action.data || null,
          };
       case FAILURE:
          return {
             ...state,
             status: 'error',
             message: action.message || null,
             errorCode: action.errorCode
          };
       default:
          return state;
    }
 };
 
 /**
  * A hook to make api requests and easily manage the response state.
  * 
  * @param {String} initUrl - The endpoint of the api.
  * @param {Object} initOpts - Additional options for the request.
  * @return {Array} [{data, status, message, errorCode}, makeRequest] - [{api state}, fetch]
  */
 const useApi = (initialUrl = '', initOpts = {}) => {
    const [ options, setOptions ] = useState('');
    const [ { data, status, message, errorCode }, dispatchAPI ] = useReducer(apiReducer, {
       data: null,
       status: null,
       message: null,
       errorCode: null
    });
 
    const makeRequest = (url = initialUrl, opts = {}) =>
       setOptions({
          baseURL: initOpts.baseUrl,
          headers: {
          "cache-control": "max-age=31536000",
          Accept: "application/json",
          "Content-Type": "application/json"
       }, ...initOpts, ...{ url, ...opts } });
 
    useEffect(
       () => {
          let didCancel = false;
 
          const fetchData = async () => {
             dispatchAPI({ type: REQUEST });
 
             try {
                const result = await axios(options);
                if (!didCancel) {
                   dispatchAPI({ type: SUCCESS, data: result.data });     
                }
             } catch (error) {
                if (!didCancel) {
                   dispatchAPI({ type: FAILURE, message: error.response?.data?.message || error.message, errorCode: error.response?.status });
                }
             }
          };
 
          fetchData();
          return () => {
             didCancel = true;
          };
       },
       [ options ],
    );
    return [
       {
          data,
          status,
          loading: status === 'loading',
          error: status === 'error',
          message,
          errorCode
       },
       makeRequest
    ];
 };
 
 export default useApi;