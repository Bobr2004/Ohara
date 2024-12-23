import { BrowserRouter, Route, Routes } from "react-router";
import { Layout } from "../layout/Layout";
import { routes } from "../config/routes";

function Router() {
   return (
      <BrowserRouter>
         <Routes>
            <Route path={routes.home} element={<Layout />}>
               <Route index path={routes.home} element={<p>yey</p>} />
               <Route path={routes.search} element={<p>search</p>} />
               <Route path={routes.saved} element={<p>saved</p>} />
               <Route path={routes.book} element={<p>book</p>} />
            </Route>
         </Routes>
      </BrowserRouter>
   );
}

export { Router };
