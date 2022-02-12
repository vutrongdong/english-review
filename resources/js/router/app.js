import { Route, Switch } from 'react-router-dom';
import { ENV } from '@/constants/config' 
import { routes } from '@/router/routes';

const RouterViewApp = () => {
    const routeList = routes.map((route, index) => {
        return (
            <Route 
                exact={route.exact} 
                path={`${ENV.PREFIX_URL}/${route.path}`} 
                component={route.component}
                key={index}
            />
        )
    })
    return (
        <div className="RouterViewApp content-wrapper">
            <div className="content">
                <Switch>
                    { routeList }
                </Switch>
            </div>
        </div>
    )
}

export default RouterViewApp;