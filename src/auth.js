import React, {Component} from 'react';
import styles from './auth.module.css';

export class Auth extends Component {

    handleSubmit(event) {
        event.preventDefault();
    }

    render() {
        return (
            <div className={styles.layout}>
            <form className={styles.form}  onSubmit={this.handleSubmit}>
                <p>Welcome</p>
                <input className={styles.username} type='text' title='FIO' placeholder='Username' />
                <input className={styles.password}  type='password' placeholder='Password'/>
                <input className={styles.button} type='submit' value="Login"/>
                </form>
            </div>
        )
    }

}
