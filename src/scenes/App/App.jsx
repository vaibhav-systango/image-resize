import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

import { Container } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import CustomForm from '../../containers/FormContainer';
import TopHeader from '../../components/Header';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();
const App = (props) => {
  const { history } = props;
  return (
    <>
      <TopHeader history={history} />
      <Container>
        <center><div style={{ fontSize: '30px', fontWeight: 'bold' }}>Image Resize Test App</div></center>
        <CustomForm history={history} />
      </Container>
    </>
  );
};

App.defaultProps = {
  history: {},
};

App.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

export default App;
