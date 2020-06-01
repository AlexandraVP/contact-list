import React, {Component} from 'react';
import styles from './contact-editor.module.css';
import {getAuthHeader} from "../../../utils/auth";

export class ContactEditor extends Component {
    nameRef = React.createRef();
    commentRef = React.createRef();
    phoneRef = React.createRef();
    emailRef = React.createRef();
    logoRef = React.createRef();


    confirm = () => {
        const profile = {};
        profile.name = this.nameRef.current.value.trim();
        profile.comment = this.commentRef.current.value.trim();
        profile.phone = this.phoneRef.current.value.trim();
        profile.email = this.emailRef.current.value.trim();
        profile.logo = this.logoRef.current.value.trim();
        this.props.confirm(profile);
    };

    render() {
        const {name = '', comment = '', email = '', logo = '', phone = ''} = this.props;
        return (
            <div className={styles.editPanel}>
                <div className={styles.column}>
                    <div className={styles.contactIcon}>
                        {
                            logo
                                ? <img height='70px' src={logo}/>
                                : <i class="fas fa-user"></i>
                        }
                    </div>
                    <input className={styles.inputImage} placeholder='logo href:' ref={this.logoRef}
                           defaultValue={logo}/>
                </div>
                <div className={styles.contactInformation}>
                    <input className={styles.contact} type='text' placeholder='name: ' ref={this.nameRef}
                           defaultValue={name}/>
                    <input className={styles.contact} type='text' placeholder='comment: ' ref={this.commentRef}
                           defaultValue={comment}/>
                    <input className={styles.contact} type='text' placeholder='phone: ' ref={this.phoneRef}
                           defaultValue={phone}/>
                    <input className={styles.contact} type='text' placeholder='email: ' ref={this.emailRef}
                           defaultValue={email}/>
                    <div className={styles.choice}>
                        {this.props.trash && (
                            <button onClick={this.props.trash}>
                                <i className="fas fa-trash-alt"></i>
                            </button>)}
                        <button className={styles.confirm} onClick={this.confirm}><i className="fas fa-check"></i>
                        </button>
                        <button className={styles.reject} onClick={this.props.reject}><i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
            </div>

        )
    }

}