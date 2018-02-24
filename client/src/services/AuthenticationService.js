import Api from '@/services/Api';

export default {
  firebaseGet() {
    return Api().post('firebaseGet');
  },
  firebaseSet(credentials) {
    return Api().post('firebaseSet', credentials);
  },
};
