import React, { useEffect, useState } from 'react'

const AdminDashboard = () => {

    const [users, setUsers] = useState([])
    const [products, setProducts] = useState([])

    useEffect(() => {
        fetch("http://localhost:3000/users")
            .then(res => res.json())
            .then(data => setUsers(data))

        fetch("http://localhost:3000/products")
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])

    return (
        <div>
            <h2>Admin Dashboard</h2>
            <p>Users: {users.length}</p>
            <p>Products: {products.length}</p>
        </div>
    )
}

export default AdminDashboard
