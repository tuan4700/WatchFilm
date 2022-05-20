const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

export function HandleNavBar() {
    const title = $$('.heading__nav-bar__item');
    
    title.forEach(item => {
        item.onclick = (e) => {
            switch (e.target.innerText) {
                case "PHIM BỘ":
                    e.target.href = 'http://127.0.0.1:5500/assets/html/filter_film.html?type=bo';
                    break;
                case "PHIM LẺ":
                    e.target.href = 'http://127.0.0.1:5500/assets/html/filter_film.html?type=le';
                    break;
                case "PHIM VIETSUB":
                    e.target.href = 'http://127.0.0.1:5500/assets/html/filter_film.html?type=vietsub';
                    break;
                case "PHIM THUYẾT MINH":
                    e.target.href = 'http://127.0.0.1:5500/assets/html/filter_film.html?type=thuyetminh';
                    break;
                default:
                    break;
            }
        }
    })
}

export function CheckKeyParams(keySearch) {
    // Rule on keySearch: search -> type -> keyID
    const keyParams = {
        search: "",
        type: "",
        key: ""
    }

    const checkSearch = keySearch.indexOf('search');
    const checkType = keySearch.indexOf('type');
    const checkKeyFilm = keySearch.indexOf('keyID');

    // -----------checkSearch-------------
    if(checkSearch !== -1 && checkType !== -1) {
        keyParams.search = keySearch.slice(checkSearch + 7, checkType - 1).trim();
    }
    if(checkSearch !== -1 && checkType === -1 && checkKeyFilm !== -1) {
        keyParams.search = keySearch.slice(checkSearch + 7, checkKeyFilm - 1).trim();
    }
    if(checkSearch !== -1 && checkType === -1 && checkKeyFilm === -1) {
        keyParams.search = keySearch.slice(checkSearch + 7).trim();
    }

    // -----------checkType---------------
    if(checkType !== -1 && checkKeyFilm !== -1) {
        keyParams.type = keySearch.slice(checkType + 5, checkKeyFilm - 1);
    }
    if((checkType !== -1 && checkKeyFilm === -1) || (checkSearch === -1 && checkType !== -1 && checkKeyFilm === -1)) {
        keyParams.type = keySearch.slice(checkType + 5);
    }
    
    // -----------checkKeyFilm------------
    if(checkKeyFilm !== -1) {
        keyParams.key = keySearch.slice(checkKeyFilm + 6);
    }

    return {
        search: keyParams.search,
        type: keyParams.type,
        key: keyParams.key
    }
}