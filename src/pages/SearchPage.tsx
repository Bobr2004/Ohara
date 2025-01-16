import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { InputField } from "../components/InputField";

function SearchPage() {
   const location = useLocation();
   const isSearchFocused = location.state?.isSearchFocused;

   const [searchVal, setSearchVal] = useState("");

   useEffect(() => {
      if (isSearchFocused) document.getElementById("searchBar")?.focus();
   }, [isSearchFocused]);
   return (
      <>
         <h1 className="font-montserrant text-2xl text-center my-4 font-semibold px-4">
            Settings
         </h1>
         <section className="mx-auto container px-4">
            <InputField
               type="text"
               title="Search"
               id="searchBar"
               value={searchVal}
               onChange={({ target }) => setSearchVal(target.value)}
            />
         </section>
      </>
   );
}

export { SearchPage };
