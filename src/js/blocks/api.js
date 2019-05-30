class Api {

  // get data from server
  get({data, page} = {options}) {
    return new Promise(function(resolve, reject) {
      fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=7b593d1a115b3d98bf97a2790a4646f6&tags=${data}&per_page=10&page=${page}&format=json&nojsoncallback=1`)
      .then(response => response.json())
      .then(result => resolve(result))
      .catch(error => reject(new Error(error)));
    })
  }

};

export default Api;