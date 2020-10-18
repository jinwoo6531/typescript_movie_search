import React,{useEffect} from 'react';
import { API_KEY } from "./config";
import Header from "./Header";
import Movie from "./Movie";
import Search from "./Search";
import './App.css';

const MOVIE_API_URL = `https://www.omdbapi.com/?s=man&apikey=${API_KEY}`;

const initialState = {
  loading:true,
  movies:[],
  errorMessage:null
}

interface ReducerState {
  loading:boolean,
  movies:[],
  errorMessage:null
}

const SEARCH_MOVIES_REQUEST = "search_movies_request";
const SEARCH_MOVIES_SUCCESS = "search_movies_success";
const SEARCH_MOVIES_FAILURE = "search_movies_failure";


const reducer = (state:ReducerState,action:any) => {
  
  switch(action.type) {
    case SEARCH_MOVIES_REQUEST:
      return {
        ...state,
        loading: true,
        errorMessage: null
      };
    case SEARCH_MOVIES_SUCCESS:
      return {
        ...state,
        loading: false,
        movies: action.payload || []
      };
    case SEARCH_MOVIES_FAILURE:
      return {
        ...state,
        loading:false,
        errorMessage: action.error
      };
      default:
        return state;
    
  }
}
function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  useEffect(() => {
    fetch(MOVIE_API_URL)
    .then(response => response.json())
    .then(jsonResponse => {
      dispatch({
        type:SEARCH_MOVIES_SUCCESS,
        payload: jsonResponse.Search
      });
    });
  }, []);

  const search = (searchValue:string) => {
    dispatch({
      type:SEARCH_MOVIES_REQUEST
    });

    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=${API_KEY}`)
    .then(response => response.json())
    .then(jsonResponse => {    
            
      if(jsonResponse.Response === "True") {
        dispatch({
          type:SEARCH_MOVIES_SUCCESS,
          payload: jsonResponse.Search
        });
      } else {
        dispatch({
          type:SEARCH_MOVIES_FAILURE,
          error: jsonResponse.Error
        });
      }
    });
  };
  const {movies, errorMessage, loading} = state;
  return (
    <div className="App">
      <Header text="영화 검색"/>
      <Search search={search}/>
      <p className="App-intro">Sharing a few of our favourite movies</p>
      <div className="movies">
        {loading && !errorMessage ? (
          <span>loading... </span>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          movies.map((movie:any,index:number) => (
            <Movie key={`${index}-${movie.Title}`} movie={movie}/>
          ))
        )}
      </div>
      
    </div>
  );
}

export default App;
