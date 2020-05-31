import React, {Component} from 'react';
import styles from './contact-item.module.css';

export class ContactItem extends Component {



    render() {
        return (
                <div className={styles.contactDetails}>
                    <div className={styles.photo}>
                        <img height='100px' src={this.props.profile.logo}/>
                    </div>
                    <div className={styles.receivedInfo}>
                        <p className={styles.title}>{this.props.profile.name}</p>
                        <p className={styles.subTitle}>{this.props.profile.comment}</p>
                        <p className={styles.phone}>{this.props.profile.phone}</p>
                        <p className={styles.email}>{this.props.profile.email}</p>
                    </div>
                    <div className={styles.icon}><i className="fas fa-edit"></i></div>
                </div>
        )
    }

}