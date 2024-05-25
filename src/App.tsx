import { createContext, useEffect, useState } from 'react'
import './App.css'
import Login from './pages/Login'
import { auth } from './utils/firebase'
import axios from 'axios'
import LoadingSpiner from './components/LoadingSpinner'
import { Grid, NavLink } from '@mantine/core'
import { RiFileTextLine, RiFolderUserLine } from "react-icons/ri";

type ContextType = {
  setLoading: (l: boolean) => void
}

export const AppContext = createContext({} as ContextType)
const App = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isLogin, setIsLogin] = useState<boolean>(false)

  useEffect(() => {
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


  const logout = async () => {
    if (auth.currentUser?.email) {
      auth.signOut().then(() => {
        alert("Logged Out")
      })
    }
  }

  const renderApp = () => (
    <div>
      <Grid columns={24}>
        <Grid.Col span={4} className='bg-[#333] h-[100vh] p-0'>
          <h2 className='p-8'>258 CRM Console</h2>
          <NavLink
            className='text-2xl pl-8'
            href="#required-for-focus"
            label="Invoices"
            leftSection={<RiFileTextLine />}
            variant="filled"
            active={false}
          />
          <NavLink
            className='text-2xl pl-8'
            href="#required-for-focus"
            label="Customers Info"
            leftSection={<RiFolderUserLine />}
          />
        </Grid.Col>
        <Grid.Col span={20}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, consequatur provident rerum nobis voluptatum praesentium ad perferendis dolores unde vitae nemo sequi aperiam repellat obcaecati ipsa illum laborum. Cupiditate, molestiae!
        </Grid.Col>
      </Grid>
    </div>
  )

  return (
    <div className='appContainer'>
      <AppContext.Provider value={{ setLoading: setIsLoading }}>
        <LoadingSpiner show={isLoading} />
        {isLogin ? renderApp() : <Login />}
      </AppContext.Provider>
    </div>
  )
}

export default App
