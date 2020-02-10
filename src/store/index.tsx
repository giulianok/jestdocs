import React from 'react';

import data from 'data/fakeOutput.json';

interface TestData {
  fileName: string;
  filePath: string;
  tests: {
    description: string;
    code: string;
    metadata?: {
      tags?: string[];
    };
  }[];
}

const Context = React.createContext<TestData[]>(data);

interface Props {
  children: any;
}

export const StoreProvider = ({ children }: Props) => {
  return <Context.Provider value={data}>{children}</Context.Provider>;
};

export const useMenu = () => {
  const data = React.useContext(Context);

  return data;
};

export const useTestDetails = (slug: string) => {
  const data = React.useContext(Context);

  return data.find(({ fileName }) => slug === fileName);
};
