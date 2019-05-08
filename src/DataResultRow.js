import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import "./DataResultRow.css";

class DataResultsRow extends PureComponent {
  render() {
    return (
      <div
        className="component-data-result-row copy-to-clipboard"
      >
        <span className="title">{this.props.dataItem.name} - {this.props.dataItem.data}</span>
      </div>
    );
  }
}
DataResultsRow.propTypes = {
  kkk: PropTypes.string,
  dataItem: PropTypes.object

};
export default DataResultsRow;
