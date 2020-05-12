import React, { PureComponent } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import { Formik } from 'formik';
import { string, object } from 'yup'; // for only what you need
let yup = require('yup');

class FormikExample extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = { validated: false };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      console.log('handleSubmit not valid');
      event.stopPropagation();
    } else {
      alert('Bravo ');
    }
    this.setState({ validated: true });
    console.log('handleSubmit validation completed');
    
    event.preventDefault();
  }
  

  render() {
    
    const schema = yup.object({
      firstName: yup.string().required(),
      lastName: yup.string().required().matches(/^[A-Z]*$/, 'Please enter capital'),
    });
    
    const { validated } = this.state;
    return (
      <Formik
        validationSchema={schema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
        initialValues={{
          firstName: '',
          lastName: '',
        }}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          touched,
          isValid,
          errors,
        }) => (
          <Form
            noValidate
            validated={validated}
          >
            <Form.Row>
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>First name {touched.firstName} - {touched.firstName && !errors.firstName}</Form.Label>
                <Form.Control
                  name="firstName"
                  type="text"
                  value={values.firstName}
                  onChange={handleChange}
                  isInvalid={errors.firstName}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                    {errors.firstName}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom02">
                <Form.Label>Last name {touched.lastName} - {touched.lastName && !errors.lastName}</Form.Label>
                <Form.Control
                  name="lastName"
                  type="text"
                  placeholder="Last name"
                  value={values.lastName}
                  onChange={handleChange}

                  isInvalid={errors.lastName}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                    {errors.lastName}
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Button type="submit">Submit form</Button>
          </Form>
        )}
      </Formik>
    );
  }
}

export default FormikExample;
