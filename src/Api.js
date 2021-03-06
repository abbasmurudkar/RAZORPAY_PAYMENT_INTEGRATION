import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import Spinner from './Spinner';
import image from "./logo.png"
function Api() {
  const [data, setcategories] = useState([]);
  const [loading, setloading] = useState(true)

  const price = 500
  var formatter = new Intl.NumberFormat("en-US",{
    style: "currency",
    currency:"INR"
  })
  const Onsearch = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`).then((response) => response.json()).then((result) => {
      let data = result.categories //SUBPART OF API
      // console.log(data)
      setcategories(data)
      setloading(true)
      // console.log(result) //FULLPART OF API
    })}
  useEffect(() => {
    Onsearch()
    setloading(false)
  }, [])

  const loadScript = (src) => {
    return new Promise((resovle) => {
      const script = document.createElement("script");
      script.src = src;

      script.onload = () => {
        resovle(true);
      };

      script.onerror = () => {
        resovle(false);
      };

      document.body.appendChild(script);
    });
  }
  const displayrazorpay = async (amount) =>{
  const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')
console.log(res)
  if(!res){
    alert("your are offlibe failed to load razorpay")
  return;
  }
  const options = {
    key: "rzp_test_mNj333YrVgR9NC",
    key_secret: "cYdkhX47xesmmCeGGpKOzyrG",
    currency: "INR",
    amount:amount *100,
    name: "BROOZ MEALS",
    description: "THANKS FOR PURCHASING",
    image :`${image}`,
    handler: function (response) {
      alert(response.razorpay_payment_id)
      alert(response.razorpay_order_id)
      alert("payment successful")
    },
    prefill:{
      name: "ABBAS MURUDKAR"
    },
    notes: {
      address: "Razorpay Corporate Office"
  },
    theme: {
      color: "#3399cc",
      // backdrop_color:"#4455cc"
  }
  };
  const paymentOnject = new window.Razorpay(options)
  paymentOnject.open()
}
  return (
    <Cover>
      <h1>PAYMENT GATEWAY</h1>
      {!loading && <Spinner/>}
      {data.map((r, id) => (
        <div key={id} className="cart">
          <p>{r.idCategory}</p>
          <div className='info'>
            <img src={r.strCategoryThumb} alt="loading" />
            <div className='vl'></div>
            <p><span>{r.strCategory}</span><br/>{r.strCategoryDescription ? r.strCategoryDescription.slice(0, 350) : ""}..<br/><br/><span style={{color:"green", fontWeight:"bolder"}}>{formatter.format(price)}</span></p> 
            <button onClick={()=> displayrazorpay(price)}>Order Now</button>
          </div>
        </div>
      ))}

    </Cover>
  )
}

export default Api
const Cover = styled.div`
h1{
  display: block;
  text-align: center;
  font-size: 30px;
}
span{
  display: inline-block;
  font-weight: bolder;
  font-size: 25px;
}
.vl{
  border-left: 2px solid grey;
  position: relative;
  border-radius: 15px;
  left: 20px;
  height: 70%;
  top: 20px;
}
p{
  padding: 30px;
  padding-top: 10px ;
  font-size:18px;
}
.info{
  display: flex;
  justify-content: space-between;
  img{
    object-fit: center cover;
    height: 230px;
    transition: 0.3s all ease-in-out;
  }
}
.cart{
  display: flex;
  margin: 15px;
  box-shadow: 5px 5px 15px grey;
  border: 2px solid grey;
  border-radius: 15px;
  height: 250px;
  cursor: pointer;
  :hover img{
    transform: scale(0.9);
  }
  >p{
    display: flex;
    justify-content:center ;
    align-items:center ;
  }
  button{
    display:block ;
    background-color: yellow;
    border-radius: 15px;
    cursor: pointer;
    width: 60px;
  }
}
`;
