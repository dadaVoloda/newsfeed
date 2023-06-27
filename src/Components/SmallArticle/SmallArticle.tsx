import React, {FC} from "react";

import './SmallArticle.css'
import {Article} from "../../types";
import {beautifyDate} from "../../utils";

interface Props {
    item: Article
    source: string
    onClick: () => void
}

export const SmallArticle: FC<Props> = ({item, source, onClick}) => {
    return (
        <article className="small-article" onClick={onClick}>
            <h2 className="small-article__title">{item.title}</h2>
            <p className="small-article__caption">
                <span className="article-date small-article__date">{beautifyDate(item.date)}</span>
                <span className="article-source small-article__source">{source}</span>
            </p>
        </article>
    )
}
