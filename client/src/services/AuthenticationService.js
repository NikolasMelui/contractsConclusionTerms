import Api from '@/services/Api';
// import qs from 'qs';

export default {
  getEvents() {
    return Api().post('/getevents');
  },
  pushEvent(credentials) {
    return Api().post('/pushevent', credentials);
  },
};
