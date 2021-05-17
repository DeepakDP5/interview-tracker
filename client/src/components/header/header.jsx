import React from 'react';

import './header.scss';

const Header = () =>{
    return(
      <header className = 'header'>

        <div className = 'container'>

            <div className = 'logo'>
                <a href = '/'> <img src = "" alt = 'Hello' />  Interview Tracker </a>
            </div>

            <div className = 'nav'>
                <a className = 'nav-element' href = '/'> Login</a>
                <a className = 'nav-element' href = '/'> Logout </a>
                <a className = 'nav-element' href = '/'><img scr = '' alt = 'hello' /></a>
            </div>

        </div>
        
      </header>
    );
};

export default Header;