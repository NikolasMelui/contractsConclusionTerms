import Api from '@/services/Api';
import qs from 'qs';

export default {
  firebaseGet() {
    return Api().post('firebaseGet');
  },
  firebaseSet(credentials) {
    return Api().post('firebaseSet', JSON.stringify(credentials));
  },
};
