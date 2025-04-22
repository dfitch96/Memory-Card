




export function Card({dataObj}){

  

    return (
      <div className="card">
        <img src={dataObj.imgSrc}></img>
        <h2 className="card-header">{dataObj.name}</h2>
      </div>
    );

  


}