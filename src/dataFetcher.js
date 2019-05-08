
export default function dataLoaderAndFilter(searchText, app) {
  

  console.log(`filter with ${searchText}`);

  var url = 'https://nodejs-sql.glitch.me/products?searchName=' +searchText;
  
  fetch(url)
  .then(function(response) {
    return response.json();
  })
  .then(myJson => {
    console.log(myJson);
    app.refresh(myJson);
  })
  .catch(error => console.error(error))
  

}
