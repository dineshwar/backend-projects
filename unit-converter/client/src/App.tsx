import React, { useState } from 'react'
import './App.css'
import styled from "styled-components";
const types = ["length", "weight", "temperature"];
const Tab = styled.button<{ active?: boolean }>`
  font-size: 20px;
  padding: 10px 60px;
  cursor: pointer;
  opacity: 0.6;
  background: white;
  border: 0;
  outline: 0;
  ${({ active }) =>
    active &&
    `
    border-bottom: 2px solid black;
    opacity: 1;
  `}
`;
const ButtonGroup = styled.div`
  display: flex;
`;
interface TabInfoProps {
  type: string;
  options: string[];
}
const lengthUnits = ["mm", "cm", "m", "km", "in", "ft", "yd", "mi"];
const weightUnits= ["mg", "g", "kg", "oz", "lb"];
const temperatureUnits = ["C", "F", "K"];
type OptionTypes = {
  [key: string]: string[];
};


const optionTypes:OptionTypes = {
  length: lengthUnits,
  weight: weightUnits,
  temperature: temperatureUnits,
}


function TabGroup() {
  const [active, setActive] = useState(types[0]);
  return (
    <>
      <ButtonGroup>
        {types.map((type) => (
          <Tab
            key={type}
            active={active === type}
            onClick={() => setActive(type)}
          >
            {type[0].toUpperCase()+type.slice(1)}
          </Tab>
        ))}
      </ButtonGroup>
      <p />
      <div>
        <TabInfo
          key={active}
          type={active}
          options={optionTypes[active]}
        />
      </div>
    </>
  );
}

const TabInfo: React.FC<TabInfoProps> = ({ type, options }) => {
  const [input, setInput] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [result, setResult] = useState('');
  const fromOptions = options.filter((opt) => opt != to);
  const toOptions = options.filter((opt) => opt != from);
  
  const updateFrom = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFrom(event.target.value)
  }
  const updateTo= (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTo(event.target.value)
  }

  const fetchAction = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const url = `http://localhost:3000/api/convert/${type}`; // Replace with your API endpoint

  const data = {
    input: Number(input),
    from,
    to
  };

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', // Specify the content type
    },
    body: JSON.stringify(data), // Convert data to a JSON string
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json(); // Parse the JSON from the response
    })
    .then(data => {
      setResult(data.result);
    })
    .catch(error => {
      console.error('Error:', error); // Handle any errors
    });

  }
  // Component logic here
  return ((result != '') ? 
    <div>
      <b>Result of your calculation</b>
      <p>{`${input}${from} = ${result}${to}`}</p>
      <button onClick={() => setResult('')}>Reset</button>
    </div>
  :<div>
    <form onSubmit={fetchAction}>
      <label>Enter the {type} to convert
          <input type='number' name='input' value={input} onChange={(event) => setInput(event.target.value)} />
      </label><br/>
      <label>Unit to convert from
        <select name="from" value={from} onChange={updateFrom}>
          <option value="">Select a option</option>
          {fromOptions.map(element => <option value={element}>{element}</option>)}
        </select>
      </label><br/>
      <label>Unit to convert to
      <select name="to" value={to} onChange={updateTo}>
        <option value="">Select a option</option>
        {toOptions.map(element => <option value={element}>{element}</option>)}
      </select>
      </label><br/>
      <button>Convert</button>
    </form>
  </div>)
};

function App() {

  return (
    <>       
      <TabGroup />
    </>
  )
}

export default App