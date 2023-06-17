import React from 'react';
import './header.scss'
import {ReactComponent as ExitSVG} from "../../img/exit.svg";

const Header = () => {

  const name = 'Первая комната'
  const count = 2

  return (
    <div className='header'>
        <h2>{name}</h2>
        <p>{count} участника</p>
      <div className="header__exit">
        <ExitSVG/>
      </div>

    </div>
  )
    ;
};

export default Header;