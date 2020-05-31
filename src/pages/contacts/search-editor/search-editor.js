import React, {Component} from 'react';
import styles from './search-editor.module.css';

export class SearchEditor extends Component {

    

    render() {
        return (
            
                <div className={styles.editPanel}>
                    <div className={styles.contactIcon}><i className="fas fa-portrait"></i></div>
                    <div className={styles.contactInformation}>
                        <input className={styles.contact} type='text' placeholder='name: '/>
                        <input className={styles.contact} type='text' placeholder='comment: '/>
                        <input className={styles.contact} type='text' placeholder='phone: '/>
                        <input className={styles.contact} type='text' placeholder='email: '/>
                        <div className={styles.choice}>
                        <button className={styles.confirm}><i className="fas fa-check"></i></button>
                        <button className={styles.reject} onClick={this.props.reject}><i class="fas fa-times"></i></button>
                            </div>
                    </div>
                </div>
          
        )
    }

}