import { twMerge } from "tailwind-merge";

function SearchBar() {
   return <div>SearchBar</div>;
}

function NavSearchBar({ className }: { className?: string }) {
   return (
      <div>
         <button
            className={twMerge(
               `flex gap-1 items-center text-sm opacity-60 hover:opacity-100`,
               className
            )}
         >
            <span className="pi pi-search"></span>
            <span>Search</span>
            <span className="border border-stone-200 py-1 px-2 rounded-lg">
               ⌘ + K
            </span>
         </button>
      </div>
   );
}

export { SearchBar, NavSearchBar };
