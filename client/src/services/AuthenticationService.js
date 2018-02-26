import Api from '@/services/Api';
// import qs from 'qs';

export default {
  actualEventsGet() {
    return Api().post('actualeventsget');
  },
  actualEventsSet(credentials) {
    return Api().post('actualeventsset', credentials);
  },
};
