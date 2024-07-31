import { useEffect, useState } from 'react'
import './App.css'
import Login from './pages/Login'
import { auth } from './utils/firebase'
import axios from 'axios'
import LoadingSpiner from './components/LoadingSpinner'
import { Badge, Button, NavLink, Tooltip } from '@mantine/core'
import { RiFileTextLine, RiFolderUserLine, RiLogoutBoxLine } from "react-icons/ri";
import Invoices from './pages/Invoices'
import Customers from './pages/Customers'
import { isLoadingAtom } from './utils/atoms'
import { useAtom } from 'jotai'

const App = () => {
  const [isLoading] = useAtom(isLoadingAtom)
  const [isLogin, setIsLogin] = useState<boolean>(false)
  const [activePage, setActivePage] = useState(0);

  useEffect(() => {
    // firebase login detection
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        console.log("User is logged in")
        setIsLogin(true)
        return
      } else {
        console.log("No user is logged in")
        setIsLogin(false)
        return
      }
    })

    // add firebase token with interceptors
    axios.interceptors.request.use(
      async (config) => {
        config.headers.Authorization = await auth.currentUser?.getIdToken()
        return config;
      },
      (error) => {
        return Promise.reject(error)
      },
    )
  }, [])

  // signout firebase
  const logout = async () => {
    if (auth.currentUser?.email) {
      auth.signOut().then(() => {
        alert("Logged Out")
        setIsLogin(false)
      })
    }
  }

  // side navigation data
  const navData = [
    {
      icon: RiFileTextLine,
      label: 'Invoices',
      description: 'Overview of All Invoices',
      href: '/invoices'
    },
    {
      icon: RiFolderUserLine,
      label: 'Customers Infos',
      description: 'Overview of All Cutomer Information',
      href: '/customers'
    },
  ]

  const renderSideNav = () => (
    <div className='min-w-[320px]'>
      <h2 className='p-8'>258 CRM Console</h2>
      {
        navData.map((item, index) => (
          <NavLink
            className='text-2xl pl-8'
            key={item.label}
            active={index === activePage}
            label={item.label}
            leftSection={<item.icon />}
            onClick={() => setActivePage(index)}
            color="green"
          />
        ))
      }

      <div className='p-8 absolute bottom-0'>
        <div className='flex'>
          <Tooltip label="Logout">
            <Button className='mt-2 mr-8' color='#666' onClick={logout}>
              <RiLogoutBoxLine />
            </Button>
          </Tooltip>
          <div>
            <Badge color='teal'>
              Server Status: Online
            </Badge>
            <br />
            <Badge
              variant="gradient"
              gradient={{ from: 'cyan', to: 'violet', deg: 253 }}
            >
              {auth.currentUser?.email}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  )

  const renderContent = () => {
    switch (activePage) {
      case 0:
        return <Invoices />
      case 1:
        return <Customers />
      default:
        <>404 Not Found</>
    }
  }

  const renderApp = () => (
    <div className='flex h-screen w-screen'>
      <div className='bg-[#333] p-0'>
        {renderSideNav()}
      </div>
      <div className="p-10 overflow-scroll w-full overflow-x-hidden bg-[url('src/assets/bg2.jpg')] bg-cover bg-blend-multiply	bg-gray-300">
        {renderContent()}
      </div>
    </div>
  )

  return (
    <div>
      <LoadingSpiner show={isLoading} />
      {isLogin ? renderApp() : <Login />}
    </div>
  )
}

export default App
