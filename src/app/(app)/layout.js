'use client';
import { useState } from 'react';
import TopNav from "@/app/Component/TopNav";
import Sidebar from "@/app/Component/Sidebar";
import Footer from "@/app/Component/Footer";
import AddJS from "@/app/Component/AddJS";
import {useAuth} from "@/hooks/auth";
import Loading from "@/app/(app)/Loading";


const Layout = ({ children }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const toggleSidebar = () => {
        setIsCollapsed((prev) => !prev);
    };
    const {user} = useAuth({ middleware: 'auth' })
    if (!user ) {
        return <Loading />
    }



    return (
      <div className="wrapper">
      <AddJS/>
      <TopNav user={user} tog={toggleSidebar} tog2={isCollapsed}/>
      <Sidebar user={user} tog={toggleSidebar} tog2={isCollapsed}/>
      <main>{children}</main>
      <Footer user={user} />
      </div>
  )
}

export default Layout
