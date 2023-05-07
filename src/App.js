import React, {useEffect, useState} from "react";
import Product from "./components/Product";

function App () {

  const productsList = [
  {name: 'Iphone', price: 800, id: 1},
  {name: 'Watch', price: 100, id: 2},
  ];
  const [nameDirty , setNameDirty]= useState(false)
  const [priceDirty , setPriceDirty]= useState(false)
  const[nameError , setNameError]= useState('Поле не може бути пустим')
  const[priceError , setPriceError]= useState('Поле не може бути пустим')
  const [products, setProducts] = useState(productsList)
  const [newProducts, setNewProducts] = useState({name: '', price: '', id: 3})
  const [formValid, setFormValid] = useState(false)

  useEffect(()=> {
    if (nameError || priceError){
      setFormValid(false)
    }else {
      setFormValid(true)
    }
  },[nameError,priceError]
  )
  
  const blurHandler = (e) =>{
    switch (e.target.name) {
      case 'name': 
       return setNameDirty(true)
        case 'price':
      return setPriceDirty  (true)
        
    }
  }
  const changeName = (e)=>{
   setNewProducts((prev)=>({...prev, name: e.target.value}))
   if (e.target.value.length <= 1 ) {
    setNameError ('Name length < 1')
   }
   else {
    setNameError('')
   }
  }

  const changePrice = (e)=>{
    setNewProducts((prev)=>({...prev, price: e.target.value}))
    if (e.target.value <= 0 ) {
      setPriceError ('Price = 0')
     }
     else {
      setPriceError('')
     }
  }

  const addProducts = () => {
    let key = Math.random();
    setNewProducts((prev)=>({...prev, id: key}))
    setProducts((prev) => ([...prev, newProducts]))
    setNewProducts({name:'', price:''})
  }

  const removeProduct = (id) => {
    const newList =  products.filter(product => product.id !== id);
    setProducts(newList);
  }
 

return (
<div className="wrapper">
  <div className="add">
    <label>Product name</label>
    {(nameDirty && nameError) && <div style={{color:'brown', fontWeight:'600'}}>{nameError}</div>}
    <input onBlur={e=> blurHandler(e)} value={newProducts.name} onInput={changeName} name="name" type="text" />
    
    <label>Product price</label>
    {(priceDirty && priceError) && <div style={{color:'brown', fontWeight:'600'}}>{priceError}</div>}
    <input onBlur={e => blurHandler(e)} value={newProducts.price} name="price" onInput={changePrice} type="number" />
    <button disabled = {!formValid} onClick={addProducts} type="button">Add</button>
  </div>
  <div className="list">
    {products.map(product => <Product onRemove={removeProduct} key={product.id} id={product.id} name={product.name} price={`${product.price} $`} />)}
  </div>
</div> 
);
}

export default App;