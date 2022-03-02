import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import spinner from './Ajax-loader.gif'
import Spinner from './Spinner';
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

  if(!res){
    alert("your are offlibe failed to load razorpay")
  return;
  }

  const options = {
    key: "rzp_test_mNj333YrVgR9NC",
    currency: "INR",
    amount:amount *100,
    name: "mohd abbas",
    description: "THANKS FOR PURCHASING",

    handler: function (response) {
      alert(response.razorpay_payment_id)
      alert("payment successful")
    },
    prefill:{
      name: "ABBAS MURUDKAR"
    }
  };
  const paymentOnject = new window.Razorpay(options)
  paymentOnject.open()
}
  return (
    <Cover>
      <h1>PAYMENT GATEWAY</h1>
      {/* {data.loading && <Spinner/>} */}
      {/* {loading?data:<Spinner/>} */}
      {/* <Spinner/> */}
      {!loading && <Spinner/>}
      {data.map((r, id) => (

        <div key={id} className="cart">
          <p>{r.idCategory}</p>
          <div className='info'>
            <img src={r.strCategoryThumb} alt="loading" />
            <div className='vl'></div>
        
            <p><h3>{r.strCategory}</h3><br/>{r.strCategoryDescription ? r.strCategoryDescription.slice(0, 350) : ""}..<br/><br/><span style={{color:"green", fontWeight:"bolder"}}>{formatter.format(price)}</span></p> 
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
h3{
  display: inline-block;
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
  /* border: 2px solid red; */
  img{
    object-fit: center cover;
    height: 230px;
    transition: 0.3s all ease-in-out;
  }
}
.cart{
  display: flex;
  /* border: 2px solid ; */
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
