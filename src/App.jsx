import { BrowserRouter, Route, Routes } from 'react-router-dom'
import FeedPage from "./pages/FeedPage"
import AuthPage from './pages/AuthPage'
import ProtectedRoute from './pages/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<AuthPage/>}/>
      <Route element={<ProtectedRoute/>}>
      <Route path='/feed' element={<FeedPage/>}/>
      </Route>
    </Routes>
    </BrowserRouter>

  )
}

export default App
