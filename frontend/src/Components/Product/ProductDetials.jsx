import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Plus from "../../assests/plus.png";
import Minus from "../../assests/minus-sign.png";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../state/cartSlice";
import { useSelector } from "react-redux";
import "./ProdcutDetials.css";
import { fetchWithAuth } from "../../http";
import Review from "../Review/Review";
import ShowReview from "../Review/ShowReview";
function ProductDtials() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const params = useParams();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const api_url = "http://127.0.0.1:5000/api/product";
  const [product, setProduct] = useState({});
  const [counter, setCounter] = useState(1);
  const post_url = "http://localhost:5000/api/cart";
  useEffect(() => {
    fetch(`${api_url}/${params.productId}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, []);
  useEffect(() => {
    console.log("cart item changed");
    console.log(cartItems);
  }, [cartItems]);
 const handleinc = ()=>{
    setCounter(counter+1);
  };
  const handledec = ()=>{
    if(counter>1){
      setCounter(counter-1);
    };
  }

  const cartItem = {
    product_id: product.id,
    quantity: counter,
    price: product.price * counter,
  };

  const options = {
    method:"POST",
    headers:{
      "Content-Type":"application/json",
    },
    body:cartItem,
  }
  const handleAddToCart = ()=>{
    dispatch(addItemToCart(cartItem));
    fetchWithAuth(post_url, options).then((data)=>{
      console.log(data);
    }).catch((error)=>{
      console.error('error');
    });
    }
  const toggleModal = () => {
      setIsModalOpen(!isModalOpen);
    };
  console.log(product);
  console.log("-------");
  return (
    <div className="product_details">
      <h1>Prodcut details {product.title}</h1>
      <div className="product_info">
        <img src={product.image} alt={product.title} />
        <div>
          <p>Category: {product.category}</p>
          <p>{product.description}</p>
          <div className="counter">
            <button onClick={handledec}>
              <img src={Minus} alt="minus" />
            </button>
            <span>{counter}</span>
            <button onClick={handleinc}>
              <img src={Plus} alt="plus" />
            </button>
          </div>
          <button className="AddBtn" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
          <button className="AddBtn" onClick={toggleModal} >
           Add review
          </button>
          {isModalOpen && <Review onClose={toggleModal} isOpen={isModalOpen} productId={product.id}/>}
      </div>
      <ShowReview product={product.id}/>
    </div>
  );
}
export default ProductDtials;
