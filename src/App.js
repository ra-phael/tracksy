import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.sass';
import { 
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
 } from 'reactstrap';

import Filter from './components/Filter';
import ItemList from "./components/Items";

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
      Tracksy
    </NavbarBrand>
      <span className="tagline">Track pre-loved luxury items prices</span>
    <Nav>
      <NavItem>
        <NavLink href="#">My Alerts</NavLink>
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
      <div id="app" className="App">
        <Header />
        <Home filters={this.props.filters} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    filters: state.filters,
  }
}

export default connect(mapStateToProps)(App);
