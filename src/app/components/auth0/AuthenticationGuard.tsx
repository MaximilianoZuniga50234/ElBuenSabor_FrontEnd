import { withAuthenticationRequired } from "@auth0/auth0-react";
import "./authenticationGuard.css"
type Props = {
    component: React.ComponentType<object>;
};

export const AuthenticationGuard = ({ component }: Props) => {
    const Component = withAuthenticationRequired(component, {
        onRedirecting: () => (

            <div className="redirecter__container">
                <div className="redirecter__spinner" >
                    <div className="redirecter__item redirecter__item-1"></div>
                    <div className="redirecter__item redirecter__item-2"></div>
                    <div className="redirecter__item redirecter__item-3"></div>
                    <div className="redirecter__item redirecter__item-4"></div>
                </div >
                <h4 className="redirecter__h4">Cargando...</h4>
            </div >
        ),
    });

    return <Component />;
};