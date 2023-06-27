import React, {FC} from "react";

import {MainArticle} from "../MainArticle/MainArticle";
import {SmallArticle} from "../SmallArticle/SmallArticle";

import './Articles.css'
import {NewsApi} from "../../types";

interface Props {
    articles: NewsApi,
    onArticleClick: (id: number) => void
}

export const Articles: FC<Props> = ({articles, onArticleClick}) => {
    return (
        <section className="articles">
            <div className="container grid">
                <section className="articles__big-column">
                    {articles.items.slice(0, 3).map(item => {
                            const category = articles.categories.find(({id}) => id === item.category_id)
                            const source = articles.sources.find(({id}) => id === item.source_id)

                            return (
                                <MainArticle
                                    item={item}
                                    category={category?.name || ''}
                                    source={source?.name || ''}
                                    key={item.id}
                                    onClick={() => onArticleClick(item.id)}
                                />
                            )
                        }
                    )}
                </section>
                <section className="articles__small-column">
                    {articles.items.slice(3, 12).map(item => {
                            const source = articles.sources.find(({id}) => id === item.source_id)
                            return (

                                <SmallArticle
                                    item={item}
                                    source={source?.name || ''}
                                    key={item.id}
                                    onClick={() => onArticleClick(item.id)}
                                />
                            )
                        }
                    )}
                </section>
            </div>
        </section>
    )
}
