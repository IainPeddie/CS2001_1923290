import {Routes, Route, BrowserRouter as Router} from "react-router-dom"
import App from "./App";
import Input from "./components/Input";
import Expenses from "./components/Expenses";
import List from "./components/List";
import Result from "./components/Result";

export default function AppRouter(){
  return (
  <Router>
    <Routes>
        <Route path={'/'} element={<App/>}>
          <Route index element={<Input />} />
          <Route path={'/expenses'} element={<Expenses/>}/>
          <Route path={'/list'} element={<List />}/>
          <Route path={'/result'} element={<Result />}/>
        </Route>
      </Routes>
    </Router>
  )
}