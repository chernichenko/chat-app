import { FC } from 'react'
import { Route } from 'react-router-dom'

interface IRouteWrapper {
    readonly component: any
    readonly layout?: any
    readonly path?: string | undefined
    readonly exact?: boolean
}

export const RouteWrapper: FC<IRouteWrapper> = ({
    component: Component,
    layout: Layout,
    ...rest
}) => {
    return (
        <Route {...rest} render={(props) =>
            <Layout {...props}>
                <Component {...props} />
            </Layout>
        } />
    );
}