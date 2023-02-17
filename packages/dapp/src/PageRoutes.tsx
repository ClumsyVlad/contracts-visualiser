import { Route, Routes } from 'react-router-dom'
import { MainPage } from './pages'


export const PageRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route>{404}</Route>
    </Routes>
  )
}

