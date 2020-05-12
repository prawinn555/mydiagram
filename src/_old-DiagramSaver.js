import React, { PureComponent } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


class DiagramSaver extends PureComponent {
  
  constructor(props) {
    super(props);
    this.state = {
       name : "My new diagram",
       description : "Please describe here :)",
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  
  

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  // event is generated from the <input>
  handleChange(event) {

        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        console.log("DiagramEditor.handleChange", name,'=', value);
        this.setState({
          [name]: value,
        });
  };
  
  render() {
    return (
      <div  >
        <Form onSubmit={this.handleSubmit} >
          <Form.Group >
            <Form.Label>Name</Form.Label>
            <Form.Control placeholder="unique name" 
               name="name"
               value={this.state.name} onChange={this.handleChange} 
               required
              />
             <Form.Control.Feedback type="invalid">
                Please provide a name !
              </Form.Control.Feedback>
          </Form.Group>

          <Form.Group >
            <Form.Label>Description</Form.Label>
            <Form.Control  placeholder="Some description :)"
               name="description"
               value={this.state.description} onChange={this.handleChange} 
              />
          </Form.Group>

          <Button variant="primary" 
            type="submit"
            disabled={this.state.valid} >
            Save
          </Button>
        </Form>
        
        
        
      </div>
    );
  }
}

export default DiagramSaver;