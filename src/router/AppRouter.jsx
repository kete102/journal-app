import { Route, Routes } from 'react-router-dom'
import { AuthRoutes } from '../auth/routes/AuthRoutes'
import { JournalRoutes } from '../journal/routes/JornalRoutes'

export const AppRouter = () => {
  return (
    <Routes>
      {/* Login & SignUp */}
      <Route
        path='/auth/*'
        element={<AuthRoutes />}
      />
      {/* JournalApp */}
      <Route
        path='/*'
        element={<JournalRoutes />}
      />
    </Routes>
  )
}
