import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({})
    const [products, setProducts] = useState([])

    // Load products from backend (json-server) so newly added products are known
    useEffect(() => {
        fetch("http://localhost:3000/delivery")
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(() => setProducts([]))
    }, [])


    const addToCart = (itemId) => {
        const key = String(itemId)

        // If product is already present locally, increment immediately
        const existing = products.find(p => String(p.id) === key) || food_list.find(p => String(p._id) === key) || products.find(p => String(p._id) === key)
        if (existing) {
            setCartItems((prev) => {
                const prevCount = prev[key] || 0
                return { ...prev, [key]: prevCount + 1 }
            })
            return
        }

        // Otherwise fetch the product from backend, add to products, then increment cart
        fetch(`http://localhost:3000/products/${key}`)
            .then(res => {
                if (!res.ok) throw new Error('Not found')
                return res.json()
            })
            .then(prod => {
                setProducts(prev => {
                    // avoid duplicates
                    if (prev.find(p => String(p.id) === String(prod.id))) return prev
                    return [...prev, prod]
                })

                setCartItems((prev) => {
                    const prevCount = prev[key] || 0
                    return { ...prev, [key]: prevCount + 1 }
                })
            })
            .catch(() => {
                // If fetch fails, still increment using the key so item appears in cart (price will be 0)
                setCartItems((prev) => {
                    const prevCount = prev[key] || 0
                    return { ...prev, [key]: prevCount + 1 }
                })
            })
    }

    const removeFromCart = (itemId) => {
        setCartItems((prev) => {
            const key = String(itemId)
            const prevCount = prev[key] || 0
            const nextCount = prevCount - 1
            if (nextCount > 0) {
                return { ...prev, [key]: nextCount }
            }
            const { [key]: _, ...rest } = prev
            return rest
        })
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            const qty = cartItems[item]
            if (!qty || qty <= 0) continue

            // Try backend products first (json-server uses `id`), then fallback to local food_list (uses `_id`)
            const itemInfo = products.find(p => String(p.id) === String(item)) || food_list.find(p => String(p._id) === String(item)) || products.find(p => String(p._id) === String(item))

            const price = itemInfo && (itemInfo.price || itemInfo?.price === 0 ? itemInfo.price : 0)
            totalAmount += (price || 0) * qty
        }
        return totalAmount;
    }



    const contextValue = {
        food_list,
        products,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount
    }

    return (

        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;