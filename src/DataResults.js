import React, { PureComponent } from "react";
import PropTypes from "prop-types";


import DataResultRow from "./DataResultRow";
import "./DataResults.css";

class DataResults extends PureComponent {
  render() {
    console.log(`render ${this.props.listData}`);

    
    return (
      <div className="component-data-results">
        {
          (this.props.listData.length>=1)? 
            generateRows(this.props.listData) : generateEmpty()
        }
      </div>
    );
  }
  

}
DataResults.propTypes = {
	listData: PropTypes.array
};
export default DataResults;

    
    var generateRows = function(array){
      return array.map(
              item => {
                console.log(`processing ${item.name}`);
                return (
                  <DataResultRow
                    key={item.name}                    
                    dataItem={item}
                  />
                );
              }
            );
    };
    
    var generateEmpty = function(){
      var res= (
                  <DataResultRow
                    key={'empty'}     
                    dataItem={ {name:'no matching result', time:''}  }
                      
                  />
            );
      console.log(`No matching`);
      // res is Symbol(react.element)
      return res;
    };