import React, {  createContext, useContext, useState } from "react";
import { HomePageProps, Login } from "../types/types";
import {
  useContext as useCustomContext,
  useEffect,
} from "react";

const FilterContext = createContext<{
  filteredUsers: HomePageProps[];
  setFilteredUsers: React.Dispatch<React.SetStateAction<HomePageProps[]>>;
} | null>(null);

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [filteredUsers, setFilteredUsers] = useState<HomePageProps[]>(
    () => {
      const storedData = localStorage.getItem("filteredUsers");
      return storedData ? JSON.parse(storedData) : [];
    }
  );

  useEffect(() => {
    localStorage.setItem("filteredUsers", JSON.stringify(filteredUsers));
  }, [filteredUsers]);
  return (
    <FilterContext.Provider value={{ filteredUsers, setFilteredUsers }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("error");
  }
  return context;
};
type ContextValueType = {
  fave: any[];
  addFaveEl: (salon: any) => void;
  removeFaveEl: (id: any) => void;
};

const Context = createContext<ContextValueType | null>(null);

export const useAppContext = () => {
  const contextApp = useCustomContext(Context);
  if (!contextApp) {
    throw new Error("Context not provided");
  }
  return contextApp;
};

export const ContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [fave, setFave] = useState<string[]>([]);
  const loggedInUser = localStorage.getItem("loggedUser");

  useEffect(() => {
    if (loggedInUser) {
      const storage = localStorage.getItem(`fave_${loggedInUser}`);
      if (storage) {
        setFave(JSON.parse(storage));
      }
    }
  }, [loggedInUser]);

  const addFaveEl = (id: string) => {
    if (loggedInUser) {
      setFave((prevFave) => {
        const newFave = [...prevFave, id];
        localStorage.setItem(`fave_${loggedInUser}`, JSON.stringify(newFave));
        return newFave;
      });
    }
  };

  const removeFaveEl = (id: string) => {
    if (loggedInUser) {
      setFave((prevFave) => {
        const newFave = prevFave.filter((el) => el !== id);
        localStorage.setItem(`fave_${loggedInUser}`, JSON.stringify(newFave));
        return newFave;
      });
    }
  };

  const contextValue: ContextValueType = {
    fave,
    addFaveEl,
    removeFaveEl,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};


const FiltersSlider = createContext<{
  filters: HomePageProps[]; 
  setFilters: React.Dispatch<React.SetStateAction<HomePageProps[]>>;
} | null>(null);


export const FiltersSliderProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [filters, setFilters] = useState<HomePageProps[]>([]);

  return (
    <FiltersSlider.Provider value={{ filters, setFilters }}>
      {children}
    </FiltersSlider.Provider>
  );
};

export const useFilterSliderContext = () => {
  const context = useContext(FiltersSlider);
  if (!context) {
    throw new Error("error");
  }
  return context;
};