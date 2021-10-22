import React from 'react';
import styles from './Error.module.scss'

interface ErrorProps {
    text: string
}

const Error = ({ text }: ErrorProps) => {
    return (
        <div className={styles.error}>
            <div className={styles.ribbon} />
            <div className={styles.content}>
                <div className={styles.title}>Error occurred:</div>
                <div className={styles.text}>{text}</div>
            </div>
        </div>
    )
}

export default Error