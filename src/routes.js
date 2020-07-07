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
import SunPage from "views/Sun";
import TillPage from "views/Till";
import CertificatePage from "views/Certificate";
import Template from "views/MixedPay/index";
import TableList from "views/TableList/TableList.jsx";
import Typography from "views/Typography/Typography.jsx";
import Icons from "views/Icons/Icons.jsx";
import Maps from "views/Maps/Maps.jsx";
import NotificationsPage from "views/Notifications/Notifications.jsx";
import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.jsx";
import React from "react";
// core components/views for RTL layout
// import RTLPage from "views/RTLPage/RTLPage.jsx";

import Picker from "./components/Inputs/Picker";
import Masters from "./views/Masters";
import Catalog from "./views/Catalog";

import Fingerprint from "@material-ui/icons/Fingerprint";
import LoginPage from "views/LoginPage";

const newCal = () => <CalendarPage/>;
const newShop = () => <ShopPage/>;
const newTill = () => <TillPage/>;
const newSun = () => <SunPage/>;
const newCertificate = () => <CertificatePage/>;
const newMasters = () => <Masters/>;
const newCatalog = () => <Catalog/>;
const newLogin = () => <LoginPage/>;

const CustomComponent = () => {
  return (
    <div>Custom</div>
  );
};

export const dashboardRoutes = [
  // {
  //   path: "/dashboard",
  //   name: "Dashboard",
  //   rtlName: "لوحة القيادة",
  //   icon: Dashboard,
  //   component: DashboardPage,
  //   layout: "/admin"
  // },
  {
    path: "/calendar",
    name: "Запись Клиентов",
    rtlName: "لوحة القيادة",
    icon: "query_builder",
    component: newCal,
    layout: "/admin",
    access: "ROLE_USER"
  },
  {
    path: "/shop",
    name: "Каталог",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "shopping_cart",
    component: newShop,
    layout: "/admin",
    access: "ROLE_USER"
  },
  {
    path: "/wallet",
    name: "Касса",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "account_balance_wallet",
    component: newTill,
    layout: "/admin",
    access: "ROLE_USER"
  },
  {
    path: "/sun",
    name: "Абонементы",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "wb_sunny",
    component: newSun,
    layout: "/admin",
    access: "ROLE_USER"
  },
  {
    path: "/certificate",
    name: "Сертификаты",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "card_giftcard",
    component: newCertificate,
    layout: "/admin",
    access: "ROLE_USER"
  },
  {
    path: "/master",
    name: "Мастера",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "face",
    component: newMasters,
    layout: "/admin",
    access: "ROLE_ADMIN"
  },
  {
    path: "/catalog",
    name: "Редактирование услуг",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "folder-special",
    component: newCatalog,
    // component: newTemplate,
    layout: "/admin",
    access: "ROLE_ADMIN"
  }


  // {
  //   path: "/login-page",
  //   name: "Login Page",
  //   rtlName: "ملف تعريفي للمستخدم",
  //   icon: Fingerprint,
  //   component: newLogin,
  //   // component: newTemplate,
  //   layout: "/admin"
  // }

  // path: "/login-page",
  // name: "Login Page",
  // short: "Login",
  // layout: "/admin",
  // mini: "LP",
  // icon: Fingerprint,
  // component: LoginPage


  // {
  //   path: "/table",
  //   name: "Table List",
  //   rtlName: "قائمة الجدول",
  //   icon: "content_paste",
  //   component: TableList,
  //   layout: "/admin"
  // },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   rtlName: "طباعة",
  //   icon: LibraryBooks,
  //   component: Typography,
  //   layout: "/admin"
  // },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   rtlName: "الرموز",
  //   icon: BubbleChart,
  //   component: Icons,
  //   layout: "/admin"
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   rtlName: "خرائط",
  //   icon: LocationOn,
  //   component: Maps,
  //   layout: "/admin"
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   rtlName: "إخطارات",
  //   icon: Notifications,
  //   component: NotificationsPage,
  //   layout: "/admin"
  // },
  // {
  //   path: "/upgrade-to-pro",
  //   name: "Upgrade To PRO",
  //   rtlName: "التطور للاحترافية",
  //   icon: Unarchive,
  //   component: UpgradeToPro,
  //   layout: "/admin"
  // }
  // {
  //   path: "/rtl-page",
  //   name: "RTL Support",
  //   rtlName: "پشتیبانی از راست به چپ",
  //   icon: Language,
  //   component: RTLPage,
  //   layout: "/rtl"
  // }
];

export const adminRoutes = [
  {
    path: "/master",
    name: "Мастера",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "face",
    component: newMasters,
    layout: "/admin",
    access: ["ROLE_ADMIN"]
  },
  {
    path: "/catalog",
    name: "Редактирование услуг",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "folder-special",
    component: newCatalog,
    // component: newTemplate,
    layout: "/admin",
    access: ["ROLE_ADMIN"]
  }
];
