import './styles/App.css'
import { Header } from './components/header'
import { Directions } from './components/directions'
import {Card} from './components/card'
import { useEffect, useState } from 'react'
import { Score } from './components/score'

const URL = 'https://pokeapi.co/api/v2/pokemon/';

const pokemons = [
  "pikachu",
  "charizard",
  "eevee",
  "lucario",
  "mewtwo",
  "greninja",
  "gengar",
  "snorlax",
  "gardevoir",
  "umbreon",
  "sylveon",
  "arcanine",
]


function App() {

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [curScore, setCurScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [clicked, setClicked] = useState([]);


  useEffect(() => {
    let ignore = false;

    async function fetchPokemon(name){
      const response = await fetch(`${URL}${name}`, {mode: 'cors'});
      if(!response.ok){
        throw new Error(`Network request for ${name} unsuccessful`);
      }
      const json = await response.json();
      return json;
    }

    async function fetchAll(){
      const result = await Promise.all(pokemons.map(pokemon => fetchPokemon(pokemon)));
      return result
        .map(result => ({imgSrc: result.sprites.front_default, name: result.name}));
    }
    
    async function loadData(){
      try{
        const fetchedData = await fetchAll();
        if(!ignore){
          setData(fetchedData);
          setIsLoading(false);
        }
      } catch(e){
        console.log(e);
      }
    }

    loadData();

    return () => ignore = true;
  }, []);


  function updateGameState(cardName){
    const newClicked = [...clicked];
    if (!newClicked.includes(cardName)){
      newClicked.push(cardName);
      setClicked(newClicked);
      setCurScore(curScore + 1);
      if(curScore + 1 > highScore){
        setHighScore(curScore + 1);
      }
    } else {
      setClicked([]);
      setCurScore(0);
    }
  }

  function shuffleCards(){
    const newData = [...data];
    for(let i = 0; i < newData.length; i++){
      let randNum = Math.floor(Math.random() * newData.length);
      const temp = newData[i];
      newData[i] = newData[randNum];
      newData[randNum] = temp;
    }
    setData(newData);
  }

  function handleCardOnClick(e){
    updateGameState(e.currentTarget.id);
    shuffleCards();
  }


  return (
    <>
      <Header />
      <Directions />
      <Score curScore={curScore} highScore={highScore} />
      <div id="card-grid">
        {!isLoading && data.map(dataObj => <Card key={dataObj.name} dataObj={dataObj} onClick={handleCardOnClick}/>)}
      </div>
      
    </>
  )
}

export default App
