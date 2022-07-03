import React, { PureComponent } from "react";
import Button from 'react-bootstrap/Button';
import Modal  from 'react-bootstrap/Modal';
import Header from "./Header";
import SearchInput from "./SearchInput";
import "./DataResultRow.css";

class DiagramSearch extends PureComponent {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
       show: false,
       dataToShow : [],
    };
    
    this.dataFetcher("");
    this.handleSearchChange = this.handleSearchChange.bind(this);
    // this.handleSelection = this.handleSelection.bind(this);
    this.handleCloseAndLoadDiagram = this.handleCloseAndLoadDiagram.bind(this);
    
  }

  // event is generated from the <input>
  handleSearchChange(event) {
    console.log("App.handleSearchChange %s", event.target.value);
    this.setState({
      selectedItem: undefined,
    }); // clear selection
    this.dataFetcher(event.target.value);
  };
  
  dataFetcher(searchText) {
    console.log(`filter with ${searchText}`);
    var url = 'https://nodejs-sql.glitch.me/products?searchName=' +searchText;
    fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(myJson => {
      console.log(myJson);
      this.setState({
        dataToShow : myJson
      });
    })
    .catch(error => console.error(error))
  }
  
  handleSelection(event, item) {
    console.log('selected ', item); 
    this.setState({
      selectedItem : item
    }); 
    
  }
  

  handleClose() {
    this.setState({ show: false });
  }

  handleCloseAndLoadDiagram() {
    this.setState({ show: false });
    this.props.handleLoadDiagram(this.state.selectedItem);
  }
  
  handleShow() {
    this.setState({ 
      show: true, 
      selectedItem: undefined, });
     this.dataFetcher("");
  }

  
  
   generateRows(array){
      return array.map(
              item => {
                // console.log(`processing ${item.name}`);
                return (
                   <div 
                     key={item.name}
                     className={
                        'component-data-result-row'
                        + ((this.state.selectedItem!==undefined && this.state.selectedItem.name===item.name)?' component-data-result-row-selected': '') }
                     onClick={(e) => this.handleSelection(e, item)} 
                     name={item.name}
                     >
                    <span className="title">{item.name} - {item.description} 
                    </span>
                  </div>                   
                );
              }
            );
  }
    
  generateEmpty(){
      var res= <div className="component-data-result-row" >
                    <span className="title">Loading or no result</span>
                  </div> ;
      console.log(`No matching`);
      return res;
    }
  
  render() {
    return (
      <>
        <Button variant="primary" onClick={this.handleShow}>
          Search for my diagram
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose} size="lg" >
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            
            <Header text={'Search my diagrams'} />
            <SearchInput parent={this} />

            <div className="component-data-result" >
              {
                (this.state.dataToShow.length>=1)? 
                  this.generateRows(this.state.dataToShow) : this.generateEmpty()
              }
            </div>


          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" 
              onClick={this.handleCloseAndLoadDiagram}
              disabled={this.state.selectedItem===undefined}>
              Open
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default DiagramSearch;