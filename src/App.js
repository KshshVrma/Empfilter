import React, { useEffect, useState } from 'react';

function App() {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/dixitsoham7/dixitsoham7.github.io/main/index.json')
      .then((response) => response.json())
      .then((data) => {
        setEmployees(data.employees);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    if (!filter) {
      setFilteredEmployees(employees);
    } else {
      const filtered = employees.filter((employee) => {
        const name = employee.name ? employee.name.toLowerCase() : '';
        const designation = employee.designation ? employee.designation.toLowerCase() : '';
        const skills = employee.skills ? employee.skills.map((skill) => skill.toLowerCase()) : [];

        return (
          name.includes(filter.toLowerCase()) ||
          designation.includes(filter.toLowerCase()) ||
          skills.some((skill) => skill.includes(filter.toLowerCase()))
        );
      });
      setFilteredEmployees(filtered);
    }
  }, [employees, filter]);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };
  
  return (
    <div style={{
      color: "white",
      backgroundColor: "DodgerBlue",
      padding: "10px",
      fontFamily: "Arial",
       textAlign: 'center', 
       border: '4px solid black', 
       borderRadius: '5px',
       boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)',
      //  backgroundImage: 'url("https://pixabay.com/illustrations/pattern-abstract-pastels-nude-color-7077094/")',
      //  backgroundSize: 'cover',
      //  backgroundPosition: 'center',
      //  backgroundRepeat: 'no-repeat'
     
    }}>
      <h1>Employee Filter</h1>
      <input style={{border: '3 px dotted black'}} type="text" value={filter} onChange={handleFilterChange} placeholder="Filter by name/designation/skills" />
      <ul style={{  }}>
        {filteredEmployees.map((employee) => (
          <li style={{ padding: "10px",border: '4px solid black', } } key={employee.id}>
            <h2>{employee.name}</h2>
            <p>Designation: {employee.designation}</p>
            <p>Skills: {employee.skills.join(', ')}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
