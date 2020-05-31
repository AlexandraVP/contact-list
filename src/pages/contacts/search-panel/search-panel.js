import React, {Component} from 'react';
import styles from './search-panel.module.css';

export class SearchPanel extends Component {

    state = {
        query: ''
    };

    timerId = null;

    updateQuery = (event) => {
        this.setState({query: event.target.value.trim().toLowerCase()});
        this.delaySearch();
    }

    delaySearch = () => {
        clearTimeout(this.timerId);
        this.timerId = setTimeout(() => {
            this.props.search(this.state.query);
        },300)
    }

    render() {
        return (
            <div className={styles.searchPanel}>
                <input className={styles.searchInput} onChange={this.updateQuery} value={this.state.query}/>
                <button onClick={this.props.addContact}><i class="fas fa-user-plus"></i></button>
            </div>
        )
    }

}