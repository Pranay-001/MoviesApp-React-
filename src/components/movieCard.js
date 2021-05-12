import React from 'react';
import {addFavourite,removeFavourite,addMovies,removeMovie} from '../actions'

class movieCard extends React.Component {
    handelAddFavourate=()=>{
        const {movie}=this.props;
        this.props.dispatch(addFavourite(movie))
    }
    handelRemoveFavourate=()=>{
        const {movie}=this.props;
        this.props.dispatch(removeFavourite(movie))
    }
    handelAddMovie=(data)=>{
        this.props.dispatch(addMovies(data));
    }
    handelRemoveMovie=(data)=>{
        this.props.dispatch(removeMovie(data));
    }
    isAdded=(movie)=>{
        const {moviesData}=this.props;
        const {movies}=moviesData
        return movies.indexOf(movie)!==-1;
    }
    render(){
        const movie=this.props.movie
        const title=movie.Title,
        overview=movie.Plot,
        year=movie.Year || '',
        type=movie.Type || 'movie',
        genres=movie.genres || [],
        isFavourite=this.props.isFavourite,
        gen=Object.values(genres).join(",");
        let poster =movie.Poster;
        if(poster==='N/A') poster= 'https://blog.sellfy.com/wp-content/uploads/2014/12/night-lattern-404.jpg'
        
        return (
            <div className="card">
                <div className="left">
                    <img src={poster} alt={title}/>
                </div>
                <div className="right">
                    <div className="head">
                    <h1>{title}</h1>
                    <h4>{overview}</h4>
                    <p>{gen}</p>
                    <h4>Type&nbsp;:&nbsp;{type}</h4>
                    <h4>Year&nbsp;:&nbsp;{year}</h4>
                    </div>
                    <div className="bottom">
                    {   isFavourite
                        ?<button style={{background:'red'}} onClick={this.handelRemoveFavourate}>UnFavorite</button>
                        :<button onClick={this.handelAddFavourate}>Favorite</button>
                    }
                    {
                        this.props.showFavourite===1
                        ?(this.isAdded(movie)
                            ?<button style={{background:'orange',paddingRight:20,paddingLeft:20}} onClick={()=>this.handelRemoveMovie(movie)}>remove</button>
                            :<button style={{background:'lightgreen',paddingRight:20,paddingLeft:20}} onClick={()=>this.handelAddMovie(movie)}>Add</button>    
                        )
                        :(this.props.showFavourite===2)
                        ?<button style={{background:'orange',paddingRight:20,paddingLeft:20}} onClick={()=>this.handelRemoveMovie(movie)}>remove</button> 
                        :null
                    }   
                    </div>              
                    
                </div>
            </div>
        );
    }
}   
export default movieCard; 