import News, { INewsItem } from './news/news';
import Sources, { ISourceItem } from './sources/sources';

export interface IData {
    articles?: INewsItem[];
    sources?: ISourceItem[];
}
export class AppView {
    news: News;

    sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: IData):void {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data: IData):void {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
