import React, {Component} from 'react';
import styles from './auth.module.css';
import {authorize, isAuthorized} from "../../utils/auth";
import {withRouter} from 'react-router-dom';

class Auth extends Component {
    state = {
        error: false
    };

    usernameRef = React.createRef();
    passwordRef = React.createRef();

    handleSubmit = async event => {
        event.preventDefault();
        const username = this.usernameRef.current.value.trim().toLowerCase();
        const password = this.passwordRef.current.value;
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                login: username,
                password: password
            })
        });

        if (response.status >= 400) {
            this.setState({error: true})
        }else{
            const {token} = await response.json();
            authorize(token);
            this.props.history.push('/contacts');
        }

    };

    componentDidMount() {
        if(isAuthorized()){
            this.props.history.push('/contacts');
        }
    }

    render() {
        return (
            <div className={styles.layout}>
                <form className={styles.form} onSubmit={this.handleSubmit}>
                    <p>Welcome</p>
                    <input className={styles.username} type='text' title='FIO' placeholder='Username'
                           ref={this.usernameRef}/>
                    <input className={styles.password} type='password' placeholder='Password'
                           ref={this.passwordRef}/>
                    <input className={styles.button} type='submit' value="Login"/>
                    {
                        this.state.error && <div className={styles.errorContainer}><p className={styles.error}>invalid username or password</p></div>
                    }
                </form>
            </div>
        )
    }

}

export default withRouter(Auth);
