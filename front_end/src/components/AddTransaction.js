import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const AddTransaction = () => {
    const [formData, setFormData] = useState({
        amount: '',
        category: '',
        description: ''
    });
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // IT SHOULD fetch NOW
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/categories');
                if (!response.ok) {
                    throw new Error('Fuvkin dropdown broken again');
                }
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
  
        try {
            const response = await fetch('http://localhost:5000/api/add-transaction', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            console.log(data);

            // Optionally, reset the form after submission
            setFormData({
                amount: '',
                category: '',
                description: ''
            });

        } catch (error) {
            console.error("Error adding transaction:", error);
        }
    };

    return (
        <div>
            <h1>This is the transaction page!</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="number" 
                    name="amount" 
                    value={formData.amount} 
                    onChange={handleChange} 
                    placeholder="Amount" 
                />
{/*                 <select 
                    name="category" 
                    value={formData.category} 
                    onChange={handleChange}
                >
                    {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select> */}
                <input 
                    type="text" 
                    name="category" 
                    value={formData.category} 
                    onChange={handleChange} 
                    placeholder="Category" 
                />
                <input 
                    type="text" 
                    name="description" 
                    value={formData.description} 
                    onChange={handleChange} 
                    placeholder="Description" 
                />
                <button type="submit">Add Transaction</button>
            </form>
        </div>
    );
};

export default AddTransaction;
