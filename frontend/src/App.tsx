import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy } from 'react';
const ExpensePage=lazy(()=>import ('./pages/ExpensePage'))
const ProtectedRoute=lazy(()=>import ('./components/ProtectedRoute'))
const GroupDetails=lazy(()=>import ('./pages/GroupDetails'))
const Dashboard=lazy(()=>import ('./pages/Dashboard'))
const AuthForm=lazy(()=>import ('./pages/AuthForm'))

function App() {

  return (
     <Router>
    <Routes>
      <Route path="/" element={<AuthForm/>} />
      <Route element={<ProtectedRoute/>}>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/expense/:groupId" element={<ExpensePage />} />
      <Route path="/group/:groupId" element={<GroupDetails />} />
      </Route>
    </Routes>
  </Router>
  )
}

export default App


