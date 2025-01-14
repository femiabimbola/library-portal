import  { ReactNode } from 'react'

const Layout = ({children}:{children: ReactNode}) => {
  return (
    <main className="root-container">
      <div>{children}</div>
    </main>
    
  )
}

export default Layout