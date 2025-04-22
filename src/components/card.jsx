




export function Card({dataObj, onClick}){

  

    return (
      <div id={dataObj.name} className="card" onClick={onClick}> 
        <img src={dataObj.imgSrc}></img>
        <h2 className="card-header">{dataObj.name}</h2>
      </div>
    );

  


}