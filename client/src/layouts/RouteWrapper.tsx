import { FC } from 'react'
import { Route, useHistory } from 'react-router-dom'

import styles from './Layouts.module.scss'

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
    const history = useHistory();

    if (!rest.path) {
        history.push('/')
        return <div className={styles.preloader} data-testid="preloader" />
    }
    
    return (
        <Route {...rest} render={(props) =>
            <Layout {...props}>
                <Component {...props} />
            </Layout>
        } />
    );
}