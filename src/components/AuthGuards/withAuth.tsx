import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const withAuth = (Component: React.FC) => {
  const AuthenticatedComponent: React.FC = () => {
    const router = useRouter();
    const isAuthenticated = useSelector((state: any) => state.auth.clientToken);

    useEffect(() => {
      if (!isAuthenticated) {
        router.replace("/auth/sign-in");
      }
    }, [isAuthenticated, router]);

    if (isAuthenticated) {
      return <Component />;
    }

    return null;
  };

  return AuthenticatedComponent;
};

export default withAuth;
