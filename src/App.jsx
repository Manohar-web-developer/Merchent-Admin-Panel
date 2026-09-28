import AppRoutes from './routes/AppRoutes.jsx'
import { Toaster } from '@/components/ui/sonner'

export default function App() {
  return (
    <>
      <AppRoutes />
      <Toaster />
    </>
  )
}

