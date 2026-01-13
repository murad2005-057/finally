import React, { useEffect, useState } from 'react'

const AdminProducts = () => {

    const [products, setProducts] = useState([])
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")

    const getProducts = () => {
        fetch("http://localhost:3000/products")
            .then(res => res.json())
            .then(data => setProducts(data))
    }

    useEffect(() => {
        getProducts()
    }, [])

    const addProduct = async () => {
        await fetch("http://localhost:3000/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, price })
        })

        setName("")
        setPrice("")
        getProducts()
    }

    const deleteProduct = async (id) => {
        await fetch(`http://localhost:3000/products/${id}`, {
            method: "DELETE"
        })

        getProducts()
    }

    return (
        <div>
            <h2>Products</h2>

            <input
                placeholder="Product name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <input
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />

            <button onClick={addProduct}>Add</button>

            <ul>
                {products.map(p => (
                    <li key={p.id}>
                        {p.name} - {p.price} AZN
                        <button onClick={() => deleteProduct(p.id)}>❌</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default AdminProducts
