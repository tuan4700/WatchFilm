const dataListFilmApi = 'http://localhost:3000/films';
const dataListOfferFilmApi = 'http://localhost:3000/offerFilms';

export function dataListFilms(callback) {
    fetch(dataListFilmApi)
        .then(function (response) {
            return response.json();
        })
        .then(callback)
};

export function dataListOfferFlims(callback) {
    fetch(dataListOfferFilmApi)
        .then(function (response) {
            return response.json();
        })
        .then(callback)
};