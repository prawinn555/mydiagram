import React, { PureComponent } from "react";
import Header from "./Header";
import SearchInput from "./SearchInput";
import DataResults from "./DataResults";

import dataFetcher from "./dataFetcher";
import CreateButton from "./CreateButton";

import Popup from 'react-popup';

import "./App.css";

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
       dataToShow : []
    }
    
    // this fonction will notify this 
    // for data change.
    dataFetcher("", this);

    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  // event is generated from the <input>
  handleSearchChange(event) {
    console.log("App.handleSearchChange %s", event.target.value);
    dataFetcher(event.target.value, this);
  };
  
  
  refresh(newListData) {
    this.setState({
      dataToShow : newListData
    });
  }

  // when the input change, 
  // SearchInput will call handleSearchChange
  render() {
    return (
      <div>
        <Header />
        <SearchInput parent={this} />
        <DataResults listData={this.state.dataToShow} />
        
        <Popup />
        
        <CreateButton />
      </div>
      

    );
  }
}



export default App;
