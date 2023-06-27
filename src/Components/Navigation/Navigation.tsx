import React, {FC} from "react";

import './Navigation.css'
import {Category} from "../../utils";

import logo from '../../images/logo.svg'

type LinkName = 'Главная' | 'Мода' | 'Технологии' | 'Политика' | 'Спорт'

interface Link {
    name: LinkName
    path: Category
}

interface Props {
    category: Category
    placement?: 'header' | 'footer'
    onNavClick: (e: React.MouseEvent<HTMLElement>, category: Category) => void
}

export const Navigation: FC<Props> = ({category, onNavClick, placement = 'header'}) => {
    const links: Link[] = [
        {name: 'Главная', path: 'index'},
        {name: 'Мода', path: 'fashion'},
        {name: 'Технологии', path: 'tech'},
        {name: 'Политика', path: 'politics'},
        {name: 'Спорт', path: 'sport'},
    ]
    return (
        <nav className={`navigation grid navigation--${placement}`}>
            <a className="navigation__logo" href="#" onClick={(e) => onNavClick(e, 'index')}>
                <img className="navigation__image" src={logo} alt="Логотип"/>
            </a>
            <ul className="navigation__list">
                {links.map(link => (
                    <li className="navigation__item" key={link.name}>
                        <a href={link.path} onClick={(e) => onNavClick(e, link.path)}
                           className={`navigation__link ${link.path === category ? 'navigation__link--active' : ''}`}>{link.name}</a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
