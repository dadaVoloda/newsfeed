import React, {FC} from "react";

import {Navigation} from "../Navigation/Navigation";

import './Footer.css'
import {Category} from "../../utils";

interface Props {
    category: Category
    onNavClick: (e: React.MouseEvent<HTMLElement>, category: Category) => void
}

export const Footer: FC<Props> = (props) => {
    return (
        <footer className="footer">
            <div className="container">
                <Navigation placement={'footer'} {...props}/>
                <div className="footer__bottom">
                    <p className="footer__text">
                        Сделано на Frontend курсе в
                        <a className="footer__link" href="https://karpov.courses/frontend"
                           target="_blank">Karpov.Courses</a>
                    </p>
                    <p className="footer__text footer__text--gray">© 2021</p>
                </div>
            </div>
        </footer>
    )
}
