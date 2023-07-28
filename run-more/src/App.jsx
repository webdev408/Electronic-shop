import { useState } from 'react'

import './index.css'

function App() {
  const products = [
    {
      id: 1,
      name: 'Macbook Pro',
      image: 'https://picsum.photos/id/2/125',
      price: 1399
    },
    {
      id: 2,
      name: 'iphone 13',
      image: 'https://images.pexels.com/photos/14666017/pexels-photo-14666017.jpeg?auto=compress&cs=tinysrgb&w=125',
      price: 1199
    },
    {
      id: 3,
      name: 'Samsung LC27',
      image: 'https://m.media-amazon.com/images/I/7105BA4AaoL._AC_UL400_.jpg',
      price: 218
    }
  ]
  return (
    <div className="container">
      <ProductList products={products} />
    </div>
    )
  }
  export default App;

  const useCart = () =>{
    const [cartItems, setCartItems] = useState([])

  const addToCart  = (item) => {
    const areItemsInCart = cartItems.find(itemInCart => itemInCart.id === item.id)
    if (areItemsInCart) {
          setCartItems(cartItems.map(itemInCart => itemInCart.id === item.id? {...itemInCart, quantity: itemInCart.quantity + 1 } : itemInCart))
        } else {
          setCartItems([...cartItems, {...item, quantity:1}])
    }
  }

  const removeFromCart = (item) => {
    const areItemsInCart = cartItems.find(itemInCart => itemInCart.id === item.id)
    if (areItemsInCart){
      if (areItemsInCart.quantity > 1){
        setCartItems(cartItems.map(itemInCart => itemInCart.id === item.id? {...itemInCart, quantity: itemInCart.quantity - 1 } : itemInCart))
      }else{
        setCartItems(cartItems.filter(itemInCart => itemInCart.id!== item.id))
      }
    }
  }
  return [cartItems, addToCart, removeFromCart]
}

  const ProductList = ({products}) => {
    const [cartItems, addToCart, removeFromCart] = useCart();

    const getTotal = () => {
    const itemPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const tax = itemPrice * 0.13;
    const subTotal = itemPrice + tax;
    return `$${subTotal.toFixed(2)}`
  }

  return (
    <>
        <h2 className="my-4">Products</h2>
      <ul className='product-list'>
      {products.map(product => (
        <div key={product.id} className="d-flex justify-content-between 
        align-items-center m-3">
          <h4>{product.name}</h4>
          <img src={product.image} alt={product.name} />
          <p>Price: ${product.price}</p>
          <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      ))}
    </ul>
        <h2 className='my-4'>Items in Cart</h2>
        <ul className="cart-list">
        {cartItems.length >= 0 ? (
          cartItems.map(item => (
            <div key={item.id} className="d-flex justify-content-between 
            align-items-center m-4">
            <h4>{item.name}</h4>
            <p>{item.quantity}</p>
              <button onClick={()=>removeFromCart(item)}>RemoveFromCart</button>
            </div>
            ))
        ):(
          <h4>Your Cart is Empty</h4>
          )}
        </ul>
        <h2>Total: {getTotal()}</h2>
    </>
  )
}


