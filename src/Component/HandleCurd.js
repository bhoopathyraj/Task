import React, { useState, useEffect } from 'react';

const CrudApp = () => {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');

  useEffect(() => {
    const storedItems = localStorage.getItem('items');
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  const handleAddItem = () => {
    if (name.trim() !== '' && email.trim() !== '' && department.trim() !== '') {
      const newItem = { 
        id: Date.now(), 
        name: name,
        email: email,
        department: department 
      };
      setItems([...items, newItem]);
      setName('');
      setEmail('');
      setDepartment('');
    }
  };

  const handleDeleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleEditItem = (id, newData) => {
    setItems(items.map(item => item.id === id ? { ...item, ...newData } : item));
  };

  return (
    <div>
      <h1>CRUD App</h1>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Department:</label>
        <input
          type="text"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />
      </div>
      <button onClick={handleAddItem}>Add</button>
      <ul>
        {items.map(item => (
          <li key={item.id}  className='li'>
            <div>
              <strong>Name:</strong> {item.name}<br/>
              <strong>Email:</strong> {item.email}<br/>
              <strong>Department:</strong> {item.department}
            </div>
            <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
            <button onClick={() => {
              const newName = prompt('Enter new name:', item.name);
              const newEmail = prompt('Enter new email:', item.email);
              const newDepartment = prompt('Enter new department:', item.department);
              if (newName !== null && newName.trim() !== '' && newEmail !== null && newEmail.trim() !== '' && newDepartment !== null && newDepartment.trim() !== '') {
                handleEditItem(item.id, { name: newName, email: newEmail, department: newDepartment });
              }
            }}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CrudApp;