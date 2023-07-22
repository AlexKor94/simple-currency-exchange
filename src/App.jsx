import { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import { styled } from '@mui/system';
import CurrencyExchangeService from './services/CurrencyExchangeService';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.scss'

function App() {
  const [val, setVal] = useState(0);
  const [sum, setSum] = useState(0);
  const [cc, setCC] = useState('');
  const [visible, setVisible] = useState(false);

  const currencyExchangeService = new CurrencyExchangeService();

  const getData = (e) => {
    const currency = e.currentTarget.getAttribute('data-cc');
    currencyExchangeService.getResource(currency).then(res => updateSum(res));
  }

  function onUpdateVal(newVal) {
    setVisible(false);
    setVal(val => newVal);
  }

  const updateSum = ({code, rate}) => {
    const newSum = val * rate;
    setSum(newSum.toFixed(2));
    setCC(code);
    setVisible(true);
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <h2>Калькулятор валют:</h2>
      <div className="card">
        <div className="result">
          {visible ? `${val} грн = ${sum} в ${cc}` : null}
          
        </div>
        <Input
          placeholder='введіть суму в грн'
          className='enterSum'
          onChange={(e) => onUpdateVal(e.target.value)}
        />
        <div className='buttons'>
          <Button
            onClick={(e) => getData(e)}
            data-cc="USD">USD</Button>
          <Button
            onClick={(e) => getData(e)}
            data-cc="EUR">EUR</Button>
        </div> 
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
