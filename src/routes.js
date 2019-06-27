// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import CalendarPage from "views/Calendar";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import ShopPage from "views/Shop";
import SunPage from "views/Sun/Sun";
import TillPage from "views/Till";
import CertificatePage from "views/Certificate/Certificate";
import TableList from "views/TableList/TableList.jsx";
import Typography from "views/Typography/Typography.jsx";
import Icons from "views/Icons/Icons.jsx";
import Maps from "views/Maps/Maps.jsx";
import NotificationsPage from "views/Notifications/Notifications.jsx";
import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.jsx";
import React from "react";
// core components/views for RTL layout
// import RTLPage from "views/RTLPage/RTLPage.jsx";

import Picker from "./views/Calendar/Events/Forms/Inputs/Picker";


const newCal = () => <CalendarPage/>;
const newShop = () => <ShopPage/>;
const newTill = () => <TillPage/>;

const CustomComponent = () => {
  return (
    <div>Custom</div>
  );
};

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/calendar",
    name: "Запись Клиентов",
    rtlName: "لوحة القيادة",
    icon: "query_builder",
    component: newCal,
    layout: "/admin"
  },
  {
    path: "/shop",
    name: "Каталог",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "shopping_cart",
    component: newShop,
    layout: "/admin"
  },
  {
    path: "/wallet",
    name: "Касса",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "account_balance_wallet",
    component: newTill,
    layout: "/admin"
  },
  {
    path: "/sun",
    name: "Солярий",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "wb_sunny",
    component: SunPage,
    layout: "/admin"
  },
  {
    path: "/certificate",
    name: "Сертификаты",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "card_giftcard",
    component: CertificatePage,
    layout: "/admin"
  },
  {
    path: "/table",
    name: "Table List",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: TableList,
    layout: "/admin"
  },
  {
    path: "/typography",
    name: "Typography",
    rtlName: "طباعة",
    icon: LibraryBooks,
    component: Typography,
    layout: "/admin"
  },
  {
    path: "/icons",
    name: "Icons",
    rtlName: "الرموز",
    icon: BubbleChart,
    component: Icons,
    layout: "/admin"
  },
  {
    path: "/maps",
    name: "Maps",
    rtlName: "خرائط",
    icon: LocationOn,
    component: Maps,
    layout: "/admin"
  },
  {
    path: "/notifications",
    name: "Notifications",
    rtlName: "إخطارات",
    icon: Notifications,
    component: NotificationsPage,
    layout: "/admin"
  },
  {
    path: "/upgrade-to-pro",
    name: "Upgrade To PRO",
    rtlName: "التطور للاحترافية",
    icon: Unarchive,
    component: UpgradeToPro,
    layout: "/admin"
  }
  // {
  //   path: "/rtl-page",
  //   name: "RTL Support",
  //   rtlName: "پشتیبانی از راست به چپ",
  //   icon: Language,
  //   component: RTLPage,
  //   layout: "/rtl"
  // }
];

export default dashboardRoutes;
