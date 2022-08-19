import { createContext } from 'react';

export const dasboardState = {
  expandedItems: [],
  isOpen: true,
};

export const DashboardContext = createContext(dasboardState);
