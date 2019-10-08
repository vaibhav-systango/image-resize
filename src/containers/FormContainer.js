import { connect } from 'react-redux';

import FormComponent from '../components/CustomForm';
import submitForm from '../actions/formAction';


const mapDispatchToProps = dispatch => ({
  submitForm: formData => dispatch(submitForm(formData)),
});


export default connect(null, mapDispatchToProps)(FormComponent);
