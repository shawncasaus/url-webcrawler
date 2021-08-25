import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as yup from 'yup';
import {Form, Button, Col, Row} from 'react-bootstrap';


const URLInput = ({url, setUrl}) => {
    var expression = /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/gi;

    const schema = yup.object().shape({
        url: yup.string().matches(expression, 'Error please enter a valid url').required(),
    });

    const handleSubmit = (e) => {
        setUrl(e.url);
        
    }

    return (
        <div className="url-form">
            <Formik
                validationSchema={schema}
                onSubmit={(e) => handleSubmit(e)}
                initialValues={{
                    url: '',
                }}
                >
                {({
                    handleSubmit,
                    handleChange,
                    values,
                    touched,
                    errors,
                }) => (
                <Form noValidate onSubmit={handleSubmit}>
                    <Row>
                        <Col xs={12} className="input-col">
                            <Form.Label>Enter a Valid URL</Form.Label>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={10} className="input-col">
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control type="text" name="url" value={values.url} onChange={handleChange} isValid={touched.url && !errors.url} isInvalid={errors.url}/>
                                <Form.Control.Feedback type="invalid">
                                    {errors.url}
                                </Form.Control.Feedback>
                                <Form.Control.Feedback>
                                    Success!
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col className="input-col" xs={12} md={2}>
                            <Button type="submit">
                                Submit
                            </Button>
                        </Col>
                    </Row>
                </Form>
            )}
            </Formik>
        </div>
    )
}

URLInput.defaultProps = {
    url: '',
    setUrl: () => {console.log('Error: setUrl not defined.')},
  }

  URLInput.propTypes = {
    url: PropTypes.string,
    setUrl: PropTypes.func,
  }

export default URLInput;