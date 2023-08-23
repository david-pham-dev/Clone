import axios from '../axios';
import * as queryString from 'query-string';
import actionTypes from '../store/actions/actionTypes';

const adminService = {
  /**
   * Đăng nhập hệ thống
   * {
   *  "username": "string",
   *  "password": "string"
   * }
   */
  login(loginBody) {
    return axios.post(`/admin/login`, loginBody);
  },
};

export default adminService;
