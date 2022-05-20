// "use strict";
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
var listOfferTime = $$('.content__movie-more__time');
var listOfferState = $$('.nom-com-movie__heading__text');

export default function recommend() {

  // Xử lý more-time offer-film
  listOfferTime.forEach(function (offer) {
    offer.onclick = function (e) {
        $('.content__movie-more__time.movie-more__time-click').classList.remove('movie-more__time-click');
        e.target.classList.add('movie-more__time-click');
    };
  });

  // Xử lý state offer-film
  listOfferState.forEach(function (offer) {
    offer.onclick = function (e) {
        $('.nom-com-movie__heading__text.nom-com-movie__heading__text-click').classList.remove('nom-com-movie__heading__text-click');
        e.target.classList.add('nom-com-movie__heading__text-click');
    };
  });
}
