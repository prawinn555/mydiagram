import React, { PureComponent } from "react";
import Header from "./Header";
import DiagramEditor from "./DiagramEditor";
import DiagramSaver from "./DiagramSaver";
import DiagramSearch from "./DiagramSearch";


import "./App.css";

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      //  initial content
     diagram : {
        name : 'My new diagram',
        data : 
          `
          sequenceDiagram
              participant Alice
              participant Bob
              Alice->John: Hello John, how are you?
              loop Healthcheck
                  John->John: Fight against hypochondria
              end
              Note right of John: Rational thoughts <br/>prevail...
              John-->Alice: Great!
              John->Bob: How about you?
              Bob-->John: Jolly good!
          `,
          }
      };
    this.handleLoadDiagram = this.handleLoadDiagram.bind(this);
    this.handleForm = this.handleForm.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleDiagramContentChange = this.handleDiagramContentChange.bind(this);
  }

  handleLoadDiagram(dataJSon) {
    dataJSon.data = dataJSon.data.replace('\\n','\n');
    this.setState( {
       diagram: dataJSon,
    });
    console.log('App change diagram ',dataJSon);
  }
  
  handleForm(changeData) {
     this.setState({
        diagram : {
          ...this.state.diagram,
          ...changeData
        }
     });
  }
  
  handleSave() {
    console.log(`save`,this.state.diagram);
    // save or replace
    var url = "https://cors-anywhere.herokuapp.com/" 
        +'https://nodejs-sql.glitch.me/products/create';
    fetch(url, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(this.state.diagram)
      }
    )
    .then(function(response) {
      return response.text();
    })
    .then(text => {
      console.log('response', text);
      alert(`Bravo ! The diagram ${this.state.diagram.name} has been saved :);`)
    })
    .catch(error => console.error(error));
  
  }

  handleDiagramContentChange(content) {
     this.setState({
        diagram : { 
           ...this.state.diagram,
           data : content.replace('\\n','\n')
        }
     });;
    console.log('handleDiagramContentChange',this.state.diagram);
  }
  
  // when the input change, 
  // SearchInput will call handleSearchChange
  render() {
    console.log('App render');
    return (
      <div>
        <Header text={'Edit my diagram'} />

        <DiagramEditor diagramContent={this.state.diagram.data} 
          handleDiagramContentChange={this.handleDiagramContentChange} />
        
        <Header text={'Save my diagram'} />
        
        <DiagramSaver name={this.state.diagram.name} 
            description={this.state.diagram.description} 
            handleForm={this.handleForm} 
            handleSave={this.handleSave} ></DiagramSaver>

        <br/>
        <br/>
        <DiagramSearch handleLoadDiagram={this.handleLoadDiagram} ></DiagramSearch>

        
      </div>
      

    );
  }
}



export default App;
