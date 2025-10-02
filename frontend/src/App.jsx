import { BrowserRouter, Navigate,Routes,Route } from 'react-router-dom'
import './App.css'
import EmployeeManagement from './Components/EmployeeManagement'
import EmployeeDetail from './Components/EmployeeDetail'
import AddEmployee from "./Components/AddEmployee";



function App() {


  return (
  <>
 
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Navigate to ='employee'/>} ></Route>
      <Route path='/employee' element={<EmployeeManagement/>} ></Route>
       <Route path="/employee/add" element={<AddEmployee />} />
      <Route path='/employee/:id' element={<EmployeeDetail/>} ></Route>
     
    </Routes>
    </BrowserRouter>
  
    </>
  )
}

export default App
