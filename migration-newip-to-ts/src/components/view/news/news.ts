import { IData } from '../appView';
import './news.css';

export interface INewsItem{
    urlToImage:string,
    author:string,
    source:{
        name:string
    },
    publishedAt:string,
    title:string,
    description:string,
    url:string
}


class News {
    draw(data:INewsItem[]) {
        const news = data.length >= 10 ? data.filter((_item:INewsItem, idx:number) => idx < 10) : data;

        const fragment = document.createDocumentFragment() ;
        const newsItemTemp = document.querySelector('#newsItemTemp') as HTMLTemplateElement;

        news.forEach((item:INewsItem, idx:number) => {
            const newsClone =newsItemTemp.content.cloneNode(true) as HTMLElement;

            if (idx % 2) (newsClone.querySelector('.news__item') as HTMLElement).classList.add('alt');

            (newsClone.querySelector('.news__meta-photo') as HTMLElement).style.backgroundImage = `url(${
                item.urlToImage || 'img/news_placeholder.jpg'
            })`;
            (newsClone.querySelector('.news__meta-author') as HTMLElement).textContent = item.author || item.source.name;
            (newsClone.querySelector('.news__meta-date') as HTMLElement).textContent = item.publishedAt
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('-');

            (newsClone.querySelector('.news__description-title') as HTMLElement).textContent = item.title;
            (newsClone.querySelector('.news__description-source') as HTMLElement).textContent = item.source.name;
            (newsClone.querySelector('.news__description-content') as HTMLElement).textContent = item.description;
            (newsClone.querySelector('.news__read-more a') as HTMLElement).setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        (document.querySelector('.news') as HTMLElement).innerHTML  = '';
        (document.querySelector('.news') as HTMLElement).appendChild(fragment);
    }
}

export default News;
