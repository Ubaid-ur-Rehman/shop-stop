import './HomePage.css'
import Header from '../../Components/Header';
// import {products} from '../../Starter/data/products.js';
import Products from './Products';
import { useEffect, useState } from 'react';


export default function HomePage({cart , fetchCartItems}:any) {
    const [products,setProducts] = useState([]);
    useEffect(() => {
        fetch('http://localhost:3000/api/products')
        .then(response => response.json())
        .then(data => {
            // Update the products state with the fetched data
            setProducts(data);
        });;
       
        
    },[]);
    return (
        <>
        <Header cart= {cart} />  
    <div className="home-page">
      <div className="products-grid">
        {products.map((product:any) => {
            return (
                <Products product={product} fetchCartItems={fetchCartItems} />
            )
        })}
      </div>
    </div>
    </>
    )
};