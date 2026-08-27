import { useState } from "react";
const CrudPage = () => {
    const [users, setUsers] = useState([
        { id: 1, name: 'Alex', email: 'alex@test.com' },
        { id: 2, name: 'Sam', email: 'sam@test.com' }
    ]);

    const [formData, setFormData] = useState({name: '', email: ''})

    function handleSubmit(e) {
        e.preventDefault();
        const newUser = {
            id: Date.now(),
            ...formData
        }

        setUsers(prev => [...prev, newUser])
        setFormData({name: '', email: ''})
    }
    return ( 
        <div>

        </div>
     );
}
 
export default CrudPage;