import React, {FC} from "react";

import {Navigation} from "../Navigation/Navigation";

import './Header.css'
import {Category} from "../../utils";

interface Props {
    category: Category
    onNavClick: (e: React.MouseEvent<HTMLElement>, category: Category) => void
}

export const Header: FC<Props> = (props) => {
    return (
        <header className="header">
            <div className="container">
                <Navigation {...props}/>
            </div>
        </header>
    )
}
