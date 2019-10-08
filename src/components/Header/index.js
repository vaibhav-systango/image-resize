/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import { Image, Segment } from 'semantic-ui-react';
import Logo from './logo.svg';

class TopHeader extends Component {
  render() {
    return (
      <Segment clearing className="siteHeader">
        <Image src={Logo} size="small" style={{'cursor':'pointer'}} onClick={() => { this.props.history.push('/'); }} />
      </Segment>
    );
  }
}

export default TopHeader;
