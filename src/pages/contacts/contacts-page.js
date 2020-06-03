import React, {Component} from 'react';
import styles from './contacts.module.css';
import {getAuthHeader, unauthorize} from "../../utils/auth";
import {withRouter} from 'react-router-dom';
import {SearchPanel} from './search-panel/search-panel';
import {ContactEditor} from './contact-editor/contact-editor';
import {ContactItem} from './contact-item/contact-item'

class Contacts extends Component {

    state = {
        addContactPanelShown: false
    };

    lastQuery = '';

    logout = async () => {
        const response = await fetch('/logout', {
            method: 'POST',
            headers: {
                ...getAuthHeader(),
            }
        });
        unauthorize();
        this.props.history.push('/login');
    };


    showAddContactPanel = () => {

        this.setState({
            addContactPanelShown: true
        })
    };

    hideAddContactPanel = () => {
        this.setState({
            addContactPanelShown: false
        })
    };

    searchContacts = async (query='', logoutOnFail=false) => {
        const response = await fetch(`/contacts?query=${query.trim().toLowerCase()}`,
            {
                headers: getAuthHeader()
            }
        );
        if(response.status >= 400 && logoutOnFail){
            this.logout();
            return;
        }
        const profiles = await response.json();
        this.setState({profiles});
        this.lastQuery = query;
    };

    createContact = async (profile) => {
        const response =  await fetch ( '/contacts', {
            headers: {
                ...getAuthHeader(),
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(profile)
        });
        if (response.status < 400) {
            this.hideAddContactPanel();
            this.searchContacts(this.lastQuery);
        }
    };

    updateContact = async (profile) => {
        const response =  await fetch ( '/contacts', {
            headers: {
                ...getAuthHeader(),
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(profile)
        });
        if (response.status < 400) {
            this.searchContacts(this.lastQuery);
        }
    };

    deleteContact = async (profileId) => {
        const response =  await fetch ( `/contacts/${profileId}`, {
            headers: {
                ...getAuthHeader()
            },
            method: 'DELETE'
        });
        if (response.status < 400) {
            this.searchContacts(this.lastQuery);
        }
    };

    componentDidMount() {
        this.searchContacts('',true);
    }

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.card}>
                    <button className={styles.buttonLogout} onClick={this.logout}>
                        <i className="fas fa-sign-out-alt"></i>
                    </button>
                    <SearchPanel addContact={this.showAddContactPanel} search={this.searchContacts}/>
                </div>
                {this.state.addContactPanelShown && (
                    <div className={styles.card + " " + styles.cardSmall}>
                        <ContactEditor confirm={this.createContact} reject={this.hideAddContactPanel}/>
                    </div>
                )}
                <div className={styles.cardContact}>
                    {this.state.profiles && this.state.profiles.map(p => (
                        <ContactItem key={p.id} profile={p} update={this.updateContact}
                         delete={this.deleteContact}/>
                    ))}
                </div>
            </div>

        )
    }
}

export default withRouter(Contacts);