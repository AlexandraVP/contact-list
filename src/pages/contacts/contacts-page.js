import React, {Component} from 'react';
import styles from './contacts.module.css';
import {getAuthHeader, unauthorize} from "../../utils/auth";
import {withRouter} from 'react-router-dom';

class Contacts extends Component {

    logout = async () => {
        const response = await fetch('/logout', {
            method: 'POST',
            headers: {
                ...getAuthHeader(),
            }
        });

        if(response.status < 400){
            unauthorize();
            this.props.history.push('/login');
        }
    };

    render() {
        return (<button onClick={this.logout}>Logout</button>)
    }
}

export default withRouter(Contacts);