/* eslint-disable no-plusplus */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import './style.scss';
import 'react-toastify/dist/ReactToastify.css';
import {
  Container, Image, Placeholder,
} from 'semantic-ui-react';
import TopHeader from '../Header';
import checkResponseStatus from '../../utils/utilityMethod';


const imageSizeArray = [35, 80, 150, 300, 402, 401, 400];

export default class Ratio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: true,
      imageData: {
        35: '',
      },
    };
  }

  componentDidMount() {
    const { getVaryingImageSize } = this.props;
    const retrivedData = JSON.parse(localStorage.getItem('imageInfo'));
    const arrayResponse = {};
    let dataobj;
    for (let i = 0; i < imageSizeArray.length; i++) {
      if (imageSizeArray[i] === 400) {
        dataobj = {
          width: imageSizeArray[i],
          height: imageSizeArray[i],
          imageUrl: retrivedData.imageUrl,
          domain: retrivedData.domain,
          key: retrivedData.key,
          greyscale: true,
        };
      } else if (imageSizeArray[i] === 401) {
        dataobj = {
          height: imageSizeArray[i],
          width: imageSizeArray[i],
          imageUrl: retrivedData.imageUrl,
          domain: retrivedData.domain,
          key: retrivedData.key,
          invert: true,
        };
      } else if (imageSizeArray[i] === 402) {
        dataobj = {
          height: imageSizeArray[i],
          width: imageSizeArray[i],
          imageUrl: retrivedData.imageUrl,
          domain: retrivedData.domain,
          key: retrivedData.key,
          normalize: true,
        };
      } else {
        dataobj = {
          width: imageSizeArray[i],
          height: imageSizeArray[i],
          imageUrl: retrivedData.imageUrl,
          key: retrivedData.key,
          domain: retrivedData.domain,
        };
      }
      getVaryingImageSize(dataobj).then((response) => {
        if (response.value.status === 200) {
          // console.log('geting response in comp ', response);
          arrayResponse[response.value.data.width] = response.value.data.imageData;
          // console.log('arrayResponse ', arrayResponse);
        }
        this.setState({ imageData: arrayResponse }, () => { });
      }).catch(error => {
        let errMsg;
        if(error.response && error.response.data && error.response.data.message) {
            errMsg = error.response.data.message
        }else {
            errMsg = checkResponseStatus(error)
        }
          toast.error(errMsg, {
            position: toast.POSITION.TOP_RIGHT
          });
      });
    }
  }

  render() {
    const { imageData } = this.state;
    const { history } = this.props;
    // console.log(imageData[35], 'hello 44444');
    return (
      <>
        <TopHeader history={history}/>
        <Container>
          <div className="imageSize">
          <div className="imageBlock">
                  <span>300 X 300</span>
                  {imageData[300] ? <Image src={`data:image/jpeg;base64, ${imageData[300]}`} />
                    : (
                      <Placeholder style={{ height: 150, width: 150 }}>
                        <Placeholder.Image />
                      </Placeholder>
                    )}
                </div> 
                <div className="imageBlock">
                  <span>150 X 150</span>
                  {imageData[150] ? <Image src={`data:image/jpeg;base64, ${imageData[150]}`} />
                    : (
                      <Placeholder style={{ height: 150, width: 150 }}>
                        <Placeholder.Image />
                      </Placeholder>
                    )}
                </div>
                <div className="imageBlock">
                  <span>80 X 80</span>
                  {imageData[80] ? <Image src={`data:image/jpeg;base64, ${imageData[80]}`} />
                    : (
                      <Placeholder style={{ height: 150, width: 150 }}>
                        <Placeholder.Image />
                      </Placeholder>
                    )}
                </div>
                <div className="imageBlock">
                  <span>35 X 35</span>
                  {imageData[35] ? <Image src={`data:image/jpeg;base64, ${imageData[35]}`} />
                    : (
                      <Placeholder style={{ height: 150, width: 150 }}>
                        <Placeholder.Image />
                      </Placeholder>
                    )}
                </div>
               <div className="imageBlock">
                  <span>Grey Scale </span>
                  {imageData[400] ? <Image src={`data:image/jpeg;base64, ${imageData[400]}`} />
                    : (
                      <Placeholder style={{ height: 150, width: 150 }}>
                        <Placeholder.Image />
                      </Placeholder>
                    )}
                </div>
                <div className="imageBlock">
                  <span>Inverted </span>
                  {imageData[401] ? <Image src={`data:image/jpeg;base64, ${imageData[401]}`} />
                    : (
                      <Placeholder style={{ height: 150, width: 150 }}>
                        <Placeholder.Image />
                      </Placeholder>
                    )}
                </div>
                <div className="imageBlock">
                  <span>Normalized </span>
                  {imageData[402] ? <Image src={`data:image/jpeg;base64, ${imageData[402]}`} />
                    : (
                      <Placeholder style={{ height: 150, width: 150 }}>
                        <Placeholder.Image />
                      </Placeholder>
                    )}
                </div>
            </div>
        </Container>
      </>
    );
  }
}

Ratio.defaultProps = {
  history: {},
};

Ratio.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  getVaryingImageSize: PropTypes.func,
};
