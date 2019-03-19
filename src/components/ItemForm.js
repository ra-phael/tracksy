import React, { Component } from "react";
import { 
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from 'reactstrap';


export default class ItemForm extends Component {
  constructor(props){
    super(props)

    this.state = {
      brand: '',
      name: '',
    }

    this.onSubmit = this.onSubmit.bind(this);
  }
  
  onSubmit() {
    console.log('Item form submitted')
  }

  render() {
    return (
      <Form>
        <FormGroup>
          <Label for="brandName">Brand</Label>
          <Input type="text" name="brandName" id="brandName"
           placeholder="Item's brand" />
        </FormGroup>
        <FormGroup>
          <Label for="itemName">Name / Model</Label>
          <Input type="text" name="itemName" id="itemName"
           placeholder="Item's name" />
        </FormGroup>
        <div className="text-center">
          <Button outline color="dark" className="rounded-0"
          onClick={this.onSubmit}>Submit</Button>
        </div>
      </Form>
    )
  }
}