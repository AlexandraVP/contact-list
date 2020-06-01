import React, {Component} from 'react';
import styles from './contact-item.module.css';
import {ContactEditor} from "../contact-editor/contact-editor";

export class ContactItem extends Component {

    state = {
        edit: false
    };

    editView = () => {
        this.setState({edit: true});
    };

    readView = () => {
        this.setState({edit: false});
    };

    confirm = (profile) => {
        profile.id = this.props.profile.id;
        this.props.update(profile);
        this.readView();
    };

    delete = () => {
        this.props.delete(this.props.profile.id);
    };

    renderEditView() {
        const {profile} = this.props;
        return <ContactEditor name={profile.name} email={profile.email} phone={profile.phone}
                              logo={profile.logo} comment={profile.comment} reject={this.readView}
                              confirm={this.confirm} trash={this.delete}/>
    }

    render() {
        if (this.state.edit) {
            return (
                <div className={styles.contactDetails}>
                    {this.renderEditView()}
                </div>
            );
        }
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
                <button className={styles.icon} onClick={this.editView}>
                    <i className="fas fa-edit"></i>
                </button>
            </div>
        )
    }

}