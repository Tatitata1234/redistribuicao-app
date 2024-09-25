import './App.css';
import { Routes, Navigate } from "react-router-dom";
import { useGlobalUser } from './user.context';
import { Redistribuicao } from './redistribuicao';
import { Login } from './login.screen';

function PrivateRoute({ children }) {
  const [user] = useGlobalUser()

  if (user) {
    return <>{children}</>
  } else {
    return <Navigate to="/" />
  }
}

export function App() {
  return (
    <div className="App">
      <Routes>
        <Login path='/'/>
        {console.log("dentro da div")}
        <PrivateRoute>
          <Redistribuicao path="/redistribuicao"/>
        </PrivateRoute>
      </Routes>
      <ListaBase array={[1,2]} handleClick={handleClick} titulo={'oiii'} />
    </div>
    
  );
}

