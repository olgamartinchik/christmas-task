import { IData } from '../view/appView';

import AppLoader from './appLoader';

export type CallbackType<T> = (data?: T) => void;
class AppController extends AppLoader {
    public getSources(callback: CallbackType<IData>): void {
        super.getResp(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    public getNews(e: Event, callback: CallbackType<IData>): void {
        let target: HTMLDivElement = e.target as HTMLDivElement;
        const newsContainer = <HTMLElement>e.currentTarget;

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                target.classList.add('active');
                const sourceId: string = <string>target.getAttribute('data-source-id');
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
