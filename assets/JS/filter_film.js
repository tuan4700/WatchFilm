"use strict";
import recommend from "./recommend_film.js";
import keySearchHeading from "./keySearchHeading.js";
import { dataListFilms } from "../JS/data.js";
import handleAccentedString from "./accented_string.js";
import { HandleNavBar, CheckKeyParams } from "../JS/utils.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const keyFilm = window.location.href.slice(51).replace(/%20/g, " ");
console.log(CheckKeyParams(keyFilm).type);

const elementListFilms = $('.row.s-gutters.content__product__list');

const app = {
    resetPages: false,

    handleEventFilms: function () {

        // Xử lý more-time offer-film và state offer-film
        recommend();

        // Xử lý header list film
        keySearchHeading(CheckKeyParams(keyFilm).search, CheckKeyParams(keyFilm).type, CheckKeyParams(keyFilm).key);

        // Xử lý NavBar
        HandleNavBar();
    },

    renderFilmSearch: function (listFilms) {
        var showFilms = 0;
        var elementListFilms = $('.row.s-gutters.content__product__list');
        const nameFilmSearch = CheckKeyParams(keyFilm).search.toLowerCase();

        elementListFilms.innerHTML = listFilms.map(film => {
            var checkFilmNameVi = handleAccentedString(film.nameVi).toLowerCase().indexOf(nameFilmSearch);
            var checkFilmNameEng = handleAccentedString(film.nameEng).toLowerCase().indexOf(nameFilmSearch);
            if(checkFilmNameVi !== -1 || checkFilmNameEng !== -1) {
                showFilms++;
                return this.renderFilm(film);
            }
            return;
        }).join('');
        this.showListPage(showFilms);
        this.handleListPage();
    },

    renderFilm: function (films) {
        return `
        <li class="col l-3 m-3 c-12 content__product__item">
            <div class="content__product__background">
                <img src="${films.img}" alt="${films.nameVi}"
                    class="product__img content__product__img">
                <a href="./content_film.html?type=${CheckKeyParams(keyFilm).type}&keyID=list-${films.id}" class="content__product__item-overlay product__overlay">
                    <i class="product__overlay__icon far fa-play-circle"></i>
                </a>
                <div class="status">
                    <div class="status__episodes">${films.listEpisode.length}/${films.episode}</div>
                    <div class="status__language">${films.translate}</div>
                </div>
                <div class="content__product-block">
                    <div class="content__product__info">
                        <div title="${films.nameVi}" class="content__product__info-vi name-film__vi s-product">${films.nameVi}</div>
                        <div title="${films.nameEng}" class="content__product__info-eng name-film__eng s-product">${films.nameEng}</div>
                    </div>
                    <div class="content__product__plot">
                        <b>${films.nameVi}</b> ${films.info}
                    </div>
                    <div class="product__origin">
                        <div class="product__origin__year">${films.year}</div>
                        <div class="product__origin__like">
                            <i class="product__origin__like-icon fas fa-heart"></i>
                            <div class="product__origin__like-count">${films.love}</div>
                        </div>
                    </div>
                </div>
            </div>
        </li>
        `;
    },

    showListPage: function (films) {
        var pages = Math.ceil(films / 20);
        var listPage = [];

        for (var i = 0; i < pages; i++) {
            listPage[i] = i;
        }

        const showPage = listPage.map(function(page) {
            if (page === 0) { 
                return `
                <li class="content__product__item-pages content__product__click-page">${page + 1}</li>
                `;
            }
            return `
            <li class="content__product__item-pages">${page + 1}</li>
            `;
        });
        
        if(showPage.length === 1) {
            $('.content__product__list-pages').hidden = true;
        }
        $('.content__product__list-pages').innerHTML = showPage.join('');
    },

    handleListPage: function (resetPages) {
        const pages = $$('.content__product__item-pages');
        const listFilm = $('.content__product__list');

        if(pages.length === 1) {
            pages.forEach(page => {
                page.style.display = 'none';
            })
        }

        if(resetPages) {
            listFilm.style.transform = 'translateY(0)';
            $('.content__product__item-pages.content__product__click-page')
                .classList.remove('content__product__click-page');
            pages[0].classList.add('content__product__click-page');
            this.resetPages = false;
        }

        Array.from(pages).forEach(function (page) {
            page.onclick = function (e) {
                var newPage = e.target.innerText;
                if (newPage) {
                    if (window.innerWidth >= 740) {
                        var rangePages = 0 - ((newPage - 1) * 1415);
                        listFilm.style.transform = 'translateY(' + rangePages + 'px)';
                        $('.content__product__item-pages.content__product__click-page')
                            .classList.remove('content__product__click-page');
                        e.target.classList.add('content__product__click-page');
                    } else {
                        var rangePages = 0 - ((newPage - 1) * 4240);
                        listFilm.style.transform = 'translateY(' + rangePages + 'px)';
                        $('.content__product__item-pages.content__product__click-page')
                            .classList.remove('content__product__click-page');
                        e.target.classList.add('content__product__click-page');
                    }
                }
            }
        });
    },

    sortFilm: function (listFilm) {
        var showFilms = 0;
        const status = $('#arrange-status');
        const country = $('#arrange-country');
        const kind = $('#arrange-kind');
        const time = $('#arrange-time');

        status.onchange = e => {
            var selectValue = handleAccentedString(e.target.value).toLowerCase();

            switch (selectValue) {
                case "default":
                    elementListFilms.innerHTML = listFilm.map(film => {
                        showFilms++;
                        return this.renderFilm(film)
                    }).join('');
                    break;
                case "oldest":
                    elementListFilms.innerHTML = [...listFilm].reverse().map(film => {
                        showFilms++;
                        return this.renderFilm(film);
                    }).join('');
                    break;
                case "movietitle":
                    const newListFilm = [...listFilm].sort((item1, item2) => {

                        if(handleAccentedString(item1.nameVi) < handleAccentedString(item2.nameVi)) return -1;
                        if(handleAccentedString(item1.nameVi) > handleAccentedString(item2.nameVi)) return 1;
                        return 0;
                    })
                    elementListFilms.innerHTML = newListFilm.map(film => {
                        showFilms++;
                        return this.renderFilm(film);
                    }).join('');
                    break;
                default:
                    break;
            }

            country.value = "Default";
            kind.value = "Default";
            time.value = "Default";
            this.resetPages = true;
            this.showListPage(showFilms);
            this.handleListPage(this.resetPages);
            showFilms = 0;
        };

        country.onchange = e => {
            var selectValue = handleAccentedString(e.target.value).toLowerCase();
            if(selectValue === "default") {
                elementListFilms.innerHTML = listFilm.map(film => {
                    showFilms++;
                    return this.renderFilm(film)
                }).join('');
            } else {
                elementListFilms.innerHTML = listFilm.map(film => {
                    var checkValue = handleAccentedString(film.national).toLowerCase().indexOf(selectValue);
                    if(checkValue !== -1) {
                        showFilms++;
                        return this.renderFilm(film);
                    }
                }).join('');
            }

            status.value = "Default";
            kind.value = "Default";
            time.value = "Default";
            this.resetPages = true;
            this.showListPage(showFilms);
            this.handleListPage(this.resetPages);
            showFilms = 0;
        };

        kind.onchange = e => {
            var selectValue = handleAccentedString(e.target.value).toLowerCase();
            if(selectValue === "default") {
                elementListFilms.innerHTML = listFilm.map(film => {
                    showFilms++;
                    return this.renderFilm(film);
                }).join('');
            } else {
                elementListFilms.innerHTML = listFilm.map(film => {
                    var checkValue = handleAccentedString(film.categorys.toString()).toLowerCase().indexOf(selectValue);
                    if(checkValue !== -1) {
                        showFilms++;
                        return this.renderFilm(film);
                    }
                }).join('');
            }

            status.value = "Default";
            country.value = "Default";
            time.value = "Default";
            this.resetPages = true;
            this.showListPage(showFilms);
            this.handleListPage(this.resetPages);
            showFilms = 0;
        };

        time.onchange = e => {
            var selectValue = e.target.value;
            if(selectValue === "Default") {
                elementListFilms.innerHTML = listFilm.map(film => {
                    showFilms++;
                    return this.renderFilm(film)
                }).join('');
            } else {
                elementListFilms.innerHTML = listFilm.map(film => {
                    if(film.year.toString() === selectValue) {
                        showFilms++;
                        return this.renderFilm(film);
                    }
                }).join('');
            }

            status .value = "Default";
            country.value = "Default";
            kind.value = "Default";
            this.resetPages = true;
            this.showListPage(showFilms);
            this.handleListPage(this.resetPages);
            showFilms = 0;
        };
        
    },

    renderFilmsType: function (listFilm) {
        const filmType = CheckKeyParams(keyFilm).type;
        var showFilms = 0;
        switch (filmType) {
            case "bo":
                elementListFilms.innerHTML = listFilm.map(film => {
                    if(film.episode > 1) {
                        showFilms++;
                        return this.renderFilm(film);
                    }
                }).join('');
                this.resetPages = true;
                this.showListPage(showFilms);
                this.handleListPage(this.resetPages);
                showFilms = 0;
                break;
            case "le":
                elementListFilms.innerHTML = listFilm.map(film => {
                    if(film.episode === 1) {
                        showFilms++;
                        return this.renderFilm(film);
                    }
                }).join('');
                this.resetPages = true;
                this.showListPage(showFilms);
                this.handleListPage(this.resetPages);
                showFilms = 0;
                break;
            case "vietsub":
                elementListFilms.innerHTML = listFilm.map(film => {
                    if(film.translate === "Vietsub") {
                        showFilms++;
                        return this.renderFilm(film);
                    }
                }).join('');
                this.resetPages = true;
                this.showListPage(showFilms);
                this.handleListPage(this.resetPages);
                showFilms = 0;
                break;
            case "thuyetminh":
                elementListFilms.innerHTML = listFilm.map(film => {
                    if(film.translate === "Thuyết Minh" || film.translate === "Lồng Tiếng") {
                        showFilms++;
                        return this.renderFilm(film);
                    }
                }).join('');
                this.resetPages = true;
                this.showListPage(showFilms);
                this.handleListPage(this.resetPages);
                showFilms = 0;
                break;
            default:
                break;
        }
    },

    start: function () {
        const _this = this;

        dataListFilms(films => {
            _this.renderFilmSearch(films);
            _this.renderFilmsType(films);
            _this.sortFilm(films);
        })
        
        this.handleEventFilms();
    }
}

app.start();