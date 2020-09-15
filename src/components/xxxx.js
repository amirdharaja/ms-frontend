
import React from 'react';
import { Button, Alert } from 'reactstrap';
import "../styles/css/login.css";
import MainNav from '../containers/Nav.js'
import Home from '../components/Home'
import { Redirect } from 'react-router-dom'

import * as authActions from '../store/actions/actions';
import { connect } from 'react-redux';


export class NormalLoginForm extends React.Component {

    state = {
        credentials: {
            username: '',
            password: ''
        },
        // categories_name: [],
        categories_details: [],
        main_slide_images: [],
        sub_slide_images: [],
        cart_count: null,
        favourite_count: null,
        successMessage: '',
        errorMessage: '',
        isLoading: true,
        isAuthenticated: false
    }

    login = (event) => {
        event.preventDefault();
        if (!this.state.credentials.username || !this.state.credentials.password) {
            this.setState({ errorMessage: 'Username password cannot be empty' });
        }
        else {
            this.props.onAuth(this.state.credentials.username, this.state.credentials.password);
        }

    }

    inputChanged = event => {
        const cred = this.state.credentials;
        cred[event.target.name] = event.target.value;
        this.setState({
            credentials: cred
        });
    }

    render() {
        return (
            <section id='login'>
                {(localStorage.getItem('isAuthenticated')) ? <Redirect to='/'></Redirect> :
                    null}
                <MainNav
                    {...this.props}
                    categories_name={this.state.categories_name}
                    cart_count={0}
                    favourite_count={0}
                    isAuthenticated={false}
                />
                <p style={{ display: 'none' }}><Home
                    successMessage={this.state.successMessage}
                    errorMessage={this.state.errorMessage}
                /></p>
                <div className="wrapper">
                    {this.state.successMessage &&
                        <Alert color="success" isOpen={this.state.successMessage} toggle={(e) => this.setState({ errorMessage: '', successMessage: '' })}>
                            <strong>Success!</strong> {this.state.successMessage}
                        </Alert>
                    }

                    {this.state.errorMessage &&
                        <Alert color="danger" isOpen={this.state.errorMessage} toggle={(e) => this.setState({ errorMessage: '', successMessage: '' })}>
                            <strong>Faild!</strong> {this.state.errorMessage}
                        </Alert>
                    }

                    <div className="login-container">
                        <div className="col-left">
                            <div className="login-text">
                                <h2>Logo</h2>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Sed eget eros dapibus,
                                    ultricies tellus vitae, consectetur tortor.
                                    Etiam rutrum placerat
                                </p>
                                <a className="btn" href="/">Read More</a>
                            </div>
                        </div>
                        <div className="col-right">
                            <div className="login-form">
                                <h2>Login</h2>
                                <p>
                                    <input
                                        type="text"
                                        name='username'
                                        value={this.state.credentials.username}
                                        onChange={this.inputChanged}
                                        placeholder="Phone / Username / Email"
                                        title="Valid Username/ Email / Phone only is allowed to login"
                                        required />
                                </p>
                                <p>
                                    <input
                                        type='password'
                                        name='password'
                                        value={this.state.credentials.password}
                                        onChange={this.inputChanged}
                                        placeholder='Password' required />
                                </p>
                                <p>
                                    <Button color="success" type='submit' onClick={this.login}>Submit</Button>
                                </p>
                                <p>
                                    <a href="/">Forget password?</a>
                                    <a href="/">Create an account.</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}


const mapStateToProps = (state) => {
    return state
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, password) => dispatch(authActions.authLogin(username, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NormalLoginForm);