# Learn how to use React.js to build a Web App with RESTful service - search example

Hi, Welcome to my project.
Here, you will find example code to create a web app, using the following frameworks

* NodeJS as the server
* React Javascript library


Test diagram :

![Alt text](https://g.gravizo.com/source/custom_mark10?https%3A%2F%2Fraw.githubusercontent.com%2FTLmaK0%2Fgravizo%2Fmaster%2FREADME.md)
<details> 
<summary></summary>
custom_mark10
  digraph G {
    size ="4,4";
    main [shape=box];
    main -> parse [weight=8];
    parse -> execute;
    main -> init [style=dotted];
    main -> cleanup;
    execute -> { make_string; printf};
    init -> make_string;
    edge [color=red];
    main -> printf [style=bold,label="100 times"];
    make_string [label="make a string"];
    node [shape=box,style=filled,color=".7 .3 1.0"];
    execute -> compare;
  }
custom_mark10
</details>


## Online live demo

[Github pages](https://prawinn555.github.io/mydiagram/)



## Code

From [Github](https://github.com/prawinn555/mydiagram)


## Installation

```

git clone https://github.com/prawinn555/mydiagram
cd mydiagram/


npm i
npm start

```


## Deployment

```
npm run build

gh-pages -d build

```

(must install gh-pages before)





## Understand the code


### Bootstrapping and rendering

* The bootstap is index.js

* The script index.js will generate the HTML page from index.html.
The module App is call, and the content is put in the root element in index.html.

```
ReactDOM.render(<App />, document.getElementById("root"));
```
* The module App (App.js) renders the following content.

```
      <div>
        <Header />
        <SearchInput textChange={this.handleSearchChange} />
        <DataResults listData={this.state.filteredData} />
      </div>
```

* The related modules ( SearchInput & DataResults) are invoked to render their contents.


* The SearchInput module renders its content as follows 

```
      <div className="component-search-input">
        <div>
          <input onChange={this.handleChange} />
        </div>
      </div>
```


* The DataResults module renders its content as follows 

```
      <div className="component-data-results">
        {this.props.listData.map(dataItem => (
          <DataResultRow
            key={dataItem.title}
            symbol={dataItem.symbol}
            title={dataItem.title}
          />
        ))}
      </div>
```


* The DataResultRow module renders each single row.

```
      <div
        className="component-data-result-row copy-to-clipboard"
        data-clipboard-text={this.props.symbol}
      >
        <img alt={this.props.title} src={src} />
        <span className="title">{this.props.title}</span>
        <span className="info">Click to copy data</span>
      </div>
```



### Initialisation


* In App.js, data is prepared by {this.state.filteredData}, 
the result is sent to DataResults.
( the change on the data will provoke re-rendering).




```
  handleSearchChange = event => {
    this.setState({
      filteredData: filterData(event.target.value, 20)
    });
  };

  render() {
    return (
      <div>
        <Header />
        <SearchInput textChange={this.handleSearchChange} />
        <DataResults listData={this.state.filteredData} />
      </div>
    );
  }
```



### Change events



* In App.js, the 'textChange' function will execute on change events. The source is {


```
  handleSearchChange = event => {
    this.setState({
      filteredData: filterData(event.target.value, 20)
    });
  };

  render() {
    return (
      <div>
        <Header />
        <SearchInput textChange={this.handleSearchChange} />
        <DataResults listData={this.state.filteredData} />
      </div>
    );
  }
```




## Acknowledgments

* All framework contributors

