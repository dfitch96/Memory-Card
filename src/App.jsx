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

  useEffect(() => {
    let ignore = false;

    async function fetchPokemon(name){
      try {
        const response = await fetch(`${URL}${name}`, {mode: 'cors'});
        if(!response.ok){
          throw new Error("Network request unsuccessful");
        }
  
        const json = await response.json();
        return json;
      
      } catch(e){
        console.log(e);
        return null;
      }
      
    }

    async function fetchAll(){
      const result = await Promise.all(pokemons.map(pokemon => fetchPokemon(pokemon)));
      return result
        .filter(result => result !== null)
        .map(result => ({imgSrc: result.sprites.front_default, name: result.name}));
    }
    
    async function loadData(){
      const fetchedData = await fetchAll();
      if(!ignore){
        setData(fetchedData);
        setIsLoading(false);
      }
    }

    loadData();

    return () => ignore = true;
  }, []);

  function handleCardOnClick(){
    const newData = [...data];
    
    for(let i = 0; i < newData.length; i++){
      let randNum = Math.floor(Math.random() * newData.length);
      const temp = newData[i];
      newData[i] = newData[randNum];
      newData[randNum] = temp;
    }

    setData(newData);

  }


  return (
    <>
      <Header />
      <Directions />
      <Score curScore={0} highScore={0} />
      <div id="card-grid">
        {!isLoading && data.map(dataObj => <Card key={dataObj.name} dataObj={dataObj} onClick={handleCardOnClick}/>)}
      </div>
      
    </>
  )
}

export default App
