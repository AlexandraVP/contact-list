import React from 'react';
import './App.css';
import Auth from './pages/auth/auth';
import  {Switch, Route, Redirect} from 'react-router-dom';
import Contacts from "./pages/contacts/contacts-page";
import {isAuthorized} from "./utils/auth";

function Authorized({children}){
    if(!isAuthorized()){
        return (<Redirect to='/login'/>);
    }
    return (
        <Switch>
            {children}
        </Switch>
    )
}


function App() {
    return (
        <Switch>
            <Redirect from="/" exact to="/contacts"/>
            <Route path="/login" component={Auth}/>
            <Authorized>
                <Route path="/contacts" component={Contacts}/>
            </Authorized>
        </Switch>
    );

}

export default App;
