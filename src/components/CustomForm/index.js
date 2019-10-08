/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react'
import { Button, Form, Grid, Segment, Icon } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import checkResponseStatus from '../../utils/utilityMethod';
import './style.scss';
const queryString = require('query-string');



class CustomForm extends Component{
    constructor(props) {
        super(props)
        this.state = {
            key: '',
            domain: '',
            imageUrl: '',
            height: '',
            width: '',
            responseImage: '',
            dimensions:{height:'',
                        width:''
        }
        };
    }

    componentDidMount(){
        const queryParameters = queryString.parse(window.location.search);
        if(queryParameters.API_endpoint && queryParameters.Secret_key){
            this.setState({domain:queryParameters.API_endpoint,
                            key: queryParameters.Secret_key})
        }else if(queryParameters.API_endpoint){
            this.setState({domain:queryParameters.API_endpoint})
        }else if(queryParameters.Secret_key){
            this.setState({key: queryParameters.Secret_key})
        }else if(localStorage.getItem('imageInfo')){
            const retrivedData = JSON.parse(localStorage.getItem('imageInfo'));
            if(retrivedData.domain && retrivedData.key){
                this.setState({domain:retrivedData.domain,
                    key: retrivedData.key})
            }
        }
    }

    changeMethod = (e) => {
        const { name, value } = e.target
        // console.log(name, value)
        this.setState({[name]: value})
    }
    submitForm =(e) => {
        e.preventDefault()
        // console.log('final form field values ',this.state);
        const domainRegex = /^(https:\/\/.|www\.){1}[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
        if(!domainRegex.test(this.state.domain)){
            toast.error('Enter a valid api domain', {
                position: toast.POSITION.TOP_RIGHT
              });
              return 0;
        }
        localStorage.setItem('imageInfo', JSON.stringify(this.state));
        this.props.submitForm(this.state).then((response) => {
            if(response.value.status === 200){
                // console.log('geting response in comp ', response)
                this.setState({responseImage: response.value.data.imageData,
                               dimensions:{ height: response.value.data.height,
                                            width: response.value.data.width}})
            }
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
        }) 
    }
    // onImgLoad =({target:img}) => {
    //     this.setState({dimensions:{height:img.offsetHeight,
    //                                width:img.offsetWidth}}, () => {console.log('dimension value ', this.state)});
    // }
    resetState = () => {
        this.setState({
            imageUrl: '',
            height: '',
            width: '',
            responseImage: '',
            dimensions:{height:'',
                        width:''
        }
        })
    }
    render() {
        const { imageUrl, responseImage, height, width, domain, key } = this.state
        return (
                <>
                 <Grid columns="equal" stretched className='resizerForm mt-4'> 
                    <Grid.Column>
                      <Segment className="px-3">
                      <Form onSubmit={this.submitForm}>
                      <Form.Field>                       
                        <label>API endpoint</label>
                        <input name="domain" value={domain} placeholder="url" onChange={this.changeMethod} required/>
                        </Form.Field>
                        <Form.Field>                       
                        <label>Secret Key</label>
                        <input name="key" value={key} placeholder="key" onChange={this.changeMethod} required/>
                        </Form.Field>
                        <Form.Field>                       
                        <label>Image url</label>
                        <input name="imageUrl" value={imageUrl} placeholder="Image url" onChange={this.changeMethod} required/>
                        </Form.Field>
                        <Form.Field>
                        <label>Height</label>
                        <input name="height" type='number' min="1" value={height} placeholder="Height" onChange={this.changeMethod}/>
                        </Form.Field>
                        <Form.Field>
                        <label>Width</label>
                        <input name="width" type='number' min="1" value={width} placeholder="Width" onChange={this.changeMethod}/>
                        </Form.Field>
                        <div className="d-flex justify-content-center">
                            {responseImage === '' && <Button type="submit" className=" submitBtn "secondary>Submit</Button>}
                                                {/* <Button type="submit" className=" ml-3 TestBtn">Test Me</Button></> */}
                        </div>
                    </Form>
                        {responseImage !== '' && <div className="mt-3 d-flex justify-content-center">
                                                      <Button onClick={this.resetState} className="resrBtn">Reset</Button> 
                                                      <Button onClick={() => {this.props.history.push('/ratio')}} className=" ml-3 submitBtn "secondary>More Features</Button>
                                                 </div>}
                      </Segment>
                    </Grid.Column>
                    <Grid.Column > 
                        <Segment className="auto " placeholder textAlign="center">
                            {responseImage === '' && <Icon name='image outline' size="huge" className="auto"  />}
                            {responseImage !== '' && <img src={`data:image/png;base64, ${responseImage}`} height={this.state.dimensions.height} width={this.state.dimensions.width}/> }
                        </Segment>
                    </Grid.Column>
                     
                </Grid>

               
                </>
            )
    }
    
}

export default CustomForm;
