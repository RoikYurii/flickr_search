// IE
import "isomorphic-fetch";
import "es6-promise/auto"

import './blocks/app.js';

import Api from './blocks/api.js';
const api = new Api;
import PhotoDOM from './blocks/photoDOM';
const photoDom = new PhotoDOM;


$("#searchForm").on("submit", function(e) {
  e.preventDefault();    
  loadPhotos($(this));
})

$("#lazyBtn").on("click", function() {
  loadPhotos($(this));
})

// Main function
function loadPhotos(el) {
  let options = photoDom.getOptions(el);
  if (options) {
    photoDom.loadIcon.fadeIn();
    api.get(options)
    .then(res => {      
      if (photoDom.validate(res)) { 
        photoDom.addPhotos(res, options.type); 
      } else {
        photoDom.lazyBtn.fadeOut();
        photoDom.loadIcon.fadeOut();
      }
    }
  )
  } else {
    photoDom.loadIcon.fadeOut();
    return false;
  }
}