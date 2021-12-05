import { IData } from './../view/appView';

import AppLoader from './appLoader'
type CallbackType <T> = (data?: T) => void

type GetResp={
    endpoint:string,
}
class AppController extends AppLoader {
    getSources(callback:CallbackType<IData>) {
        super.getResp(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    getNews(e:Event, callback:CallbackType<IData>) {
        let target: HTMLDivElement = e.target as HTMLDivElement
        const newsContainer= <HTMLElement>e.currentTarget ;

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId:string|null = target.getAttribute('data-source-id') ;
                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentNode as HTMLDivElement;
        }
    }
}

export default AppController;
