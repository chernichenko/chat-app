import { Route } from 'react-router-dom'
import cn from 'classnames'
import { Sidebar, Dialog } from 'components'

import styles from './Main.module.scss'

export const Main = () => {
    return (
        <div className={styles.wrap}>
            <div className={cn(styles.col, styles.col1)}>
                <Sidebar />
            </div>
            <div className={cn(styles.col, styles.col2)}>
                <Route component={Dialog} path="/:userToId" />
            </div>
        </div>
    )
}
