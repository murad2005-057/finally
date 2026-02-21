import React, { useEffect, useState, useContext } from 'react'
import './FoodDisplay.css'
import FoodItem from '../FoodItem/FoodItem'
import { LanguageContext } from '../../i18n/LanguageProvider'
import API_URL from '../../config/api'

const FoodDisplay = ({ category }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch(`${API_URL}/products`)
            .then(res => res.json())
            .then(data => setProducts(data));
    }, []);

    const { t } = useContext(LanguageContext)

    return (
        <div className='food-display' id='food-display'>
            <h2>{t("foodDisplay.title")}</h2>
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
                    .map((item) => {
                        const nameKey = `product.${item.id}.name`;
                        const descKey = `product.${item.id}.desc`;

                        return (
                            <FoodItem
                                key={item.id}
                                id={item.id}
                                name={t(nameKey) !== nameKey ? nameKey : item.name}
                                description={t(descKey) !== descKey ? descKey : item.description}
                                price={item.price}
                                image={item.image}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default FoodDisplay;