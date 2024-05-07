import { ReactNode } from 'react'
import '@/sass/layouts/auth-layout.scss'

interface LayoutProps {
  children: ReactNode
}

const Layout = function ({ children }: LayoutProps) {
  return (
    <div className="auth-layout">
      <main className="auth-layout__main">{children}</main>
      <div className="auth-layout__placeholder">
        <div className="circle"></div>
      </div>
    </div>
  )
}

export default Layout
