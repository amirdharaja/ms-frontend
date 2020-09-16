
import React from 'react';

import axios from 'axios';
import Message from '../containers/Message';
import {BASE_URL} from '../store/actions/ActionTypes';
import "../styles/scss/style.scss";

import $ from 'jquery'

$(document).ready(function () {
    $('.flip').click(function () {
        $('.cont-flip').toggleClass('flipped');
        return false;
    });
});


class Contact extends React.Component {

    state = {
        alertVisible: false,
        userContactRequest: {
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            details: ''
        },
        errors: {
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            details: ''
        }
    }

    inputChanged = event => {
        const data = this.state.userContactRequest;
        data[event.target.name] = event.target.value;
        this.setState({
            userContactRequest: data,
            errors: {},
            alertVisible: false
        });
        console.log(this.state.userContactRequest)
    }

    formValidation = () => {
        let formIsValid = true;
        let errors = {};
        let fields = this.state.userContactRequest;

        if (!fields["first_name"] || fields["first_name"] === '') {
            errors["first_name"] = "formError";
            formIsValid = false
        }
        if (!fields["last_name"] || fields["last_name"] === '') {
            errors["last_name"] = "formError";
            formIsValid = false
        }
        if (!fields["phone"] || fields["phone"] === '') {
            errors["phone"] = "formError";
            formIsValid = false
        }
        if (!fields["email"] || fields["email"] === '') {
            errors["email"] = "formError";
            formIsValid = false
        }
        if (!fields["details"] || fields["details"] === '') {
            errors["details"] = "formError";
            formIsValid = false
        }

        this.setState({ errors: errors });
        return formIsValid;
    }
    sendRequest = (event) => {
        let is_valid = this.formValidation()
        event.preventDefault();
        let data = {
            name: this.state.userContactRequest.first_name + ' ' + this.state.userContactRequest.last_name,
            email: this.state.userContactRequest.email,
            phone: this.state.userContactRequest.phone,
            details: this.state.userContactRequest.details,
        }
        if (is_valid) {
            axios.post(BASE_URL + '/contact/', {data: data})
                .then(response => {
                    if (response.status === 200) {
                        this.setState({
                            alertVisible: true,
                            alertType: 'success',
                            messageTitle: 'Success',
                            message: 'Thank you for reaching us. We will get back with in 24 hours',
                            userContactRequest: {
                                first_name: '',
                                last_name: '',
                                email: '',
                                phone: '',
                                details: ''
                            }

                        })
                    }
                })
                .catch(error => {
                    this.setState({ alertVisible: true, alertType: 'danger', messageTitle: 'Sorry', message: 'Unable to complete the process, Please retry' })
                })
        }
        else {
            this.setState({
                isLoading: false,
                message: 'Request Form is not valid, Please fill all the required fields',
                alertType: 'danger',
                alertVisible: true,
            })
        }
    }

    render() {
        return (
            <section id='contact'>

                {this.state.alertVisible &&
                    <Message
                        messageTitle={this.state.messageTitle}
                        message={this.state.message}
                        alertType={this.state.alertType}
                    />
                }


                <h3 id='title'>We are always with you</h3>
                <div className="cont-contactBtn">
                    <div className="cont-flip">
                        <div className="front">
                            <a href="/" className="btn btn-white flip" id='btn'>Click me to Send Message</a>
                        </div>
                        <div className="back">
                            <button className="flip close"></button>
                            <div className="contact-form">
                                <input
                                    type="text"
                                    name="first_name"
                                    className={'gutter ' + this.state.errors.first_name}
                                    onChange={this.inputChanged}
                                    value={this.state.userContactRequest.first_name}
                                    placeholder="First Name" />

                                <input
                                    type="text"
                                    name="last_name"
                                    className={'gutter ' + this.state.errors.last_name}
                                    onChange={this.inputChanged}
                                    value={this.state.userContactRequest.last_name}
                                    placeholder="Last Name" />


                                <input
                                    type="number"
                                    name="phone"
                                    className={'gutter ' + this.state.errors.phone}
                                    onChange={this.inputChanged}
                                    value={this.state.userContactRequest.phone}
                                    placeholder="Phone Number" />

                                <input
                                    type="email"
                                    name="email"
                                    className={'gutter ' + this.state.errors.email}
                                    onChange={this.inputChanged}
                                    value={this.state.userContactRequest.email}
                                    placeholder="Email ID" />

                                <textarea
                                    name="details"
                                    className={this.state.errors.details}
                                    onChange={this.inputChanged}
                                    value={this.state.userContactRequest.details}
                                    placeholder="Leave a message"></textarea>
                                <input type="submit" value="Send" onClick={this.sendRequest} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}


export default Contact;