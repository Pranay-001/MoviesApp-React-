import { data } from "../movies";
import MovieCard from "./movieCard";
import React from "react";
import NavBar from "./NavBar";
import { addMovies, showFavourite } from "../actions";
import { connect } from "react-redux";

class App extends React.Component {
  componentDidMount() {
    // const {store}=this.props;
    // store.subscribe(()=>{
    //   // console.log('update');
    //   this.forceUpdate();
    // });
    // store.dispatch(addMovies({}));
    // console.log('STATE',this.props.store.getState());
  }
  componentDidUpdate() {
    // const {store}=this.props;
    // store.subscribe(()=>{
    // this.forceUpdate();
    // });
  }
  isFavorite(movie) {
    // console.log('getsate' , this.props.store.getState());
    const { moviesData } = this.props;
    const { favourites } = moviesData;
    return favourites.indexOf(movie) !== -1;
  }
  handelShowFavourate = (val) => {
    this.props.dispatch(showFavourite(val));
  };
  render() {
    // console.log('jhgf')
    // console.log('sfasas',this.props)
    const { moviesData, search } = this.props;
    const { movies, favourites, showFavourite } = moviesData;
    const { results } = search || [];
    const res = results["0"] || [];
    let movieList = res["Search"] || [];
    // console.log('res',movieList)

    if (showFavourite === 2) movieList = movies;
    else if (showFavourite === 3) movieList = favourites;
    // movieList=[]
    return (
      <div style={{ color: "black" }}>
        <NavBar />
        <div className="tabs">
          <div
            className={`tab1 ${showFavourite !== 2 ? "" : "active"}`}
            onClick={() => this.handelShowFavourate(2)}
          >
            Movies
          </div>
          <div>|</div>
          <div
            className={`tab2 ${showFavourite === 3 ? "active" : ""}`}
            onClick={() => this.handelShowFavourate(3)}
          >
            Favorites
          </div>
        </div>
        {movieList.map((movie, index) => {
          // console.log('ewew',movie)
          // return
          return (
            <MovieCard
              movie={movie}
              moviesData={this.props.moviesData}
              dispatch={this.props.dispatch}
              isFavourite={this.isFavorite(movie)}
              showFavourite={showFavourite}
              key={`movies-${index}`}
            />
          );
        })}
        {movieList.length === 0 ? (
          <div className="noData">No Data..!</div>
        ) : null}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    moviesData: state.moviesData,
    search: state.search,
  };
}
const connectedAppComponent = connect(mapStateToProps)(App);
export default connectedAppComponent;
