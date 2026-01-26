import React, { useEffect, useState } from 'react'
import './FoodDisplay.css'
import FoodItem from '../FoodItem/FoodItem'

const FoodDisplay = ({ category }) => {
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
                {products
                    .slice() 
                    .reverse() 
                    .filter(item => {
                        // 1. Əgər "All" seçilibsə hamısını göstər
                        if (category === "All") return true;
                        
                        // 2. Müqayisəni hər iki tərəfi kiçik hərfə çevirərək et (Hərf həssaslığını aradan qaldırır)
                        return item.category?.toLowerCase() === category?.toLowerCase();
                    })
                    .map((item) => (
                        <FoodItem 
                            key={item.id} 
                            id={item.id} 
                            name={item.name} 
                            description={item.description} 
                            price={item.price} 
                            image={item.image} 
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default FoodDisplay;