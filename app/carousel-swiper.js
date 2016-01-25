
/**
 * CarouselSwiper 自动化轮播页面
 * @param  {window} function(window, document      window Object
 * @return
 */
var CarouselSwiper = (function(window, document) {
  function CarouselSwiper(carouselEle, params) {
    if (typeof(carouselEle) !== "string" || (typeof(carouselEle) === "string" && !document.querySelector(carouselEle)))
      throw new Error("Need a document element to init settings.");

    var carouselWrapper = document.querySelector(carouselEle);
    var carouselContainer = carouselWrapper.querySelector(".carousel-list");
    var carouselList = carouselWrapper.querySelectorAll(".carousel-block");
    var pageNumbers = carouselWrapper.querySelectorAll(".page-num");
    
    this.containerHeight = carouselWrapper.clientHeight;
    this.autoPlayFlag = true;
    this.autoPlayInterval = 2000;
    this.carouselContainer = carouselContainer;
    this.length = carouselList.length;
    this.pageNumbers = pageNumbers;

    if (!this.pageNumbers) return;
    var carousel = this;
    var pageNumbers = this.pageNumbers;
    for (var i = 0; i < pageNumbers.length; i++) {
      pageNumbers[i].addEventListener("click", function() {
        for (var j = 0; j < pageNumbers.length; j++) {
          if (pageNumbers[j] === this && !pageNumbers[j].classList.contains("active")) {
            carousel.scrollUp(j);
            carousel.changePageNum(j);
            return;
          }
        }
      });
    }
    if (carousel.autoPlayFlag)
      carousel.autoPlay();
  }

  CarouselSwiper.prototype = {
    constructor: CarouselSwiper,
    init: function() {
    },
    autoPlay: function(config) {
      var carousel = this;
      setInterval(function() {
        carousel.scrollUp();
        carousel.changePageNum();
      }, carousel.autoPlayInterval);
    },
    scrollUp: function(index) {
      var topIntValue = this.getTopIntValue(this.carouselContainer);
      if (index)
        this.carouselContainer.style.top = -this.containerHeight * index + "px";
      else {
        var totalHeight = this.carouselContainer.clientHeight;
        if (this.containerHeight - topIntValue == totalHeight) {
          this.carouselContainer.style.top = "0px";
          return;
        }
        this.carouselContainer.style.top = topIntValue - this.containerHeight + "px";
      }
    },
    changePageNum: function(index) {
      if (!index && index !== 0)
        index = -(this.getTopIntValue(this.carouselContainer) / this.containerHeight);

      var pageNumbers = document.querySelectorAll(".carousel-pager .page-num");
      for (var i = 0; i < pageNumbers.length; i++) {
        if (pageNumbers[i] == pageNumbers[index])
          pageNumbers[i].classList.add("active");
        else
          pageNumbers[i].classList.remove("active");
      }
    },
    getTopIntValue: function(element) {
      if (!element) return;
      var topValue = element.style.top;
      return topValue.substring(0, topValue.indexOf("px"));
    }
  }
  return CarouselSwiper;
})(window, document);
