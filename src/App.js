import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import { connect } from 'react-redux';
import './stylesheets/App.sass';
import { 
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  Button,
  NavLink as NavLien,
 } from 'reactstrap';

import Filter from './components/Filter';
import ItemList from "./components/Items";
import Login from './components/Login';
import { getItemsCall, logOutCall } from './services/api';
import { logOut } from './actions';


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
    },
    {
      displayName: 'Cartier',
      option: 'cartier'
    }
  ]},
]


const FilterList = ({ list }) =>
  <div id="accordion">
    {list
    .map( filter => {
      return(
        <Filter filter={filter} />
      )
    })}
  </div>


const Header = ({isUserLoggedIn, logOut}) => 
  <Navbar light expand="md" className="justify-content-between">
    <div className="col-12 col-sm-2 text-center">
      <NavbarBrand tag={'h1'} href="/">
        <NavLink to="/" className="main-logo">Tracksy</NavLink>
      </NavbarBrand>
    </div>
      {/* <span className="tagline">Track pre-loved luxury items prices</span> */}
    <Nav className="col-12 col-sm-6 justify-content-center justify-content-sm-end">
      <NavItem>
        <NavLien><NavLink to="#">My Alerts</NavLink></NavLien>
      </NavItem>
      <NavItem>
        {isUserLoggedIn ?
          <Button onClick={e => logOut()} color="link">Log Out</Button>
        : <NavLien><NavLink to="/login">Log In / Sign Up</NavLink></NavLien>
        }
      </NavItem>
    </Nav>
  </Navbar>


class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      items: []
    };
  }

  componentWillMount() {
    getItemsCall()
      .then(items => {
        console.log("items:", items);
        this.setState({items: items});
      }).catch(err => {
        if(err.message.includes("Network Error")) {
          // TODO: Display sth in UI
          console.log("Unable to establish a connection with our server");
        }
        console.log(err);
      })
  }

  render() {

    return(
    <div className="container-fluid main-container">
      <div className="row flex-xl-nowrap">
        <div className="col-12 col-sm-4 col-md-3 bd-sidebar px-0">
          <FilterList list={SEARCH_FILTERS} />
        </div>
        <div className="col-12 col-sm-8 col-md-9">
          <ItemList list={this.state.items} />
        </div>
      </div>
    </div>
    )
  }
}


class App extends Component {

  constructor(props) {
    super(props);

    this.onLogOut = this.onLogOut.bind(this);
  }
  
  onLogOut(e) {
    logOutCall(this.props.user.token)
      .then((response) => {
        if(response.status === 200) {
          this.props.logOut();
        }
      }).catch(e => console.log(e));
  }

  render() {
    return (
      <Router>
        <div id="app" className="App">
          <Header logOut={this.onLogOut} isUserLoggedIn={this.props.user.isUserLoggedIn}/>
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
    user: state.user,
  }
}

export default connect(mapStateToProps, { logOut })(App);
