import { useLocation } from "react-router-dom";

export type NotFoundProps = object;

export const useNotFound = (props: NotFoundProps) => {
  const location = useLocation();

  return {
    ...props,
    path: location.pathname,
  };
};
