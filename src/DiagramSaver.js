import React, { PureComponent } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class FormExample extends PureComponent {
  constructor(...args) {
    super(...args);
    this.state = { 
        validated: false, 
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      console.log('handleSubmit not valid');
      event.stopPropagation();
    } else {
      this.props.handleSave();
    }
    this.setState({ validated: true});
    console.log('handleSubmit validation completed');
    
    event.preventDefault();
  }
  
    dataFetcher(searchText) {
    console.log(`filter with ${searchText}`);
    var url = 'https://nodejs-sql.glitch.me/products?searchName=' +searchText;
    fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(myJson => {
      console.log(myJson);
      this.setState({
        dataToShow : myJson
      });
    })
    .catch(error => console.error(error))
  }
  
  // event is generated from the <input>
  handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        console.log("DiagramEditor.handleChange", name,'=', value);
        this.props.handleForm({
          [name]: value,
        });
  };
  

  render() {
    // noValidat means novlidate natively
    // validated true to show errors 
    //  initially false
    return (
      <Form
        noValidate
        validated={this.state.validated}
        onSubmit={this.handleSubmit}
      >

          <Form.Group  controlId="validationCustom01">
            <Form.Label>Name</Form.Label>
            <Form.Control
              required
              pattern="[A-Za-z0-9]{1}.*[A-Za-z)0-9]{1}"
              type="text"
              name="name"
              value={this.props.name}
              onChange={this.handleChange}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
               No trailing space, and begin/end with a letter or number please.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="validationCustom02">
            <Form.Label>Description</Form.Label>
            <Form.Control
              name="description"
              type="text"
              placeholder="Please describe a little bit :)"
              value={this.props.description}
              onChange={this.handleChange}
            />
          </Form.Group>

         <Button type="submit">Submit form</Button>
      </Form>
    );
  }
}

export default FormExample;
