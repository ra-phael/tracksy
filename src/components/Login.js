import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Route } from "react-router-dom";
import { 
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    FormText
   } from 'reactstrap';

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
            isEmailValid: false
        };
        this.onQuestionChange = this.onQuestionChange.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
    }

    onQuestionChange(e) {
        this.setState({ question: e.target.value })
    }

    validateEmail(e) {
        var re = /^(([^<>()\[\]s\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        console.log(re.test(e.target.value));

        if(re.test(e.target.value)) {
            this.setState({isEmailValid: true})
        } else {
            this.setState({isEmailValid: false})
        }
    }

    render() {
        return(
            <div>
                <h2 className="text-center">Sign up</h2>
                <div className="col-sm-12 col-md-6 offset-md-3">
                    <Form>
                        <FormGroup>
                            <Label for="email-input">Email</Label>
                            <Input type="email" name="email" id="email-input" required
                            placeholder="Your email address"
                            onChange={this.validateEmail}
                            valid={this.state.isEmailValid}
                            />
                        </FormGroup>
                        {this.state.isEmailValid ?
                        <div>
                            <h5>Define a security question:</h5>
                            <FormGroup>
                                <Label for="question-input">Question</Label>
                                <Input type="text" name="question" id="question-input"
                                placeholder="Your question" onChange={this.onQuestionChange} />
                                <FormText>For example: What is your mother's maiden name?</FormText>
                            </FormGroup>
                            <FormGroup>
                                <Label for="answer-input">{this.state.question}</Label>
                                <Input type="text" name="answer" id="answer-input"
                                placeholder="Your answer" />
                            </FormGroup>
                            <div className="text-center">
                                <Button>Submit</Button>
                            </div>
                        </div>
                        : ''
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
       <Route path="/login/signup" component={Signup} />
   </div>

export default Login;