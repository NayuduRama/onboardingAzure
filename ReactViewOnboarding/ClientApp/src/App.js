import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import Main from './components/main';
import Customers from './components/Customers';
import Products from './components/Products';
import Sales from './components/Sales';
import Stores from './components/Stores';


import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Main} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data' component={FetchData} />
        <Route path='/customers' component={Customers} />
        <Route path='/products' component={Products} />
        <Route path='/sales' component={Sales} />
        <Route path='/stores' component={Stores} />


      </Layout>
    );
  }
}
