import { useEffect, useState } from "react"
import Header from "./Header"
import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material"
import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import { getCookie } from "../util/util"
import agent from "../api/agent"
import LoadingComponent from "./LoadingComponent"
import { setBasket } from "../../features/basket/basketSlice"
import { useAppDispatch } from "../store/configureStore"

function App() {
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const buyerId = getCookie('buyerId')
    if (buyerId) {
      agent.Basket.get()
        .then(basket => dispatch(setBasket(basket)))
        .catch(error => console.log(error))
        .finally(() => setLoading(false))
    }
    else setLoading(false)
  }, [dispatch]);

  const [darkMode, setDarkMode] = useState(false)
  const palletType = darkMode ? 'dark' : 'light'

  const theme = createTheme({
    palette: {
      mode: palletType,
      background: {
        default: palletType === 'light' ? '#eaeaea' : '#121212',
      },
    }
  })

  function handleThemeChange() {
    setDarkMode(!darkMode)
  }

  if (loading) return <LoadingComponent message="Initialising app..." />

  return (
    <>
      <ThemeProvider theme={theme}>
        <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
        <CssBaseline />
        <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
        <Container>
          <Outlet />
        </Container>
      </ThemeProvider>
    </>
  )
}

export default App
