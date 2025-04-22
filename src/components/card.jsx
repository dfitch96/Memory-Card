




export function Card({dataObj, onClick}){

  

    return (
      <div id={dataObj.name} className="card"> 
        <img src={dataObj.imgSrc} onClick={onClick}></img>
        <h2 className="card-header">{dataObj.name}</h2>
      </div>
    );

  


}