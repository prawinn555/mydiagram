import React, { PureComponent } from "react";
import "./DiagramEditor.css";

class DiagramEditor extends PureComponent {
  constructor(props) {
    super(props);

    // compteur technique pour mermaid.
    this.counter = 1;
    
    this.handleChange = this.handleChange.bind(this);
  }

  // event is generated from the <input>
  handleChange(event) {

        const target = event.target;
        this.props.handleDiagramContentChange(target.value);

        //console.log("DiagramEditor.handleChange %s", value);
  };
  

  componentDidUpdate() {
        this.genDiagram();
  }
  
  componentDidMount() {
        this.genDiagram();
  }
  
  genDiagram() {
        try {

            var element = document.querySelector("#myDiagramDiv");
            console.log('update');
            var insertSvg = function(svgCode, bindFunctions){
                    element.innerHTML = svgCode;
            };
            window.mermaid.render('graphSvg' + (this.counter++), 
                                  this.props.diagramContent, insertSvg);
            console.log('fin update');
 
        } catch(e) {
          console.log(e);
        }
  }
  
 

  // when the input change, 
  // SearchInput will call handleSearchChange
  render() {
    console.log('DiagramEditor.render %s', this.props.diagramContent);
 
    return (
      <div>
        <p>To see the syntax : 
          <a href="https://mermaidjs.github.io/" target="_blank" 
            rel="noopener noreferrer" >Mermaidjs</a>
        </p>
        <div className="row">
          <div className="column half col1" >
            <textarea name="diagramContent"
              value={this.props.diagramContent} 
              onChange={this.handleChange}
              className="fullWidth fullHeight" />
          </div>
          <div className="column half col2" >
            <div id="myDiagramDiv" ></div>
          </div>
        </div>
      </div>
    );
  }
}



export default DiagramEditor;
