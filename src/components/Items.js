import React from 'react';
import { 
    Button,
    Card,
    CardTitle,
    CardSubtitle,
   } from 'reactstrap';

const ItemCard = ({ item }) => (
    <Card className="my-2 rounded-0">
      <div className="row align-items-center p-2">
        <div className="col-8 align-items-center text-left">
          <CardSubtitle>{ item.brandDisplayName }</CardSubtitle>
          <CardTitle tag="h5">{ item.name }</CardTitle>
        </div>
        <div className="col-4 text-center">
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

export default ItemList;