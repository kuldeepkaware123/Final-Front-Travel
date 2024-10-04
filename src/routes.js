import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))

//user import
const DashboardUser = React.lazy(() => import('./userView/dashboard/Dashboard.js'))
const UserProfileEdit = React.lazy(() => import('./userView/profile/EditProfile.js'))
const UserBooking = React.lazy(() => import('./userView/bookings/MyBookings.js'))
const UserBookingHotels = React.lazy(() => import('./userView/hotel/myBookings.js'))
const BookingDetailsPage = React.lazy(() => import('./userView/bookings/BookingDetailsPage.js'))
const AllEnquiry = React.lazy(() => import('./userView/contact/Contac.js'))
const AllEnquiryByID = React.lazy(() => import('./userView/contact/PackageManager.js'))
const CreateEnquiry = React.lazy(() => import('./userView/contact/CreateEnquiry.js'))

// Base
const Accordion = React.lazy(() => import('./views/base/accordion/Accordion'))
const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'))
const Cards = React.lazy(() => import('./views/base/cards/Cards'))
const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'))
const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'))
const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'))
const Navs = React.lazy(() => import('./views/base/navs/Navs'))
const Paginations = React.lazy(() => import('./views/base/paginations/Paginations'))
const Placeholders = React.lazy(() => import('./views/base/placeholders/Placeholders'))
const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'))
const Progress = React.lazy(() => import('./views/base/progress/Progress'))
const Spinners = React.lazy(() => import('./views/base/spinners/Spinners'))
const Tables = React.lazy(() => import('./views/base/tables/Tables'))
const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'))

// Buttons
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'))
const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'))
const Dropdowns = React.lazy(() => import('./views/buttons/dropdowns/Dropdowns'))

//Forms
const ChecksRadios = React.lazy(() => import('./views/forms/checks-radios/ChecksRadios'))
const FloatingLabels = React.lazy(() => import('./views/forms/floating-labels/FloatingLabels'))
const FormControl = React.lazy(() => import('./views/forms/form-control/FormControl'))
const InputGroup = React.lazy(() => import('./views/forms/input-group/InputGroup'))
const Layout = React.lazy(() => import('./views/forms/layout/Layout'))
const Range = React.lazy(() => import('./views/forms/range/Range'))
const Select = React.lazy(() => import('./views/forms/select/Select'))
const Validation = React.lazy(() => import('./views/forms/validation/Validation'))

const Charts = React.lazy(() => import('./views/charts/Charts'))

// Icons
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'))
const Flags = React.lazy(() => import('./views/icons/flags/Flags'))
const Brands = React.lazy(() => import('./views/icons/brands/Brands'))

// Notifications
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'))
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'))
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'))
const Toasts = React.lazy(() => import('./views/notifications/toasts/Toasts'))

const AddClients = React.lazy(() => import('./views/Clients/AddClients.js'))
const AllClients = React.lazy(() => import('./views/Clients/AllClients.js'))
const EditClient = React.lazy(() => import('./views/Clients/EditClient.js'))
const ContactReq = React.lazy(() => import('./views/contact/Contac.js'))
const AddPackages = React.lazy(() => import('./views/Packages/AddPackages.js'))
const AllPackages = React.lazy(() => import('./views/Packages/AllPackages.js'))
const EditPackages = React.lazy(() => import('./views/Packages/EditPackages.js'))
const BookingPage = React.lazy(() => import('./views/Clients/BookingPage.js'))
const HotDeals = React.lazy(() => import('./views/hotDeals/HotDeals.js'))
const AddBlog = React.lazy(() => import('./views/blog/AddBlog.js'))
const AllBlogs = React.lazy(() => import('./views/blog/AllBlogs.js'))
const EditBlog = React.lazy(() => import('./views/blog/EditBlog.js'))
const AddHotel = React.lazy(() => import('./views/hotels/Addhotel.js'))
const AllHotels = React.lazy(() => import('./views/hotels/AllHotel.js'))
const EditHotel = React.lazy(() => import('./views/hotels/EditHotel.js'))
const AllHotelBookings = React.lazy(() => import('./views/hotels/AllBookings.js'))
const TripType = React.lazy(() => import('./views/tripType/TripType.js'))
const Destinations = React.lazy(() => import('./views/Destinations/Destinations.js'))
const PackageManager = React.lazy(() => import('./views/contact/PackageManager.js'))
const CouponManager = React.lazy(() => import('./views/coupon/CouponManager.js'))
const OfferPage = React.lazy(() => import('./views/offer/OfferPage.js'))
const NewOfferPage = React.lazy(() => import('./views/offer/NewOfferPage.js'))
const Testimonials = React.lazy(() => import('./views/Testimonials/Testimonials.js'))
const BannerPage = React.lazy(() => import('./views/EditWebsite/BannerPage.js'))
const BestTour = React.lazy(() => import('./views/EditWebsite/BestTour.js'))
const BestHotel = React.lazy(() => import('./views/EditWebsite/BestHotel.js'))
const Callback = React.lazy(() => import('./views/callback/Callback.js'))
const MyBookings = React.lazy(() => import('./views/bookings/MyBookings.js'))
const BookingDetailsPageAdmin = React.lazy(() => import('./views/bookings/BookingDetailsPage.js'))
const EnquiryFormEdit = React.lazy(() => import('./pages/EnquiryFormEdit.js'))
const AddPlace = React.lazy(() => import('./views/place/AddPlace.js'))
const AllPlaces = React.lazy(() => import('./views/place/AllPlaces.js'))
const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

//manage admin pages
const PaymentTerm = React.lazy(() => import('./views/ManageDetails/PayemtTerm.js'))
const FAQ = React.lazy(() => import('./views/ManageDetails/FAQ.js'))
const TermConditions = React.lazy(() => import('./views/ManageDetails/TermConditions.js'))
const TravelEssentials = React.lazy(() => import('./views/ManageDetails/TravelEssentials.js'))

const routes = [
  // working routes current

  { path: '/', exact: true, name: 'Home' },
  { path: '/admin/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/admin/client/add', name: 'Add Client', element: AddClients },
  { path: '/admin/client/all', name: 'All Client', element: AllClients },
  { path: '/admin/enquiry', name: 'Enquiry Request', element: ContactReq },
  { path: '/admin/packages/add', name: 'Add Packages', element: AddPackages },
  { path: '/admin/package/embed/:id', name: 'Add Packages', element: AddPackages },
  { path: '/admin/packages/all', name: 'All Packages', element: AllPackages },
  { path: '/admin/packages/edit/:id', name: 'Edit Packages', element: EditPackages },
  { path: '/admin/packages/edit/embed/:id/:enqId', name: 'Edit Packages', element: EditPackages },
  { path: '/admin/client/:id/bookings', name: 'Client Booking', element: BookingPage },
  { path: '/admin/client/:id/edit', name: 'Client Edit', element: EditClient },
  { path: '/admin/hot/deals', name: 'Hot Deals', element: HotDeals },
  { path: '/admin/blogs/add', name: 'Add Blogs', element: AddBlog },
  { path: '/admin/blogs/all', name: 'All Blogs', element: AllBlogs },
  { path: '/admin/blogs/edit/:id', name: 'Edit Blogs', element: EditBlog },
  { path: '/admin/hotels/add', name: 'Add Blogs', element: AddHotel },
  { path: '/admin/hotels/all', name: 'All Blogs', element: AllHotels },
  { path: '/admin/hotels/edit/:id', name: 'Edit Blogs', element: EditHotel },
  { path: '/admin/hotels/bookings', name: 'Edit Blogs', element: AllHotelBookings },
  { path: '/admin/manage/payments-term', name: 'Payment Term', element: PaymentTerm },
  { path: '/admin/manage/travel', name: 'Travel Essentials', element: TravelEssentials },
  { path: '/admin/manage/term-conditions', name: 'Term Conditions', element: TermConditions },
  { path: '/admin/manage/faq', name: 'FAQ', element: FAQ },
  { path: '/admin/trip-type', name: 'Trip Type', element: TripType },
  { path: '/admin/destinations', name: 'Destinations', element: Destinations },
  { path: '/admin/inquiry/:id', name: 'Inquiry', element: PackageManager },
  { path: '/admin/coupon', name: 'Coupon', element: CouponManager },
  { path: '/admin/offer/all', name: 'Offer', element: OfferPage },
  { path: '/admin/offer', name: 'Offer', element: NewOfferPage },
  { path: '/admin/testimonials', name: 'Testimonials', element: Testimonials },
  { path: '/admin/banner', name: 'Banner', element: BannerPage },
  { path: '/admin/best/tour', name: 'Banner', element: BestTour },
  { path: '/admin/best/hotel', name: 'Banner', element: BestHotel },
  { path: '/admin/callback/request', name: 'CallBack Request', element: Callback },
  { path: '/admin/bookings', name: 'Bookings All', element: MyBookings },
  { path: '/admin/booking/:bookingId', name: 'Bookings All', element: BookingDetailsPageAdmin },
  { path: '/admin/enquiry/edit/:id', name: 'Edit Enquiry', element: EnquiryFormEdit },
  {
    path: '/admin/place/add',
    name: 'Add Place',
    element: AddPlace,
  },
  {
    path: '/admin/place/all',
    name: 'All Places',
    element: AllPlaces,
  },
  // user routes

  { path: '/user/dashboard', name: 'Dashboard', element: DashboardUser },
  { path: '/user/edit/profile', name: 'Edit Profile', element: UserProfileEdit },
  { path: '/user/booking', name: 'Bookings', element: UserBooking },
  { path: '/user/hotel', name: 'Bookings', element: UserBookingHotels },
  { path: '/user/booking/:bookingId', name: 'Booking', element: BookingDetailsPage },
  { path: '/user/enquiry', name: 'Enquiry', element: AllEnquiry },
  { path: '/user/enquiry/:id', name: 'Enquiry ID', element: AllEnquiryByID },
  { path: '/user/create/enquiry', name: 'Enquiry Create', element: CreateEnquiry },

  //  theme routes old

  { path: '/theme', name: 'Theme', element: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', element: Colors },
  { path: '/theme/typography', name: 'Typography', element: Typography },
  { path: '/base', name: 'Base', element: Cards, exact: true },
  { path: '/base/accordion', name: 'Accordion', element: Accordion },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', element: Breadcrumbs },
  { path: '/base/cards', name: 'Cards', element: Cards },
  { path: '/base/carousels', name: 'Carousel', element: Carousels },
  { path: '/base/collapses', name: 'Collapse', element: Collapses },
  { path: '/base/list-groups', name: 'List Groups', element: ListGroups },
  { path: '/base/navs', name: 'Navs', element: Navs },
  { path: '/base/paginations', name: 'Paginations', element: Paginations },
  { path: '/base/placeholders', name: 'Placeholders', element: Placeholders },
  { path: '/base/popovers', name: 'Popovers', element: Popovers },
  { path: '/base/progress', name: 'Progress', element: Progress },
  { path: '/base/spinners', name: 'Spinners', element: Spinners },
  { path: '/base/tables', name: 'Tables', element: Tables },
  { path: '/base/tooltips', name: 'Tooltips', element: Tooltips },
  { path: '/buttons', name: 'Buttons', element: Buttons, exact: true },
  { path: '/buttons/buttons', name: 'Buttons', element: Buttons },
  { path: '/buttons/dropdowns', name: 'Dropdowns', element: Dropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', element: ButtonGroups },
  { path: '/charts', name: 'Charts', element: Charts },
  { path: '/forms', name: 'Forms', element: FormControl, exact: true },
  { path: '/forms/form-control', name: 'Form Control', element: FormControl },
  { path: '/forms/select', name: 'Select', element: Select },
  { path: '/forms/checks-radios', name: 'Checks & Radios', element: ChecksRadios },
  { path: '/forms/range', name: 'Range', element: Range },
  { path: '/forms/input-group', name: 'Input Group', element: InputGroup },
  { path: '/forms/floating-labels', name: 'Floating Labels', element: FloatingLabels },
  { path: '/forms/layout', name: 'Layout', element: Layout },
  { path: '/forms/validation', name: 'Validation', element: Validation },
  { path: '/icons', exact: true, name: 'Icons', element: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', element: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', element: Flags },
  { path: '/icons/brands', name: 'Brands', element: Brands },
  { path: '/notifications', name: 'Notifications', element: Alerts, exact: true },
  { path: '/notifications/alerts', name: 'Alerts', element: Alerts },
  { path: '/notifications/badges', name: 'Badges', element: Badges },
  { path: '/notifications/modals', name: 'Modals', element: Modals },
  { path: '/notifications/toasts', name: 'Toasts', element: Toasts },
  { path: '/widgets', name: 'Widgets', element: Widgets },
]

export default routes
