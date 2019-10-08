import { connect } from 'react-redux';

import Ratio from '../components/Ratio/Ratio';
import submitForm from '../actions/formAction';


const mapDispatchToProps = dispatch => ({
  getVaryingImageSize: formData => dispatch(submitForm(formData)),
});


export default connect(null, mapDispatchToProps)(Ratio);
