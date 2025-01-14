const routes = {
   home: "/",
   search: "search",
   saved: "saved",
   book: "book/:bookId",
   settings: "settings",
   read: (bookId: string) => `book/${bookId}`
};

export { routes };
