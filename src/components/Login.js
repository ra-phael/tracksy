import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Route } from "react-router-dom";
import { 
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    FormText,
    FormFeedback
   } from 'reactstrap';

import { signupCall } from './../services/api';
import { loginSuccess } from "../actions";


const LoginHome = () =>
    <div>
        <h2 className="text-center">Login</h2>
        <div className="col-sm-12 col-md-6 offset-md-3">
            <Form>
                <FormGroup>
                    <Label for="email-input">Email</Label>
                    <Input type="email" name="email" id="email-input"
                     placeholder="Your email address" />
                </FormGroup>
                <FormGroup>
                    <Label for="password-input">What is your mother maiden name?</Label>
                    <Input type="password" name="password" id="password-input"
                     placeholder="Your answer" />
                </FormGroup>
                <div className="text-center">
                    <Button>Submit</Button>
                </div>
            </Form>
            <p>
                Don't have an account yet? <Link to="login/signup">Sign up</Link>
            </p>
        </div>
    </div>

class Signup extends Component  {
    constructor(props) {
        super(props);

        this.state = {
            question: '',
            email: '',
            isEmailValid: null,
            errors: {
                email: ''
            }
        };
        this.validateEmail = this.validateEmail.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    validateEmail(e) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if(!re.test(this.state.email)) {
            this.setError('email', "Please enter a valid email address");
        } else {
            this.setState({
                isEmailValid: true,
                errors: Object.assign({}, this.state.errors, {email: ''})
            })
        }
    }

    handleInputChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit() {
        const {email, question, answer} = this.state;
        signupCall(email, question, answer)
            .then((user) => {
                if(user) {
                    console.log(user);
                    this.props.loginSuccess(user);
                    this.props.history.push('/');
                }
            }).catch(e => {
                if(e.response.data.code && e.response.data.code === 11000) {
                    this.setError('email', "Email address already exists")
                } else {
                    console.log('Received error:', e.response);
                }
            })
    }

    setError(field, message) {
        this.setState({ 
            errors: {
                [field]: message 
            }
        });
    }

    render() {
        const {errors} = this.state;
        return(
            <div>
                <h2 className="text-center">Sign up</h2>
                <div className="col-sm-12 col-md-6 offset-md-3">
                    <Form autoComplete="off">
                        <FormGroup>
                            <Label for="email-input">Email</Label>
                            <Input type="email" name="email" id="email-input" required
                            placeholder="Your email address"
                            onChange={this.handleInputChange}
                            invalid={errors.email}
                            />
                            <FormFeedback>{errors.email}</FormFeedback>
                        </FormGroup>
                        {this.state.isEmailValid ?
                        <div>
                            <h5>Define a security question:</h5>
                            <FormGroup>
                                <Label for="question-input">Question</Label>
                                <Input type="text" name="question" id="question-input"
                                placeholder="Your question" onChange={this.handleInputChange} />
                                <FormText>For example: What is your mother's maiden name?</FormText>
                            </FormGroup>
                            <FormGroup>
                                <Label for="answer-input">{this.state.question}</Label>
                                <Input type="text" name="answer" id="answer-input"
                                placeholder="Your answer" autoComplete="off"
                                onChange={this.handleInputChange} />
                            </FormGroup>
                            <div className="text-center">
                                <Button onClick={this.onSubmit}>Submit</Button>
                            </div>
                        </div>
                        :   
                        <div className="text-center">
                            <Button onClick={this.validateEmail}>Confirm</Button>
                        </div>
                        }
                    </Form>
                    <p>
                        Already have an account? <Link to="/login">Log in</Link>
                    </p>
                </div>
            </div>
        )
    }
}

const Login = () =>
   <div>
       <Route exact path="/login" component={LoginHome} />
       <Route path="/login/signup" component={connectedSignup} />
   </div>


const connectedSignup = connect(null, { loginSuccess })(Signup);
export default Login;