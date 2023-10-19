import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const withGuest = (Component: React.FC) => {
  const NonAuthenticatedComponent: React.FC = () => {
    const router = useRouter();
    const isAuthenticated = useSelector((state: any) => state.auth.clientToken);

    useEffect(() => {
      if (isAuthenticated) {
        router.replace("/blog/");
      }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) {
      return <Component />;
    }

    return null;
  };

  return NonAuthenticatedComponent;
};

export default withGuest;
