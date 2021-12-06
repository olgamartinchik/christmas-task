import { IData } from '../view/appView';
import { CallbackType } from './controller';

export type ArgLoader = {
    method?: string;
    endpoint: string;
    callback?: CallbackType<IData>;
    options?: object;
};

enum ErrorStatus {
    Unauthorized = 401,
    PaymentRequired,
    ForBindden,
    NotFound,
}
class Loader {
    readonly baseLink: string;

    readonly options: object;

    constructor(baseLink: string, options: object = {}) {
        this.baseLink = baseLink;
        this.options = options;
    }

    public getResp(
        { endpoint, options = {} }: ArgLoader,
        callback: CallbackType<IData> = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load('GET', endpoint, callback, options);
    }

    protected errorHandler(res: Response): Response | never {
        if (!res.ok) {
            if (res.status === ErrorStatus.Unauthorized || res.status === ErrorStatus.NotFound)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    public makeUrl(endpoint: string, options: object): string {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        (Object.keys(urlOptions) as Array<keyof typeof urlOptions>).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    public load(method: string, endpoint: string, callback: CallbackType<IData>, options: object = {}): void {
        fetch(this.makeUrl(endpoint, options), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
