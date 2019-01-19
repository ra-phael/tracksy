import React, { Component } from 'react';
import { CustomInput } from 'reactstrap';

class OptionList extends Component {
    constructor(props) {
      super(props);
  
      this.toggleCheckbox = this.toggleCheckbox.bind(this);
    }
  
    toggleCheckbox = (e) => {
        console.log('chekbox toggled');
      this.props.handleOption(e.target.checked, e.target.id);
    }
  
    render() {
      const options = this.props.options;
  
      return(
        options.map((option) => {
          return(
            <CustomInput type="checkbox" onChange={ this.toggleCheckbox } id={option.option} label={option.displayName}></CustomInput>
          )
        })
      )
  
    }
  }

export default OptionList;  