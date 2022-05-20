// "use strict";
import recommend from "./recommend_film.js";
import { dataListFilms, dataListOfferFlims } from "./data.js";
import keySearchHeading from "./keySearchHeading.js";
import { HandleNavBar, CheckKeyParams } from "../JS/utils.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const filmId = window.location.href.slice(50);
const paramsKeys = CheckKeyParams(filmId);
const keyFilm = paramsKeys.key.split('-');
const btnZoomVideo = $('.watch-film__zoom');

const app = {
    isZoom: false,
    isLight: true,

    handleEventFilm: function () {
        var btnLigth = $('.watch-film__light');

        // Xử lý more-time offer-film và state offer-film
        recommend();

        btnZoomVideo.onclick = () => {
            if(this.isZoom) {
                $('.watch-film__block.zoom').classList.remove("zoom");
                $('.watch-film__more-film.zoom').classList.remove("zoom");
                btnZoomVideo.textContent = "Phóng to";
            } else {
                $('.watch-film__block').classList.add("zoom");
                $('.watch-film__more-film').classList.add("zoom");
                btnZoomVideo.textContent = "Thu nhỏ";
            }
            this.isZoom = !this.isZoom;
        };

        btnLigth.onclick = () => {
            var backgroundLigth = $('.handle-light');
            if(this.isLight) {
                backgroundLigth.style.display = 'block';
                $('.watch-film__handle-video__film').classList.add('light');
                $('.watch_film__btn-video').classList.add('light');
                btnLigth.textContent = "Bật đèn";
            } else {
                backgroundLigth.style.display = 'none';
                $('.watch-film__handle-video__film.light').classList.remove('light');
                $('.watch_film__btn-video.light').classList.remove('light');
                btnLigth.textContent = "Tắt đèn";
            }
            this.isLight = !this.isLight;
        }

        // Xử lý NavBar
        HandleNavBar();
    },

    showVideo: function (films, numberEpisode) {
        var video = $('.watch-film__handle-video__film');

        films.map(film => {
            if(film.id === Number(keyFilm[1])) {
                video.src = 'https://www.youtube.com/embed/' + film.listEpisode[numberEpisode] + '?modestbranding=1';
            }
            return;
        })
    },

    renderEpisode: function () {
        var episodes = $('.watch-film__episode__list');
        var episodeNameFilm = $('.watch-film__episode__name-film');

        if(keyFilm[0] === 'list' || keyFilm[0] === 'offer') {
            if(keyFilm[0] === 'list') {
                dataListFilms(films => {
                    films.map(film => {
                        if (film.id === Number(keyFilm[1])) {
                            episodes.innerHTML = film.listEpisode.map((episode, index) => {
                                if(index === 0) {
                                    return `
                                    <li class="watch-film__episode__item watch-film__episode__click"
                                        data-id=${index + 1}>${index + 1}</li>
                                    `;
                                }
                                return `
                                <li class="watch-film__episode__item">${index + 1}</li>
                                `;
                            }).join('');
                            episodeNameFilm.textContent = film.nameVi;
                        }
                        return;
                    })
                })
            } else {
                dataListOfferFlims(films => {
                    films.map(film => {
                        if (film.id === Number(keyFilm[1])) {
                            episodes.innerHTML = film.listEpisode.map((episode, index) => {
                                if(index === 0) {
                                    return `
                                    <li class="watch-film__episode__item watch-film__episode__click"
                                        data-id=${index + 1}>${index + 1}</li>
                                    `;
                                }
                                return `
                                <li class="watch-film__episode__item">${index + 1}</li>
                                `
                            }).join('');
                            episodeNameFilm.textContent = film.nameVi;
                        }
                        return;
                    })
                })
            }
        }
        return;
    },

    changeVideo: function () {
        const _this = this;

        if(keyFilm[0] === 'list' || keyFilm[0] === 'offer') {
            if(keyFilm[0] === 'list') {
                dataListFilms(films => {
                    var episodes = $$('.watch-film__episode__item');
                    Array.from(episodes).map(episode => {
                        _this.showVideo(films, 0);
                        episode.onclick = (e) => {
                            $('.watch-film__episode__item.watch-film__episode__click').classList.remove("watch-film__episode__click");
                            e.target.classList.add("watch-film__episode__click");
                            _this.showVideo(films, e.target.textContent - 1);
                        }
                    })
                })
            } else {
                dataListOfferFlims(films => {
                    var episodes = $$('.watch-film__episode__item');
                    Array.from(episodes).map(episode => {
                        _this.showVideo(films, 0);
                        episode.onclick = (e) => {
                            $('.watch-film__episode__item.watch-film__episode__click').classList.remove("watch-film__episode__click");
                            e.target.classList.add("watch-film__episode__click");
                            _this.showVideo(films, e.target.textContent - 1);
                        }
                    })
                })
            }
        }
        return;
    },

    renderSearchHeading: function () {
        if(keyFilm[0] === "list" || keyFilm[0] === "offer") {
            if(keyFilm[0] === "list") {
                dataListFilms(films => {
                    const getFilm = films.find((film, index) => {
                        return Number(keyFilm[1]) === index + 1;
                    })
                    keySearchHeading("", paramsKeys.type, getFilm.nameVi);
                })
            } else {
                dataListOfferFlims(films => {
                    const getFilm = films.find((film, index) => {
                        return Number(keyFilm[1]) === index + 1;
                    })
                    keySearchHeading("", paramsKeys.type, getFilm.nameVi);
                })
            }
        }
    },

    start: function () {
        this.handleEventFilm();
        this.renderEpisode();
        this.renderSearchHeading();
        this.changeVideo();
    }
}

app.start();