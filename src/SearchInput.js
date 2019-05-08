import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import "./SearchInput.css";

class SearchInput extends PureComponent {


  render() {
    return (
      <div className="component-search-input">
        <div>
          <input onChange={this.props.parent.handleSearchChange} />
        </div>
      </div>
    );
  }
}

SearchInput.propTypes = {
  parent: PropTypes.object
};

export default SearchInput;
