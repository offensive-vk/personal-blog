import React, { useState, createContext, useContext, ReactNode } from "react";

interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

// Create context with default values
const SearchContext = createContext<SearchContextType>({
  searchQuery: "",
  setSearchQuery: () => {},
});

// Provider component
export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Create the context value object
  const contextValue = {
    searchQuery,
    setSearchQuery
  };
  
  // Return the context provider
  return React.createElement(
    SearchContext.Provider,
    { value: contextValue },
    children
  );
}

// Hook to use the search context
export function useSearch() {
  return useContext(SearchContext);
}