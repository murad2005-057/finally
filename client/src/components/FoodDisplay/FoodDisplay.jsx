import React, { useContext, useEffect, useState } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../conText/StoreContext'
import FoodItem from '../FoodItem/FoodItem'

const FoodDisplay = ({ category }) => {

    const { food_list } = useContext(StoreContext)
    const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);


  

    return (
        <div className='food-display' id='food-display'>
            <h2>Top dishes near you</h2>
            <div className="food-display-list">
                {food_list.map((item, index) => {
                    // Filtrləmə məntiqi
                    if (category === "All" || category === item.category) {
                        return (
                            <FoodItem 
                                key={index} 
                                id={item._id} 
                                name={item.name} 
                                description={item.description} 
                                price={item.price} 
                                image={item.image} 
                            />
                        )
                    }
                    return null; // Əgər şərt ödənmirsə heç nə qaytarma
                })}
            </div>
        </div>


    //       <div  className='food-display' id='food-display'>
    //   {products.map(item => (
    //     <div className="food-display-list" key={item.id}>
    //       <h3>{item.name}</h3>
    //       {/* Şəkillər public/images-dədirsə belə işləyəcək */}
    //       <img src={item.image} alt={item.name}  />
    //     </div>
    //   ))}
    // </div>
    )
}

export default FoodDisplay;