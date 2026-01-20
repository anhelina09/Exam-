import classes from './header.module.css'

export const Header = () => {


    return (
        <header className={classes.container}>
            <div className={classes.title}>colors</div>
            <div className={classes.menu}>
                <div>tools</div>
                <div>go pro</div>
            </div>
        </header>
    )
}