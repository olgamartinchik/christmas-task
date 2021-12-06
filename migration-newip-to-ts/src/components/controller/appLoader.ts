import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        // 'https://newsapi.org/v2/'

        super('https://nodenews.herokuapp.com/', {
            apiKey: '18a99e8b6b20446fb74f701d4d8cf9d7', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
