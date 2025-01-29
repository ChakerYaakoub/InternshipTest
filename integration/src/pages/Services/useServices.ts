import { serviceData } from "../../data/data";
import { useState, useEffect } from "react";

export type ServicesProps = object;

export const useServices = (props: ServicesProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(serviceData);

  useEffect(() => {
    // Simulate API call Start
    const timer = setTimeout(() => {
      setData(serviceData);
      // Loading for 1 second for testing purposes
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return {
    ...props,
    serviceData: data,
    isLoading,
  };
};
