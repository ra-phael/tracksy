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

import { signupCall, getQuestionCall, loginCall } from './../services/api';
import { loginSuccess } from "../actions";


class LoginComponent extends Component  {
    constructor(props) {
        super(props);

        this.state = {
            isLogin: true,
            email: '',
            question: '',
            answer: '',
            isEmailValid: null,
            errors: {
                email: ''
            }
        };
        this.validateEmail = this.validateEmail.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.confirmEmail = this.confirmEmail.bind(this);
        this.setError = this.setError.bind(this);
    }

    componentWillMount() {
        const currentPath = this.props.location.pathname;
        if(currentPath === '/login/signup') {
            this.setState({ isLogin: false });
        }
    }

    validateEmail(email) {
        // eslint-disable-next-line
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if(!re.test(email)) {
            return false;
        } else {
           return true;
        }
    }

    confirmEmail() {
        const{ isLogin, email } = this.state;
        if(!this.validateEmail(email)) {
            this.setError('email', 'Please enter a valid email address');
            return;
        }
        
        if(isLogin) {
            getQuestionCall(email)
                .then(question => {
                    console.log(question);
                    this.setState({
                        question: question,
                        isEmailValid: true,
                        errors: Object.assign({}, this.state.errors, {email: ''})
                    })
                })
                .catch(e => {
                    if(e.response.data.code && e.response.data.code === 4004) {
                        this.setError('email', 'This email address is not registered')
                    }
                    console.log('Received error:', e.response);
                })
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
        const {email, question, answer, isLogin} = this.state;

        if(isLogin) {
            loginCall(email, answer)
            .then((user) => {
                if(user) {
                    console.log(user);
                    this.props.loginSuccess(user);
                    this.props.history.push('/');
                }
            }).catch(e => {
                if(e.response.data.code && e.response.data.code === 4000) {
                    console.log('code 4000');
                    this.setError('answer', 'Wrong email/answer combination')
                } else {
                    console.log('Received error:', e.response);
                }
            })
        } else {
            signupCall(email, question, answer)
                .then((user) => {
                    if(user) {
                        console.log(user);
                        this.props.loginSuccess(user);
                        this.props.history.push('/');
                    }
                }).catch(e => {
                    if(e.response.data.code && e.response.data.code === 11000) {
                        this.setError('email', 'Email address already exists')
                    } else {
                        console.log('Received error:', e.response);
                    }
                })
        }

    }

    setError(field, message) {
        this.setState({ 
            errors: {
                [field]: message 
            }
        });
    }

    render() {
        const {isLogin, errors} = this.state;
        return(
            <div>
                <h2 className="text-center">{isLogin ? "Log In" : "Sign up"}</h2>
                <div className="col -12 col-sm-8 col-md-6 offset-sm-2 offset-md-3">
                    <Form 
                        autoComplete="off" 
                        onSubmit={e => { e.preventDefault(); }}
                    >
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
                            { !this.state.isLogin && 
                            <div>
                                <h5>Define a security question:</h5>
                                <FormGroup>
                                    <Label for="question-input">Question</Label>
                                    <Input type="text" name="question" id="question-input"
                                    placeholder="Your question" onChange={this.handleInputChange} />
                                    <FormText>For example: What is your mother's maiden name?</FormText>
                                </FormGroup>
                            </div>
                            }
                            <FormGroup>
                                <Label for="answer-input">{this.state.question}</Label>
                                <Input type="text" name="answer" id="answer-input"
                                placeholder="Your answer" autoComplete="off"
                                onChange={this.handleInputChange}
                                invalid={errors.answer} />
                                <FormFeedback>{errors.answer}</FormFeedback>
                            </FormGroup>
                            <div className="text-center">
                                <Button outline color="dark" className="rounded-0" onClick={this.onSubmit}>Submit</Button>
                            </div>
                        </div>
                        :   
                        <div className="text-center">
                            <Button outline color="dark" className="rounded-0" onClick={this.confirmEmail}>Confirm</Button>
                        </div>
                        }
                    </Form>
                    {
                        isLogin ?
                        <p>
                            Don't have an account yet? <Link to="login/signup">Sign up</Link>
                        </p>
                        :
                        <p>
                            Already have an account? <Link to="/login">Log in</Link>
                        </p>
                    }
                </div>
            </div>
        )
    }
}

const Login = () =>
   <div className="login-container pt-4">
       <Route exact path="/login" component={connectedLogin} />
       <Route path="/login/signup" component={connectedLogin} />
   </div>


const connectedLogin = connect(null, { loginSuccess })(LoginComponent);
export default Login;