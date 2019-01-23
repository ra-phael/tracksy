import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import { connect } from 'react-redux';
import './App.sass';
import { 
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink as NavLien,
 } from 'reactstrap';

import Filter from './components/Filter';
import ItemList from "./components/Items";
import Login from './components/Login';

const TEST_DATA = [
  {
    brandDisplayName: 'Louis Vuitton',
    brand: 'louis-vuitton',
    name: 'Palms Springs Backpack',
    category: 'hand-bags',
  },
  {
    brandDisplayName: 'Louis Vuitton',
    brand: 'louis-vuitton',
    name: 'Montsouris Backpack',
    category: 'hand-bags',
  },
  {
    brandDisplayName: 'Chanel',
    brand: 'chanel',
    name: 'Jumbo Hand Bag',
    category: 'hand-bags',
  },
  {
    brandDisplayName: 'Chanel',
    brand: 'chanel',
    name: 'Camélia Necklace',
    category: 'jewelry',
  },
  {
    brandDisplayName: 'Hermès',
    brand: 'hermes',
    name: 'Clic Clac Bracelet',
    category: 'jewelry',
  },
  {
    brandDisplayName: 'Louboutin',
    brand: 'louboutin',
    name: 'Pigalle',
    category: 'shoes',
  }
]

const SEARCH_FILTERS = [
  {
  displayName: 'Category',
  label: 'category',
  options: [
    {
      displayName: 'Hand Bags',
      option: 'hand-bags'
    },
    {
      displayName: 'Jewelry',
      option: 'jewelry'
    },
    {
      displayName: 'Shoes',
      option: 'shoes'
    }
  ]},
  {
  displayName: 'Designers',
  label: 'brand',
  options: [
    {
      displayName: 'Louis Vuitton',
      option: 'louis-vuitton'
    },
    {
      displayName: 'Hermès',
      option: 'hermes'
    },
    {
      displayName: 'Chanel',
      option: 'chanel'
    }
  ]},
]

const TEST_FILTER = {
  'category' : ['jewelry'],
  'brandHandle' : []
}


const FilterList = ({ list }) =>
  <div id="accordion">
    {list
    .map( filter => {
      return(
        <Filter filter={filter} />
      )
    })}
  </div>


const Header = () => 
  <Navbar color="light" light expand="md" className="justify-content-between">
    <NavbarBrand tag={'h1'} href="/">
      <NavLink to="/">Tracksy</NavLink>
    </NavbarBrand>
      <span className="tagline">Track pre-loved luxury items prices</span>
    <Nav>
      <NavItem>
        <NavLien><NavLink to="#">My Alerts</NavLink></NavLien>
      </NavItem>
      <NavItem>
        <NavLien><NavLink to="/login">Log In / Sign Up</NavLink></NavLien>
      </NavItem>
    </Nav>
  </Navbar>


class Home extends Component {


  render() {
    const activeFilters = this.props.filters

    return(
    <div className="container-fluid">
      <div className="row flex-xl-nowrap">
        <div className="col-12 col-sm-4 col-md-3 bd-sidebar px-0">
          <FilterList list={SEARCH_FILTERS} />
        </div>
        <div className="col-12 col-sm-8 col-md-9">
          <ItemList list={TEST_DATA} activeFilters={activeFilters} />
        </div>
      </div>
    </div>
    )
  }
}


class App extends Component {

  render() {
    
    return (
      <Router>
        <div id="app" className="App">
          <Header />
          <Route
          exact path="/"
          render={(routeProps) => (
            <Home {...routeProps} {...this.props} />
          )}
          />
          <Route path="/login" component={Login} />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    filters: state.filters,
    user: state.user,
    isUserLoggedIn: state.isUserLoggedIn
  }
}

export default connect(mapStateToProps)(App);
