function SearchBar() {
   return <div>SearchBar</div>;
}

function NavSearchBar() {
   return (
      <div>
         <button className="flex gap-1 items-center text-sm opacity-60 hover:opacity-100">
            <span className="pi pi-search"></span>
            <span>Search</span>
            <span className="border border-stone-200 py-1 px-2 rounded-lg">⌘ + K</span>
         </button>
      </div>
   );
}

export { SearchBar, NavSearchBar };