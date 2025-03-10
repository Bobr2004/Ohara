import { BrowserRouter, Route, Routes } from "react-router";
import { Layout } from "../layout/Layout";
import { routes } from "../config/routes";
import { HomePage } from "../pages/HomePage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { ModalProvider } from "./ModalProvider";
import { SettingsPage } from "../pages/SettingsPage";
import { SearchPage } from "../pages/SearchPage";

function Router() {
   return (
      <BrowserRouter>
         <Routes>
            <Route path={routes.home} element={<Layout />}>
               <Route index path={routes.home} element={<HomePage />} />
               <Route path={routes.search} element={<SearchPage/>} />
               <Route path={routes.saved} element={<p>saved</p>} />
               <Route path={routes.settings} element={<SettingsPage />} />
               <Route path={routes.book} element={<p>book</p>} />
               <Route path="*" element={<NotFoundPage />} />
            </Route>
         </Routes>
         <ModalProvider />
      </BrowserRouter>
   );
}

export { Router };
