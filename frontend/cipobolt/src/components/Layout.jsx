const Layout = ({children}) =>{
    return(
        <>
        <nav className="navbar navbar-expand-sm bg-dark">
                <div className="container-fluid">
                        <ul className="navbar-nav">
                                <img src="logo.png" alt=""/>
                                <li className="nav-item">
                                        <a className="nav-link" href="#">Főoldal</a>
                                </li>
                                <li className="nav-item">
                                        <a className="nav-link" href="#">Új márka</a>
                                </li>
                                <li className="nav-item">
                                        <a className="nav-link" href="#">Új cipő</a>
                                </li>
                        </ul>
                </div>
        </nav>

        <header></header>

        <main>
            {children}
        </main>

        <footer>Györei Balázs</footer>
        </>
    )
}

export default Layout;