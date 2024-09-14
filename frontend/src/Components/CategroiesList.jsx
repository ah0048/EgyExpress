import { useEffect } from "react";
import { useState } from "react";
import Category from "./Category";
import "../css/CategroiesList.css";
function CategroiesList() {
  const [Categories, setCategories] = useState([]);
  const api_url = "https://fakestoreapi.com/products/categories";
  useEffect(()=>{
    fetch(api_url)
    .then((res)=>res.json()).then((data)=>setCategories(data));
  }, []);
  const handleClick = (category)=>{
    console.log(category);
  }
  return (
    <div className="categories">

        {Categories.map((category) => {
          return (
            <>
              <h1 className="big_title">{category}</h1>
              <hr />


                    <Category category={category} />
            </>
          );
        })}

    </div>
  );
}
export default CategroiesList;
