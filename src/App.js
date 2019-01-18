import React, { Component } from 'react';
import './App.sass';
import { 
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardSubtitle,
  CardBody,
  CustomInput,
  Collapse
 } from 'reactstrap';


const TEST_DATA = [
  {
    brand: 'Louis Vuitton',
    brandHandle: 'louis-vuitton',
    name: 'Palms Springs Backpack',
    category: 'hand-bags',
  },
  {
    brand: 'Louis Vuitton',
    brandHandle: 'louis-vuitton',
    name: 'Montsouris Backpack',
    category: 'hand-bags',
  },
  {
    brand: 'Chanel',
    brandHandle: 'chanel',
    name: 'Jumbo Hand Bag',
    category: 'hand-bags',
  },
  {
    brand: 'Chanel',
    brandHandle: 'chanel',
    name: 'Camélia Necklace',
    category: 'jewelry',
  },
  {
    brand: 'Hermès',
    brandHandle: 'hermes',
    name: 'Clic Clac Bracelet',
    category: 'jewelry',
  },
  {
    brand: 'Louboutin',
    brandHandle: 'louboutin',
    name: 'Pigalle',
    category: 'shoes',
  }
]

const SEARCH_FILTERS = [
  {
  label: 'Category',
  options: [
    {
      displayName: 'Hand Bags',
      optionHandle: 'hand-bags'
    },
    {
      displayName: 'Jewelry',
      optionHandle: 'jewelry'
    },
    {
      displayName: 'Shoes',
      optionHandle: 'shoes'
    }
  ]},
  {
  label: 'Designer',
  options: [
    {
      displayName: 'Louis Vuitton',
      optionHandle: 'louis-vuitton'
    },
    {
      displayName: 'Hermès',
      optionHandle: 'hermes'
    },
    {
      displayName: 'Chanel',
      optionHandle: 'chanel'
    }
  ]},

]

const ItemCard = ({ item }) => (
  <Card className="my-2">
    <div className="row align-items-center p-2">
      <div className="col-8 align-items-center text-left">
        <CardSubtitle>{ item.brand }</CardSubtitle>
        <CardTitle tag="h5">{ item.name }</CardTitle>
      </div>
      <div className="col-4">
        <Button>Create an alert</Button>
      </div>
    </div>
  </Card>
);


const ItemList = ({ list }) =>
  list
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


class Filter extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = { collapse: true };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  render() {
    const filter = this.props.filter
    return(
      <Card className="w-100 rounded-0 text-left">
        <Button onClick={this.toggle} color="link" block>
          <CardHeader tag="h4" className="filter__label text-left">
            {filter.label}
          </CardHeader>
        </Button>
        <Collapse isOpen={this.state.collapse}>
          <CardBody>
            <OptionList options={filter.options}></OptionList>
          </CardBody>
        </Collapse>
      </Card>
    )
  }
}


class OptionList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const options = this.props.options;

    return(
      options.map((option) => {
        return(
          <CustomInput type="checkbox" id={option.optionHandle} label={option.displayName}></CustomInput>
        )
      })
    )

  }
}

class App extends Component {
  render() {
    return (
      <div id="app" className="App">
        <Navbar color="light" light expand="md" className="justify-content-between">
          <NavbarBrand href="/">Tracksy</NavbarBrand>
          <Nav>
            <NavItem>
              <NavLink href="#">My Alerts</NavLink>
            </NavItem>
          </Nav>
        </Navbar>
        <div className="container-fluid">
          <div className="row flex-xl-nowrap">
            <div className="col-12 col-sm-4 col-md-3 bd-sidebar px-0" style={{backgroundColor: "blue"}}>
              <FilterList list={SEARCH_FILTERS} />
            </div>
            <div className="col-12 col-sm-8 col-md-9" style={{backgroundColor: "green"}}>
              <ItemList list={TEST_DATA} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
