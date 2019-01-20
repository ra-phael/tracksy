import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.sass';
import { 
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
  Card,
  CardTitle,
  CardSubtitle,
 } from 'reactstrap';

import Filter from './components/Filter';

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


const ItemCard = ({ item }) => (
  <Card className="my-2 rounded-0">
    <div className="row align-items-center p-2">
      <div className="col-8 align-items-center text-left">
        <CardSubtitle>{ item.brandDisplayName }</CardSubtitle>
        <CardTitle tag="h5">{ item.name }</CardTitle>
      </div>
      <div className="col-4">
        <Button className="rounded-0">Watch it</Button>
      </div>
    </div>
  </Card>
);


const ItemList = ({ list, activeFilters}) =>
  list
  .filter((item) => {
     
    return Object.keys(activeFilters).every(filter => {

      if(!activeFilters[filter].length) {
        return true
      }
      // console.log(`${item.name} is evaluated against ${TEST_FILTER[filter]}`);
      // console.log('evaluation: ', TEST_FILTER[filter].includes(item[filter]));
      return activeFilters[filter].includes(item[filter])
    })

  })
  .map( item => <ItemCard item={item} />)


const FilterList = ({ list }) =>
  <div id="accordion">
    {list
    .map( filter => {
      return(
        <Filter filter={filter} />
      )
    })}
  </div>


class App extends Component {

  render() {
    const activeFilters = this.props.filters
    return (
      <div id="app" className="App">
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
