import React from "react";

import {Articles} from "../Articles/Articles";
import {Header} from "../Header/Header";
import {Footer} from "../Footer/Footer";
import {ArticleItem} from "../ArticleItem/ArticleItem";

import {Category, categoryIds} from "../../utils";

import {NewsApi} from "../../types";

import './App.css'

export const App = () => {
    const [category, setCategory] = React.useState<Category>('index')
    const [articles, setArticles] = React.useState<NewsApi>({items: [], categories: [], sources: []})
    const [articleId, setArticleId] = React.useState<number | null>(null)

    const onNavClick = (e: React.MouseEvent<HTMLElement>, category: Category) => {
        e.preventDefault()
        setArticleId(null)

        if (category) setCategory(category)
    }

    const onArticleClick = (id: number) => {
        console.log(id)
        setArticleId(id)
    }

    React.useEffect(() => {
        fetch('https://frontend.karpovcourses.net/api/v2/ru/news/' + (categoryIds[category] || ''))
            .then(response => response.json())
            .then((data: NewsApi) => {
                setArticles(data)
            })
    }, [category])

    return (
        <>
            <Header category={category} onNavClick={onNavClick}/>
            <main className="main">
                {articleId
                    ? <ArticleItem id={articleId} categories={articles.categories} sources={articles.sources}
                                   onArticleClick={onArticleClick}/>
                    : <Articles articles={articles} onArticleClick={onArticleClick}/>
                }
            </main>
            <Footer category={category} onNavClick={onNavClick}/>
        </>
    )
}
