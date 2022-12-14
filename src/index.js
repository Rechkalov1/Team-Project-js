import theMovieDbApi from "./js/fetchMovies";
import { insertCreatedObject} from './js/createMainMarkup'
import spinner from './js/preLoader'
import { getGenre, saveGenre } from './js/genre';

const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;
import { onCardFilmClick } from "./js/movieInfo";
import oneMovies from "./js/movieInfo";
import { scrollUp, smoothScrollToBottomPage } from './js/scroll-up';
import etsGenre from './js/etcGenre';
import openCardFilm from './js/openCardFilm'
import {refs, filterResults, onInputChange} from './js/keywordSearch';
import footer from './js/modalFooter';


import { createPagination } from "./js/createPagination"


import { createPagination, getCurrentPageLs, saveQueryTypeLs } from "./js/createPagination"


const movieDbApi = new theMovieDbApi();



async function movies() {

    spinner.startSpinner();
    try {
        const response = await movieDbApi.fetchMovies();
        const genreResponse = await movieDbApi.fetchGenres();
        const conditionKeyGenre = getGenre();

        if (conditionKeyGenre === undefined) {
            saveGenre(genreResponse);
        }

        insertCreatedObject(response.results)

        if (response.total_pages > 1) createPagination(response)
        spinner.removeSpinner();

    } catch (error) {
        console.log(error)
    };
};

movieDbApi.setPage(getCurrentPageLs())
saveQueryTypeLs('getMovies')
movies();

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));

async function onFormSubmit (e) {
    e.preventDefault();
    refs.falseresultMessage.classList.add('hide');
    const searchName = e.currentTarget.elements.search.value;
    try {
        movieDbApi.setPage(1)
        movieDbApi.setQuery(searchName)
        const searchMovie = await movieDbApi.fetchMovieName();
        
        filterResults(searchMovie);
        }
    catch (error) {
            console.log(error);
            }
} 
 
const cardOneFilm = document.querySelector('.gallery');
cardOneFilm.addEventListener('click', onCardFilmClick);

scrollUp.addEventListener('click', smoothScrollToBottomPage);

export {movies, movieDbApi}
