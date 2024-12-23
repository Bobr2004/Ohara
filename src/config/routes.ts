const routes = {
   home: "/",
   search: "search",
   saved: "saved",
   book: "book/:bookId",
   read: (bookId: string) => `book/${bookId}`
};

export { routes };
