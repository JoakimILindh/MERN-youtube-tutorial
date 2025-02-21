import { Outlet } from "react-router"
import Navbar from "../components/Navbar"
import { useAuth } from "../contexts/authContext"
import { RiLoaderFill } from "react-icons/ri"

const RootLayout = () => {

  const { authReady } = useAuth()


  if(!authReady) {
    return (
      <div className="bg-indigo-950 min-h-dvh text-white flex items-center justify-center">
        <RiLoaderFill className="size-16 animate-spin" />
      </div>
    )
  }

  return (
    <div className="bg-indigo-950 min-h-dvh text-white grid grid-rows-[auto_1fr_auto]">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <div className="bg-black/30 py-4">
        <div className="wrapper">
          <p className="text-center">&copy; LindhCoding {new Date().getFullYear()}</p>
        </div>
      </div>
    </div>
  )
}
export default RootLayout