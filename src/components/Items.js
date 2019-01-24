import React, { Component } from 'react';
import { 
    Button,
    Card,
    CardTitle,
    CardSubtitle,
   } from 'reactstrap';
import { connect } from 'react-redux';
import { toggleItemTracking } from './../actions';


const ItemCard = ({ item, handleItemClick }) => (
    <Card className="my-2 rounded-0">
      <div className="row align-items-center p-2">
        <div className="col-8 align-items-center text-left">
          <CardSubtitle>{ item.brandDisplayName }</CardSubtitle>
          <CardTitle tag="h5">{ item.name }</CardTitle>
        </div>
        <div className="col-4 text-center">
          <Button className="rounded-0" onClick={e => handleItemClick(item._id)}>Watch it</Button>
        </div>
      </div>
    </Card>
  );
  
  
class ItemList extends Component {

    constructor(props) {
        super(props);

        this.handleItemClick = this.handleItemClick.bind(this);
    }

    handleItemClick(id) {
        this.props.toggleItemTracking(id, 'add');
    }

    render() {
        const { activeFilters } = this.props;
        return(
            this.props.list
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
            .map( item => <ItemCard item={item} handleItemClick={this.handleItemClick}/>)
        )
    }
}

export default connect(null, { toggleItemTracking })(ItemList);