import {Routes, Route, BrowserRouter as Router} from "react-router-dom"
import App from "./App";
import Expenses from "./components/Expenses";

export default function AppRouter(){
  return (
  <Router>
    <Routes>
        <Route path={'/'} element={<App/>}>
          <Route path={'/expenses'} element={<Expenses/>}/>
        </Route>
      </Routes>
    </Router>
  )
}