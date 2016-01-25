

var CarouselSwiper = (function(window, document) {
  function CarouselSwiper(carouselEle, params) {
    if (typeof(carouselEle) !== "string" || (typeof(carouselEle) === "string" && !document.querySelector(carouselEle)))
      throw new Error("Need a document element to init settings.");

    var carouselWrapper = document.querySelector(carouselEle);
    this.containerHeight = carouselWrapper.clientHeight;
    this.autoPlayFlag = true;
    this.autoPlayInterval = 2000;
    var carouselContainer = carouselWrapper.querySelector(".carousel-list");
    var carouselList = carouselWrapper.querySelectorAll(".carousel-block");
    var pageNumbers = carouselWrapper.querySelectorAll(".page-num");
    this.carouselContainer = carouselContainer;
    this.length = carouselList.length;
    this.pageNumbers = pageNumbers;

    if (!this.pageNumbers) return;
    var carousel = this;
    var pageNumbers = this.pageNumbers;
    for (var i = 0; i < pageNumbers.length; i++) {
      pageNumbers[i].addEventListener("click", function() {
        for (var j = 0; j < pageNumbers.length; j++) {
          if (pageNumbers[j] === this) {
            carousel.scrollUp(j);
            return;
          }
        }
      });
    }
    if (carousel.autoPlayFlag)
      carousel.autoPlay();

    // this.init();
  }

  CarouselSwiper.prototype = {
    constructor: CarouselSwiper,
    init: function() {
    },
    autoPlay: function(config) {
      var carousel = this;
      setInterval(function() {
        carousel.scrollUp();
      }, carousel.autoPlayInterval);
    },
    scrollUp: function(index) {
      if (index)
        this.carouselContainer.style.top = -this.containerHeight * index + "px";
      else {
        var topValue = this.carouselContainer.style.top;
        var topIntValue = topValue.substring(0, topValue.indexOf("px"));
        var totalHeight = this.carouselContainer.clientHeight;
        if (this.containerHeight - topIntValue == totalHeight) {
          this.carouselContainer.style.top = "0px";
          return;
        }
        this.carouselContainer.style.top = this.carouselContainer.style.top.substring(0, topValue.indexOf("px")) - this.containerHeight + "px";
      }
    }
  }
  return CarouselSwiper;
})(window, document);
