import { Route, Routes } from 'react-router-dom';
import BaseComponent from '../templateTech/baseClasses/BaseComponent';
import Login from '../templateTech/APITemplates/login';
import Register from '../templateTech/APITemplates/register';
class Router extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            routes: [],
            loginComp: Login,
            registerComp: Register
        }
    }
    addToRouter(route) {
        let routes = [...this.state.routes, route];
        this.setState({ routes: routes })
    }

    getRouteMap(routes, props) {

        let mapp = <></>;
        if (routes) {
            routes = [...routes];


            mapp = routes?.map((obj, index) => {
                if (!obj.path) {
                    obj.path = this.classNameToString(obj.comp);
                    if(index===0){
                        obj.path="/"
                    }
                }
                return <>
                    <Route path={obj.path} element={<obj.comp props={{ ...props, ...obj.props }} />} />
                    <Route path={obj.path + "/:id"} element={<obj.comp props={{ ...props, ...obj.props }} />} />
                </>
            }
            )
        }
        return mapp
    }

    getRoutes(routes, props) {

        let renderRoutes = <Routes>
            {this.getRouteMap(routes, props)}
            {this.state.routes.map((r, index) =>
                <>{r}</>
            )}
        </Routes>;
        if (!this.app?.state.currentUser) {
            renderRoutes = this.getUserAuthRoutes(props);
        }
        return renderRoutes;
    }

    getUserAuthRoutes(props) {
        let LoginComp = props.loginComp || this.state.loginComp;
        let RegisterComp = props.registerComp || this.state.registerComp;
        let routes = <Routes>
            <Route path={"/"} element={<LoginComp props={{ ...props }} />} />
            <Route path={"/login"} element={<LoginComp props={{ ...props }} />} />
            <Route path={"/register"} element={<RegisterComp props={{ ...props }} />} />
        </Routes>;
        return routes
    }

    getHtml() {

        let props = { ...this.props };
        props.app = this.app;
        let state = this.app?.state;
        let routes = this.props.routes || state?.routes;
        let renderRoutes = this.getRoutes(routes, props);

        return (
            <>{renderRoutes}</>
        );
    }
}


export default Router;



