import './App.css';
import { Routes, Route } from "react-router-dom";
import { Redistribuicao } from './redistribuicao';
import { Login } from './login.screen';

export default function App() {
  return (
    <div className="container">
      <Routes>
        <Route path={'/redistribuicao-app'} element={<Login />} />

        <Route path={'/redistribuicao'} element={
            <Redistribuicao />
        } />
      </Routes>
    </div>
  );
}
