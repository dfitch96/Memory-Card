




export function Card({dataObj, onClick}){

  const name = dataObj.name[0].toUpperCase() + dataObj.name.slice(1, dataObj.name.length);
    return (
      <div id={dataObj.name} className="card" onClick={onClick}> 
        <img src={dataObj.imgSrc}></img>
        <h2 className="card-header">{name}</h2>
      </div>
    );

  


}