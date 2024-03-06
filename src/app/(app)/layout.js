'use client';
import TopNav from "@/app/Component/TopNav";
import Sidebar from "@/app/Component/Sidebar";
import Footer from "@/app/Component/Footer";
import AddJS from "@/app/Component/AddJS";
import {useAuth} from "@/hooks/auth";
import Loading from "@/app/(app)/Loading";


const Layout = ({ children }) => {
    const {user} = useAuth({ middleware: 'auth' })
    if (!user ) {
        return <Loading />
    }

    return (
      <div className="wrapper">
      <AddJS/>
      <TopNav user={user} />
      <Sidebar user={user} />
      <main>{children}</main>
      <Footer user={user} />
      </div>
  )
}

export default Layout
