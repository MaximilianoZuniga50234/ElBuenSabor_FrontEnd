import { withAuthenticationRequired } from "@auth0/auth0-react";
import Loader from "../loader/Loader";
type Props = {
  component: React.ComponentType<object>;
};

export const AuthenticationGuard = ({ component }: Props) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => <Loader />,
  });

  return <Component />;
};
