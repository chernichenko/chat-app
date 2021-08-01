import { FC } from 'react'
import { Header } from 'components'

import styles from './Layouts.module.scss'

interface IMainLayout {
    readonly children: JSX.Element
}

export const MainLayout: FC<IMainLayout> = ({ children }) => {
    return (
        <div className={styles.wrap}>
            <Header />
            {children}
        </div>
    )
}
