import React, { Suspense, useEffect, useState } from 'react'
import {
  BrowserRouter,
  HashRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { CSpinner, useColorModes } from '@coreui/react'
import './scss/style.scss'
import './assets/css/app.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './css/bootstrap.min.css'
import './css/style.css'
import './css/plugin.css'
import './fonts/line-icons.css'



// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))
const UserLayout = React.lazy(() => import('./layout/UserLayout.js'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const HomePage = React.lazy(() => import('./pages/HomePage.js'))
const PdfPage = React.lazy(() => import('./pages/PdfPage.js'))
const ExploreIndia = React.lazy(() => import('./pages/ExploreIndia.js'))
const AboutPage = React.lazy(() => import('./pages/AboutPage.js'))
const BlogsPage = React.lazy(() => import('./pages/BlogsPage.js'))
const BlogDetails = React.lazy(() => import('./pages/BlogDetails.js'))
const Placedetails = React.lazy(() => import('./pages/Placedetails.js'))
const TourPackage = React.lazy(() => import('./pages/TourPackage.js'))
const PackageDynamic = React.lazy(() => import('./pages/PackageDynamic.js'))
const PackageDynamicPrivate = React.lazy(() => import('./pages/PackageDynamicPrivate.js'))
const CarRentel = React.lazy(() => import('./pages/CarRentel.js'))
const HotDeals = React.lazy(() => import('./pages/HotDeals.js'))
const Places = React.lazy(() => import('./pages/Places.js'))
const LogIn = React.lazy(() => import('./pages/LogIn.js'))
const SignUP = React.lazy(() => import('./pages/SignUP.js'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))
const TermAndConditionPage = React.lazy(() => import('./pages/TermAndConditionPage.js'))
const ContactPage = React.lazy(() => import('./pages/ContactPage.js'))
const PrivacyPolicyPage = React.lazy(() => import('./pages/PrivacyPolicyPage.js'))
const CancellationAndRefundPage = React.lazy(() => import('./pages/CancellationAndRefundPage.js'))
const PaymentsPage = React.lazy(() => import('./pages/PaymentsPage.js'))
const ShippingAndDeliveryPage = React.lazy(() => import('./pages/ShippingAndDeliveryPage.js'))
const RaiseEnquiry = React.lazy(() => import('./pages/RaiseEnquiry.js'))
const CheckOut = React.lazy(() => import('./pages/CheckOut.js'))
const HotelPackage = React.lazy(() => import('./pages/HotelPackage.js'))
const HotelPackageDynamic = React.lazy(() => import('./pages/HotelPackageDynamic.js'))

const App = () => {
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const storedTheme = useSelector((state) => state.theme)

  const token = useSelector((state) => state.token)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1])
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0]
    if (theme) {
      setColorMode(theme)
    }

    if (isColorModeSet()) {
      return
    }

    setColorMode(storedTheme)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <HashRouter>
      <Suspense
        fallback={
         
          <div id="preloader">
            <div id="status"></div>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pdf" element={<PdfPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/user/checkout/" element={<CheckOut />} />
          <Route path="/blog/:id" element={<BlogDetails />} />
          <Route path="/place/:id" element={<Placedetails />} />
          <Route path="/:id" element={<TourPackage />} />
          <Route path="/package/:id" element={<PackageDynamic />} />
          <Route path="/package/private/:enquiryId/:id" element={<PackageDynamicPrivate />} />
          <Route path="/hotel/:id" element={<HotelPackage />} />
          <Route path="/hotel/package/:id" element={<HotelPackageDynamic />} />

          <Route path="/book/car" element={<CarRentel />} />
          <Route path="/hot/deals" element={<HotDeals />} />
          <Route path="/places" element={<Places />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUP />} />
          <Route path="/explore/india" element={<ExploreIndia />} />
          <Route path="/term&condition" element={<TermAndConditionPage />} />
          <Route path="/payments" element={<PaymentsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacyPolicy" element={<PrivacyPolicyPage />} />
          <Route path="/cancellationAndRefund" element={<CancellationAndRefundPage />} />
          <Route path="/shippingAndDelivery" element={<ShippingAndDeliveryPage />} />
          <Route path="/public/enquiry" element={<RaiseEnquiry />} />

          <Route exact path="/admin/login" name="Login Page" element={<Login />} />
          <Route exact path="/admin/register" name="Register Page" element={<Register />} />
          <Route exact path="/500" name="Page 500" element={<Page500 />} />
          {token && <Route path="*" name="Dashboard" element={<Layout />} />}
          {!token && <Route exact path="*" name="Page 404" element={<Page404 />} />}
        </Routes>
      </Suspense>
    </HashRouter>
  )
}

const Layout = () => {
  const location = useLocation()

  // Check if the path includes 'admin'
  const isAdminPath = location.pathname.includes('admin')

  // Conditionally render the appropriate layout
  return isAdminPath ? <DefaultLayout /> : <UserLayout />
}

export default App
