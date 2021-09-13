import * as React from 'react';
import {Route} from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Counter from './components/Counter';
import FetchData from './components/FetchData';
import UserProfile from "./components/UserProfile";

import './custom.css'

export default () => {
    return (<Layout>
            <Route exact path='/' component={Home}/>
            <Route path='/counter' component={Counter}/>
            <Route path='/profile' component={UserProfile}/>
            <Route path='/fetch-data/:startDateIndex?' component={FetchData}/>
        </Layout>)
};
