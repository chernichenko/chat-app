import { FC } from 'react'
import { Field } from 'formik'
import cn from 'classnames'

import styles from './InputForm.module.scss'

interface IInputFormProps {
  readonly name: string
  readonly type?: string
  readonly placeholder?: string
  readonly extraClass?: string
}

interface IInputRender {
  readonly field: any
  readonly meta: any
}

export const InputForm: FC<IInputFormProps> = ({ name, type = 'text', placeholder = '', extraClass = '' }) => {
  const isFile = type === 'file'

  const inputRender: FC<IInputRender> = ({ field, meta }) => {
    if (isFile) {

    }
    return (
      <div className={cn(styles.inputWrapper, extraClass)}>
        <input
          id={isFile ? 'file' : null}
          className={cn(styles.input, {
            [styles.error]: meta.touched && meta.error,
            [styles.file]: isFile,
          })}
          type={type}
          placeholder={placeholder}
          {...field}
        />
        {isFile && (
          <label className={styles.label} htmlFor={'file'}>{field.value ? 'Photo added successfuly' : 'Add photo +'}</label>
        )}
        {meta.touched && meta.error && (
          <div className={styles.errorMessage}>{meta.error}</div>
        )}
      </div>
    )
  }

  return (
    <Field name={name}>
      {inputRender}
    </Field>
  )
}
