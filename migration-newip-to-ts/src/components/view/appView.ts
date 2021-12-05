import News from './news/news';
import Sources from './sources/sources';

export interface IData{
    articles?:string|string[],
    sources?:string|string[]
}


export class AppView {
    news:  News
    sources:Sources
    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data:IData) {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data:IData) {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
