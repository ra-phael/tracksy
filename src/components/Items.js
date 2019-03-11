import React, { Component } from 'react';
import { 
    Button,
    Card,
    CardTitle,
    CardSubtitle,
   } from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { updateWatchedItems } from './../actions';
import { updateWatchedItemsCall } from '../services/api';


const ItemCard = ({ item, handleItemClick, isWatched }) => (
    <Card className="my-4 rounded-0 border-0 item-card">
      <div className="row align-items-center p-2">
        <div className="col-8 align-items-center text-left">
          <CardSubtitle className="item-card__brand">{ item.brandDisplayName }</CardSubtitle>
          <CardTitle tag="h4" className="item-card__name">{ item.name }</CardTitle>
        </div>
        <div className="col-4 text-center">
            <Button outline color="dark" className={"rounded-0 " + (isWatched ? "button-watched" : "")}
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
        if(!this.props.user.isUserLoggedIn) {
          this.props.history.push('/login/signup');
        } else {
          updateWatchedItemsCall(this.props.user.token, id)
              .then((res) => {
                  // console.log(res);
                  this.props.updateWatchedItems(res.watchedItems)
              })
              .catch(e => console.log("Error updating watched items", e))
        }
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
                let isWatched = this.props.user.watchedItems.some(el => el._id === item._id);
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

export default connect(mapStateToProps, { updateWatchedItems })(withRouter(ItemList));