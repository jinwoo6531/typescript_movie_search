import React,{useReducer,useEffect} from 'react';
import './App.css';
import Header from "./Header";
import Movie from "./Movie";
import Search from "./Search";

const API_KEY = '4a3b711b'; // CHANGE ME TO YOUR API KEY
const MOVIE_API_URL = `https://www.omdbapi.com/?s=man&apikey=${API_KEY}`;

const initialState = {
  loading:true,
  movies:[],
  errorMessage:null
}


const reducer = (state:any,action:any) => {
  switch(action.type) {
    case "SEARCH_MOVIES_REQUEST":
      return {
        ...state,
        loading: true,
        errorMessage: null
      };
    case "SEARCH_MOVIES_SUCCESS":
      return {
        ...state,
        loading: false,
        movies: action.payload || []
      };
    case "SEARCH_MOVIES_FAILURE":
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
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch(MOVIE_API_URL)
    .then(response => response.json())
    .then(jsonResponse => {
      dispatch({
        type:"SEARCH_MOVIES_SUCCESS",
        payload: jsonResponse.Search
      });
    });
  }, []);

  const search = (searchValue:string) => {
    dispatch({
      type:"SEARCH_MOVIES_REQUEST"
    });

    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=${API_KEY}`)
    .then(response => response.json())
    .then(jsonResponse => {
      if(jsonResponse.Response === "True") {
        dispatch({
          type:"SEARCH_MOVIES_SUCCESS",
          payload: jsonResponse.Search
        });
      } else {
        dispatch({
          type:"SEARCH_MOVIES_FAILURE",
          error: jsonResponse.Error
        });
      }
    });
  };
  const {movies, errorMessage, loading} = state;
  return (
    <div className="App">
      <Header text="HOOKED"/>
      <Search search={search}/>
      
    </div>
  );
}

export default App;
