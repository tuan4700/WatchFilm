// "use strict";
import recommend from "./assets/JS/recommend_film.js";
import { dataListFilms, dataListOfferFlims } from "./assets/JS/data.js";
import { HandleNavBar } from "./assets/JS/utils.js";
 
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const nextOfferFilms = $('.content__viewport-right');
const prevOfferFilms = $('.content__viewport-left');

const app = {
    widthOfferFilm: 0,

    renderFilms: function (listFilms) {
        var i = 0;
        const htmlFilms = listFilms.map(film => {
            i++;
            if (i <= 20) {
                return `
                <li class="col l-3 m-3 c-12 content__product__item">
                    <div class="content__product__background" data-id=${film.id}>
                        <img src="${film.img}" alt="${film.nameVi}"
                            class="product__img content__product__img">
                        <a href="/assets/html/content_film.html?keyID=list-${film.id}" class="content__product__item-overlay product__overlay">
                            <i class="product__overlay__icon far fa-play-circle"></i>
                        </a>
                        <div class="status">
                            <div class="status__episodes">${film.listEpisode.length}/${film.episode}</div>
                            <div class="status__language">${film.translate}</div>
                        </div>
                        <div class="content__product-block">
                            <div class="content__product__info">
                                <div title="${film.nameVi}" class="content__product__info-vi name-film__vi s-product">${film.nameVi}</div>
                                <div title="${film.nameEng}" class="content__product__info-eng name-film__eng s-product">${film.nameEng}</div>
                            </div>
                            <div class="content__product__plot">
                                <b>${film.nameVi}</b> ${film.info}
                            </div>
                            <div class="product__origin">
                                <div class="product__origin__year">${film.year}</div>
                                <div class="product__origin__like">
                                    <i class="product__origin__like-icon fas fa-heart"></i>
                                    <div class="product__origin__like-count">${film.love}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
                `;
            }
            return;
        })
        $('.row.s-gutters.content__product__list').innerHTML = htmlFilms.join('');
        this.clickFilm("list");
    },

    renderOfferFilms: function (listFilms) {
        var i = 0;
        const htmlFilms = listFilms.map(film => {
            return `
            <li class="col l-3 m-3 content__viewport">
                <div class="content__viewport__banner">
                    <img src="${film.img}"
                        alt="${film.nameVi}" class="product__img content__viewport__img">
                    <a href="/assets/html/content_film.html?keyID=offer-${film.id}" class="content__viewport__overlay product__overlay">
                        <i class="product__overlay__icon far fa-play-circle"></i>
                    </a>
                </div>
                <div class="content__viewport__info">
                    <div title="${film.nameVi}" class="content__info__name-vi name-film__vi">${film.nameVi}</div>
                    <div title="${film.nameEng}" class="content__info__name-eng name-film__eng">${film.nameEng}</div>
                </div>
                <div class="status">
                    <div class="status__episodes">${film.listEpisode.length}/${film.episode}</div>
                    <div class="status__language">${film.translate}</div>
                </div>
            </li>
            `;
        })
        $('.content__viewport__list-films').innerHTML = htmlFilms.join('');
    },

    handleEvent: function () {

        // Xử lý more-time offer-film và state offer-film
        recommend();

        // Xử lý NavBar
        HandleNavBar();
    },

    clickFilm: function (type) {
        const test = $$('.content__product__background');
        test.forEach(item => {
            item.onclick = () => {
                window.location.href = `http://127.0.0.1:5500/assets/html/content_film.html?q=${type}-${item.dataset['id']}`;
            }
        })
    },

    // Thay đổi banner-films
    offerFilms: function (changed, list) {
        var listOfferFilms = $('.content__viewport__list-films');
        var widthHiddenOffer = (list.length - 4) * 176.22;
        if (changed === 1) {
            if (this.widthOfferFilm <= `-${widthHiddenOffer}`) {
                this.widthOfferFilm = 0;
            } else {
                this.widthOfferFilm = this.widthOfferFilm - 176.22;
            }
            listOfferFilms.style.transform = 'translateX(' + this.widthOfferFilm + 'px)';
        } else if (changed === -1) {
            if (this.widthOfferFilm >= 0) {
                this.widthOfferFilm = this.widthOfferFilm - widthHiddenOffer;
            } else {
                var prevOffer = Number.parseFloat(this.widthOfferFilm + 176.22).toFixed(2);
                this.widthOfferFilm = Number(prevOffer);
            }
            listOfferFilms.style.transform = 'translateX(' + this.widthOfferFilm + 'px)';
        }
    },

    changeOfferFilms: function (films) {
        var _this = this;
        // Next offer-film
        nextOfferFilms.onclick = function() {
            _this.offerFilms(1, films);
        }

        // Prev offer-film
        prevOfferFilms.onclick = function() {
            _this.offerFilms(-1, films);
        }
    },

    start: function () {
        var _this = this;
        // Lấy data từ Api
        dataListFilms(films => {
            // Hiển thị danh sách film
            _this.renderFilms(films);
            // _this.clickFilm();
        });

        dataListOfferFlims(offerFilms => {
            // Hiển thị danh sách offer-film
            _this.renderOfferFilms(offerFilms);
            // Xử lý Next và Prev cho offer-film
            _this.changeOfferFilms(offerFilms);
        });

        // Xử lý các sự kiện
        this.handleEvent();
        
    }
}

app.start();