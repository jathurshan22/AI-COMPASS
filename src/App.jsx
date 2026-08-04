import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import { ProtectedRoute } from "./components/Ui.jsx";

import Home from "./pages/Home.jsx";
import Finder from "./pages/Finder.jsx";
import Explore from "./pages/Explore.jsx";
import Categories from "./pages/Categories.jsx";
import Compare from "./pages/Compare.jsx";
import ToolDetails from "./pages/ToolDetails.jsx";
import Saved from "./pages/Saved.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import { Login, Register } from "./pages/Auth.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Reviews from "./pages/Reviews.jsx";
import AdminLayout from "./pages/admin/AdminLayout.jsx";
import AdminOverview from "./pages/admin/AdminOverview.jsx";
import AdminTools from "./pages/admin/AdminTools.jsx";
import AdminCategories from "./pages/admin/AdminCategories.jsx";
import AdminUsers from "./pages/admin/AdminUsers.jsx";
import AdminReviews from "./pages/admin/AdminReviews.jsx";
import AdminProfile from "./pages/admin/AdminProfile.jsx";
import NotFound from "./pages/NotFound.jsx";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

// full-bleed pages hide the shared navbar/footer chrome
const BARE = ["/login", "/register"];

export default function App() {
  const { pathname } = useLocation();
  const bare = BARE.includes(pathname) || pathname.startsWith("/admin");

  return (
    <>
      <ScrollToTop />
      {!bare && <Navbar />}
      <main key={pathname} className="page-fade">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/finder" element={<Finder />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/tools/:slug" element={<ToolDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/saved" element={<ProtectedRoute><Saved /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute adminOnly><AdminLayout /></ProtectedRoute>}>
            <Route index element={<AdminOverview />} />
            <Route path="tools" element={<AdminTools />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="reviews" element={<AdminReviews />} />
            <Route path="profile" element={<AdminProfile />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!bare && <Footer />}
    </>
  );
}
