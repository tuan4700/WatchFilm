// "use strict";
import { dataListFilms } from "./data.js";
import handleAccentedString from "./accented_string.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const inputSearch = $('.heading__search');
const iconSearch = $('.heading__search-icon');

const app = {
    handle: function() {
        inputSearch.onkeypress = function(e) {
            if(e.keyCode === 32) {
                var valueSearch = inputSearch.value.toLowerCase();
                dataListFilms(films => {
                    // Get listFilm thông qua keySearch
                    var listNameFilm = films.reduce((names, film) => {
                        if(film.nameVi.toLowerCase().indexOf(valueSearch) !== -1 
                            || film.nameEng.toLowerCase().indexOf(valueSearch) !== -1) {
                            if(film.nameVi.toLowerCase().indexOf(valueSearch) !== -1) {
                                return names.concat(film.nameVi);
                            } else if (film.nameEng.toLowerCase().indexOf(valueSearch) !== -1) {
                                return names.concat(film.nameEng);
                            } else {
                                return names.concat(film.nameVi);
                            }
                        }
                        return names;
                    }, [])

                    // Render listFilm đã lấy
                    $('.heading__search-list').innerHTML = listNameFilm.map(nameFilm => {
                        return `
                        <li class="heading__search-item">
                            <i class="heading__search-item__history ti-search"></i>
                            ${nameFilm}
                        </li>
                        `;
                    }).join('');
                });
            }

            if(e.keyCode === 13) {
                window.location.href = 
                    'http://127.0.0.1:5500/assets/html/filter_film.html?search=' + handleAccentedString(inputSearch.value);
            } else {
                return;
            }
        };
    
        iconSearch.onclick = function() {
            window.location.href = 
                'http://127.0.0.1:5500/assets/html/filter_film.html?search=' + handleAccentedString(inputSearch.value);
        };

        inputSearch.oninput = e => {
            if(e.target.value === "") {
                this.defaultListFilmSearch();
            }
            return;
        }

        inputSearch.onfocus = () => {
            this.defaultListFilmSearch();
        }
    },

    defaultListFilmSearch: function() {
        dataListFilms(films => {
            $('.heading__search-list').innerHTML = films.map((film, index) => {
                if(index < 20) {
                    return `
                    <li class="heading__search-item">
                        <i class="heading__search-item__history ti-search"></i>
                        ${film.nameVi}
                    </li>
                    `;
                }
                return;
            }).join('')
        })

    },

    start: function() {
        this.handle();
    }
};

app.start();