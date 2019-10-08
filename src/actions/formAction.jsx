import api from './api';
import { SUBMIT_FORM_ACTION } from './constants';

const submitForm = (formData) => {
  // console.log('formdata in action ', formData);
  api.defaults.baseURL = formData.domain;
  api.defaults.headers.common['x-api-key'] = formData.key;
  const url = '';
  return ({
    type: SUBMIT_FORM_ACTION,
    payload: api.post(url, formData),
  });
};

export default submitForm;
