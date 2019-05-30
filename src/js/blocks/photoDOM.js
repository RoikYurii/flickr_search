class PhotoDOM {

  constructor() {
    this.imagesHtml = $("#imagesContainer");
    this.lazyBtn = $("#lazyBtn");
    this.loadIcon = $("#loadIcon");
    this.input = $("#searchInp");
    
    this.curData;
    this.type;
  }

  getOptions(el) {
    let data = $(this.input).val();
    let page = el.attr("data-page");
    this.type = el.attr("data-type");

    if (this.type === "standart") {
      if (data.length > 0) {
        this.imagesHtml.html("");
        if (data !== this.curData) { this.curData = data; };
      } else {
        alert ("Search request can't be empty");
        return false;
      }
    }
    return { data: this.curData, page: page };

  };

  validate(res) {
    if (res.photos.total === "0") {
      alert ("Images were not found :(");
      return false;
    } else if (res.stat === "ok") {
      if (+res.photos.photo.length < 10) { this.lazyBtn.fadeOut(); }
      return true;
    } else {
      alert ("Some error has heppened");
    }
    throw (res.code + " - " + res.message);
  }


  addPhotos(res) {

      let photosHtml = "";
      let photos = res.photos.photo;

      // creating images
      photos.forEach(photo => {
        let photoSrc = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_n.jpg`;
        photosHtml += `<div class="images__item new-image">
                                <p>${photo.title}</p>
                                <img src="${photoSrc}" alt="${photo.title}">
                              </div>
                              `;
      });
      this.imagesHtml.append(photosHtml);
      setTimeout(() => {
        $(".new-image").removeClass("new-image");
      }, 100);
      $("#loadIcon").fadeOut();

      // lazyload settings
      if (this.type === "standart") {
        this.lazyBtn.fadeIn();
        $(this.lazyBtn).attr("data-page", 2);
      } else {
        let nextPage = +$(this.lazyBtn).attr("data-page") + 1;
        $(this.lazyBtn).attr("data-page", nextPage);
      }

  };

};

export default PhotoDOM;

