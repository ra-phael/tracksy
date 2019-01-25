import React, { Component } from 'react';
import { 
    Button,
    Card,
    CardTitle,
    CardSubtitle,
   } from 'reactstrap';
import { connect } from 'react-redux';
import { updateWatchedItems } from './../actions';
import { updateWatchedItemsCall } from '../services/api';


const ItemCard = ({ item, handleItemClick, isWatched }) => (
    <Card className="my-2 rounded-0">
      <div className="row align-items-center p-2">
        <div className="col-8 align-items-center text-left">
          <CardSubtitle>{ item.brandDisplayName }</CardSubtitle>
          <CardTitle tag="h5">{ item.name }</CardTitle>
        </div>
        <div className="col-4 text-center">
            <Button className="rounded-0"
            onClick={e => handleItemClick(item._id)}>
                {isWatched ? "Watched" : "Watch it"}
            </Button>
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
        if(!this.props.user.isLoggedIn) {
            // TODO
            console.log("Show pop-up to ask to login or sign up");
        }
        updateWatchedItemsCall(this.props.user.token, id)
            .then((res) => {
                console.log(res);
                this.props.updateWatchedItems(res.watchedItems)
            })
            .catch(e => console.log("Error updating watched items", e))

    }

    render() {
        const activeFilters = this.props.filters;
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
            .map( item => {
                let isWatched = this.props.user.watchedItems.includes(item._id);
                return <ItemCard item={item} handleItemClick={this.handleItemClick} isWatched={isWatched}/>
            })
        )
    }
}

const mapStateToProps = (state) => {
    return {
      filters: state.filters,
      user: state.user,
    }
  }

export default connect(mapStateToProps, { updateWatchedItems })(ItemList);