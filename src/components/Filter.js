import { connect } from 'react-redux';
import { updateFiltering } from './../actions';
import React, { Component } from 'react';
import { 
  Button,
  Card,
  CardHeader,
  CardBody,
  Collapse
 } from 'reactstrap';
import OptionList from "./OptionList";

class Filter extends Component {
    constructor(props) {
      super(props);
  
      this.handleOption = this.handleOption.bind(this);
      this.toggle = this.toggle.bind(this);
      this.state = { 
        activeOptions : []
       };
      if(window.innerWidth < 576) {
        this.state.collapse = false;
      } else {
        this.state.collapse = true;
      }
    }
    
    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }
    
    handleOption(checked, option) {
    
      // console.log(this.props.filter);
      if(checked && !this.state.activeOptions.includes(option)) {
        this.setState({
          ...this.state,
          activeOptions: this.state.activeOptions.concat(option)
        }, () => this.props.updateFiltering(
            this.props.filter.label, 
            this.state.activeOptions)
        )
      }
  
      if(!checked && this.state.activeOptions.includes(option)) {
        this.setState({
          ...this.state,
          activeOptions: this.state.activeOptions.filter(e => e !== option)
        }, () => this.props.updateFiltering(
            this.props.filter.label, 
            this.state.activeOptions)
        )
      }
      
    }
  
    render() {
      const filter = this.props.filter;
      return(
        <Card className="w-100 rounded-0 filter-container border-0 bg-light">
          <Button onClick={this.toggle} color="link" block>
            <CardHeader tag="h5" className="filter__label text-left pl-2">
              {filter.displayName}
            </CardHeader>
          </Button>
          <Collapse isOpen={this.state.collapse} className={this.state.collapse ? "filter__options-container--open" : ""}>
            <CardBody className="pt-0">
              <OptionList options={filter.options} handleOption={this.handleOption}></OptionList>
            </CardBody>
          </Collapse>
        </Card>
      )
    }
  }

const mapStateToProps = (state) => {
    return {
        filters: state.filters,
    }
}
  
  
export default connect(mapStateToProps, { updateFiltering })(Filter);