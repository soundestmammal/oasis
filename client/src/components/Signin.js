import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Redirect, Link } from 'react-router-dom';
import "../styles/auth.css"

class Signin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            toDashboard: false
        }
    }

    attemptSignin = () => {
        this.props.signin(this.state.email, this.state.password, () => {
            console.log("Inside the callback1");
            this.setState({ toDashboard: true });
        });
    }

    handleChangeEmail = (e) => {
        this.setState({ email: e.target.value });
        console.log(this.state.email);
    }

    handleChangePassword = (e) => {
        this.setState({ password: e.target.value });
        console.log(this.state.password)
    }

    render() {
        if(this.state.toDashboard === true) {
            return <Redirect to="/" />
        }

        return(
            <div className="auth-wrapper">
                <div className="auth-container">
                    <div className="auth-lock"><FontAwesomeIcon size="2x" icon={['fas', 'lock']}/></div>
                    <span className="auth-title">Sign in</span>
                    <input type="text" placeholder="Email Address" value={this.state.email} onChange={this.handleChangeEmail} />
                    <input type="password" placeholder="Password" value={this.state.password} onChange={this.handleChangePassword} />
                    {/* <button className="auth-button" text="SIGN IN" onClick={() => this.props.trythis(this.state.email, this.state.password).then( this.setState({toDashboard: true}))}>Submit!!!</button> */}
                    <div>{this.props.errorMessage}</div>
                    <button className="auth-button" text="SIGN IN" onClick={() => this.attemptSignin()} >Submit!!!</button>
                    <div className="auth-troubleshoot">
                        <Link style={{textDecoration: 'none'}}>Forgot Password</Link>
                        <Link style={{textDecoration: 'none'}}>Don't have an account? Sign Up</Link>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { errorMessage: state.auth.errorMessage };
}

export default connect(mapStateToProps, actions)(Signin);