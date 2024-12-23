import { Link } from "react-router";
import { routes } from "../config/routes";

function NotFoundPage() {
   return (
      <div className="mx-auto p-4 container">
         <h1>404 Page Not Found</h1>
         <p>
            <Link to={routes.home}>Home</Link>
         </p>
      </div>
   );
}

export {NotFoundPage};
