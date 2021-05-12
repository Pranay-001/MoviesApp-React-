import {ADD_MOVIES,ADD_FAVOURITE,REMOVE_FAVOURITE,SHOW_FAVOURITE,SEARCH_MOVIE,REMOVE_MOVIE} from '../actions'
import {combineReducers} from 'redux'

const initialMoviesState={
    movies:[],
    favourites:[],  
    showFavourite:  2
}
const initialSearchState={
    results:[]   
}
const initialRootState={
    movieData:initialMoviesState,
    search:initialSearchState
}
export function movies(state=initialMoviesState,action){
    switch(action.type){
        case ADD_MOVIES:
            return {
                ...state,
                movies:[action.movies,...state.movies]
            }
        case REMOVE_MOVIE:
            const afterRemoval=state.movies.filter(movie=>movie.Title!==action.movie.Title)
            return {
                ...state,
                movies:afterRemoval
            }
        case ADD_FAVOURITE:
            return {
                ...state,
                favourites:[action.movie,...state.favourites]
            }
        case REMOVE_FAVOURITE:
            const filteredArray=state.favourites.filter(
                movie=>movie.Title!==action.movie.Title
            );
            return {
                ...state,
                favourites:filteredArray
            }
        case SHOW_FAVOURITE:
            return {
                ...state,
                showFavourite:action.showFavourite
            }
        default:
            return state;
    }
} 
export function search(state=initialSearchState,action){
    // console.log('action',state,action.movie)
    switch(action.type){
        case SEARCH_MOVIE:
            return {
                ...state,
                results:[action.movie]
            }
        default:
            return state
    }
}
// export default function rootReducer(state=initialRootState,action){
//     return {
//         moviesData:movies(state.moviesData,action),
//         search:search(state.search,action)
//     }
// }
export default combineReducers({
    moviesData:movies,
    search
});
