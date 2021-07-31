import React, { FC } from 'react'
import cn from 'classnames'

import styles from './Button.module.scss'

interface IButtonProps {
    readonly children: React.ReactNode
    readonly isPrimary?: boolean
    readonly onClick?: () => void
    readonly disabled?: boolean
    readonly type?: "button" | "submit" | "reset" | undefined
}

export const Button: FC<IButtonProps> = ({ children, isPrimary = true, onClick, disabled, type = 'button' }) => {
    return (
        <button
            className={cn(styles.button, {
                [styles.primary]: isPrimary,
                [styles.secondary]: !isPrimary,
            })}
            onClick={onClick}
            disabled={disabled}
            type={type}
        >
            {children}
        </button>
    )
}