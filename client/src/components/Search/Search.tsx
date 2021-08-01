import { useState, useCallback, FC } from 'react'

import styles from './Search.module.scss'
import searchSvg from 'assets/icons/search.svg'

interface ISearch {
    readonly initialDialogs: any
    readonly setDialogs: any
}

export const Search: FC<ISearch> = ({ initialDialogs, setDialogs }) => {
    const [search, setSearch] = useState('')

    const changeHandler = useCallback((e: any) => {
        const value = e.target.value

        if (value) {
            setDialogs((dialogs: any) => {
                let currentDialogs = [...dialogs]
                if (!dialogs.length) {
                    currentDialogs = [...initialDialogs]
                }
                return currentDialogs.filter((dialog: any) => {
                    return dialog.userTo.name.toLowerCase().includes(value.toLowerCase())
                })
            })
        } else {
            setDialogs(initialDialogs)
        }
        
        setSearch(value)
    }, [initialDialogs])

    return (
        <div className={styles.wrap}>
            <input
                placeholder="Enter user name"
                type="text"
                name="search"
                value={search}
                onChange={changeHandler}
            />
            <div className={styles.search}>
                <img src={searchSvg} alt="search" />
            </div>
        </div>
    )
}
