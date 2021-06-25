// HOC/withAuth.jsx
import { useRouter } from "next/router";

export const withAuth = (WrappedComponent) => {
  return (props) => {
    // checks whether we are on client / browser or server.
    if (typeof window !== "undefined") {
      const Router = useRouter();

      const accessToken = localStorage.getItem("jwtToken");

      // If there is no access token we redirect to "/" page.
      if (!accessToken) {
        Router.push("/auth/login");
        return null;
      }

      // If this is an accessToken we just render the component that was passed with all its props

      return <WrappedComponent {...props} />;
    }

    // If we are on server, return null
    return null;
  };
};

export const withAuthSigned = (WrappedComponent) => {
  return (props) => {
    // checks whether we are on client / browser or server.
    if (typeof window !== "undefined") {
      const Router = useRouter();
      const accessToken = localStorage.getItem("jwtToken");

      // If there is no access token we redirect to "/" page.
      if (accessToken) {
        Router.push("/dashboard");
        return null;
      }

      // If this is an accessToken we just render the component that was passed with all its props

      return <WrappedComponent {...props} />;
    }

    // If we are on server, return null
    return null;
  };
};
