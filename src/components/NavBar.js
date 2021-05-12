import React from 'react'
import {handleMovieSearch,showFavourite} from '../actions'
import {connect} from 'react-redux'

class NavBar extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            searchText:''
        }
    }
    handleSearchChange=(e)=>{
        this.setState({
            searchText:e.target.value
        })
    }
    handelShowSearch=(val)=>{
        // console.log('val ',val);
        this.props.dispatch(showFavourite(val))
      }
    handleSearchResults=()=>{
        const {searchText}= this.state
        this.props.dispatch(handleMovieSearch(searchText));
        this.handelShowSearch(1)
        document.getElementById("src").value='';
    }
    render() {
        // console.log(this.state.searchText)
        return(
            <div class="navbar">
                <div class="navbar-input">
                    <input onChange={this.handleSearchChange} id="src" style={{fontSize:30}} type="text" placeholder="Enter movie name">

                    </input>
                </div>
                <div className="navbar-search">
                    <button onClick={this.handleSearchResults} type="button">Search</button>
                </div>

            </div>
        )
    }
}
function mapStateToProps(state){
    return {};
}
const connectedNavBarComponent = connect(mapStateToProps)(NavBar);
export default connectedNavBarComponent;