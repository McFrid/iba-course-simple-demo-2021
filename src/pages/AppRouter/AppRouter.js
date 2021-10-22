import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from '../../components/Home';
import { HOME_URL } from '../sitemap';
import styles from './AppRouter.module.scss'

const AppRouter = () => {
    return (
        <Router>
            <main className={styles.content}>
                <header className={styles.header}>
                    <h2 className={styles.title}>Demo app</h2>
                    <h4 className={styles.description}>Table is filled with initial data on page reload</h4>
                </header>
                <section className={styles.body}>
                    <Switch>
                        <Route exact path={HOME_URL} component={Home}/>
                    </Switch>
                </section>
                <footer className={styles.footer}></footer>
            </main>
        </Router>
    )
}

export default AppRouter