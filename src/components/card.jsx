




export function Card({dataObj}){

  

    return (
      <div className="card">
        <img src={dataObj.imgSrc}></img>
        <h2>{dataObj.name}</h2>
      </div>
    );

  


}