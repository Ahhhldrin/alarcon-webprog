import {Outlet} from "react-router-dom";
import NavBar from './NavBar';
import Footer from './Footer';

const Layout = () => {
  return (
   <div className= "min-h-screen bg-zinc-100 text-zinc-900 flex flex-col">
    <NavBar />
    <main className="flex-grow pt-20">
 <Outlet />
    </main>
    <Footer />

   </div>
  );
};

export default Layout;

