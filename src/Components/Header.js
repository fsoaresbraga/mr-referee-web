    import React from 'react'
    import Styles from './Header.module.css'
    import {Link} from 'react-router-dom'
    import Logo from '../Assets/logo.png'
    
    
    import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
    import { faArrowRight } from '@fortawesome/free-solid-svg-icons';




    export const Header = () => {
       /*  return (
            <header className={Styles.header}>
                <nav className={`${Styles.nav} container`}>
                    <Link to="/" className={Styles.logo}>
                         <img src={Logo} alt="Parlamentar - Logo"/>
                    </Link>
                    <Link to="/parliamentaries" className={Styles.navLinks}>Ver Parlamentares</Link>
                </nav>
            </header>
        ) */
        return(
        <>
            <nav className="navbar navbar-marketing navbar-expand-lg bg-transparent navbar-dark fixed-top">
                <div className="container">
                    <Link to="/" className={Styles.logo}>
                         <img src={Logo} alt="Parlamentar - Logo"/>
                    </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><i data-feather="menu"></i></button>
                    <Link to="/parliamentaries" className="btn-teal btn rounded-pill px-4 ml-lg-4">Ver Parlamentares <FontAwesomeIcon icon={faArrowRight}/></Link>
                </div>
            </nav>
            
            
        </>
        )
    }
    