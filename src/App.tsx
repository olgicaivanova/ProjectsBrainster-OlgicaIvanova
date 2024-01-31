import "./App.css";
import { HomePage } from "./components/HomePage";
import { Route, Routes } from "react-router-dom";
import { Search } from "./components/Search";
import { Benefit, HomePageProps, Login } from "./types/types";
import { useFetchData } from "./hooks/hooks";
import { SearchResult } from "./components/SearchResult";
import {  MapApp } from "./components/Map";
import { LogIn } from "./components/LogIn";
import { ViewProfile } from "./components/ViewProfile";
import { Edit } from "./components/Edit";
import { EditPersonalInfo } from "./components/EditPersonalInfo";
import { NotificationSettings } from "./components/NotificatonSettings";
import { PaymentMethods } from "./components/PaymentMethods";
import { NewCard } from "./components/NewCard";
import { SeeAllReviews } from "./components/SeeAllReviews";
import { AllServices } from "./components/AllServices";
import { Booking } from "./components/Booking";
import { ConfirmAppointment } from "./components/ConfirmAppointment";
import { MyAppointments } from "./components/MyAppointments";
import { AppointmentDetails } from "./components/AppointmentDetails";
import { GiveReviews } from "./components/GiveReviews";
import { ContextProvider, FilterProvider, FiltersSliderProvider } from "./Context/context";
import { Favorites } from "./components/Favorites";
import { ManageAppointments } from "./components/ManageAppointments";
import { Rebook } from "./components/Rebook";
import { CancelAppointment } from "./components/CancelAppointment";
import { Memberships } from "./components/Memberships";
import { SalonPage } from "./components/SalonPage";
import { Profile } from "./components/Profile";



function App() {
  const data = useFetchData<HomePageProps>("http://localhost:5000/users");
  const benefit = useFetchData<Benefit>("http://localhost:5000/benefits")
  const loginData = useFetchData<Login>("http://localhost:5000/login")

  const loggedInUser = localStorage.getItem("loggedUser");
  

  return (
    <div>
    <FilterProvider>
      <ContextProvider>
      <FiltersSliderProvider>
      <Routes>
        <Route path="/" element={<HomePage users={data} benefit={benefit}/>} />
        <Route path="/search" element={<Search  users={data} />} />
        <Route path="/search-results" element={<SearchResult />} />
        <Route path="/search-results/map" element={<MapApp />} />
        <Route path="/search-results/map/salon-page/:id" element={<SalonPage users={data} />} />
        <Route path="/search-results/map/salon-page/all-services/:title" element={<AllServices users={data} />} />
        <Route path="/search-results/map/salon-page/all-services/:title/booking" element={<Booking users={data} />} />
        <Route path="/search-results/map/salon-page/all-services/:title/booking/appointment/" element={<ConfirmAppointment users={data} profile={loginData} />} />
        <Route path="/search-results/map/salon-page/:id/reviews" element={<SeeAllReviews users={data} />} /> 
        <Route path="/login" element={<LogIn login={loginData}  />} />
        <Route path="/login/profile" element={<Profile profile={loginData} id={loggedInUser}  />} />
        <Route path="/login/my-appointments/:id" element={<MyAppointments profile={loginData} users={data} />} />
        <Route path="/login/my-favorites/:id" element={<Favorites users={data} />} />
        <Route path="/login/my-memberships/:id" element={<Memberships profile={loginData} />} />
        <Route path="/login/my-appointments/:id/details/:appointmentId" element={<AppointmentDetails profile={loginData} users={data} />} />
        <Route path="/login/my-appointments/:id/details/:appointmentId/give-reviews" element={<GiveReviews profile={loginData} users={data} />} />
        <Route path="/login/my-appointments/:id/details/:appointmentId/manage-appointments" element={<ManageAppointments profile={loginData} users={data} />} />
        <Route path="/login/my-appointments/:id/details/:appointmentId/manage-appointments/rebook" element={<Rebook profile={loginData} users={data} />} />
        <Route path="/login/my-appointments/:id/details/:appointmentId/manage-appointments/cancel" element={<CancelAppointment profile={loginData} users={data} />} />
        <Route path="/view-profile/:name" element={<ViewProfile profile={loginData} />} />
        <Route path="/view-profile/:name/edit" element={<Edit profile={loginData} />} />
        <Route path="/view-profile/:name/edit-personal-info" element={<EditPersonalInfo profile={loginData} />} />
        <Route path="/view-profile/:name/notification-settings" element={<NotificationSettings profile={loginData} />} />
        <Route path="/view-profile/:name/payment-methods" element={<PaymentMethods profile={loginData} />} />
        <Route path="/view-profile/:name/payment-methods/add-new-card" element={<NewCard profile={loginData} />} />
      </Routes>
      </FiltersSliderProvider>
      </ContextProvider>
      </FilterProvider>
    </div>
  );
}

export default App;