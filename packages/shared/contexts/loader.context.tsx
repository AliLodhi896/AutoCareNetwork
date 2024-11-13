import React from "react";

const defaultValues = {
  toggle: () => {
    // eslint-disable-next-line no-console
    console.warn("toggleLoad is not implemented");
  },
};
const LoaderContext = React.createContext(defaultValues);

export default LoaderContext;

export function useLoader() {
  const context = React.useContext(LoaderContext);
  if (context === undefined) {
    throw new Error(
      "useLoaderContext must be used within a LoaderContextProvider"
    );
  }
  return context;
}
