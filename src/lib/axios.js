import baseAxios from 'axios';
// eslint-disable-next-line import/extensions
import config from 'config.js';

export default function initializeAxios() {
  return baseAxios.create({
    baseURL: config.SERVER_HOST,
    timeout: 10 * 60 * 1000, // 10 minutes
  });
}
