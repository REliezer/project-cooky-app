import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../../store/useAuthStore'
import { useEffect } from 'react'

export default function PrivateRoute() {
  const { isAuthenticated, verifyToken } = useAuthStore()

  useEffect(() => {
    verifyToken()
  }, [verifyToken])

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}
