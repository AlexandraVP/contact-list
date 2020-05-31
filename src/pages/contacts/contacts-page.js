import React, {Component} from 'react';
import styles from './contacts.module.css';
import {getAuthHeader, unauthorize} from "../../utils/auth";
import {withRouter} from 'react-router-dom';
import {SearchPanel} from './search-panel/search-panel';
import {SearchEditor} from './search-editor/search-editor';
import {ContactItem} from './contact-item/contact-item'

class Contacts extends Component {

    state = {
        addContactPanelShown: false
    };

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

    searchContacts= async (query) => {
        if(!query) {
            return;
        }
        const response = await fetch(`/contacts?query=${query}`,
            {
                headers: getAuthHeader()
            }
        )
        const profiles = await response.json();
        this.setState({profiles});
    };

    render() {
        return (
            <div className={styles.container}>
                <button className={styles.buttonLogout} onClick={this.logout}><i className="fas fa-sign-out-alt"></i>
                </button>
                <SearchPanel addContact={this.showAddContactPanel} search={this.searchContacts}/>
                {this.state.addContactPanelShown && <SearchEditor reject={this.hideAddContactPanel}/>}
                <div className={styles.cardContact}>
                    {this.state.profiles && this.state.profiles.map(p => (
                        <ContactItem key={p.id} profile={p}/>
                    ))}
                </div>
            </div>

        )
    }
}

export default withRouter(Contacts);