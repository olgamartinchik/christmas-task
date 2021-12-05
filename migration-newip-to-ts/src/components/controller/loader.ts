import { IData } from './../view/appView';
import { CallbackType } from './controller';
interface ILoder{
    baseLink:string
    options:object
}
export type ArgLoader={
    endpoint?:string, 
    options?:object,
    callback?:void
}
interface IOptions{
    [key:string]:string
}
enum ErrorStatus{
    Unauthorized=401,
    PaymentRequired,
    ForBindden,
    NotFound
}
// callback:CallbackType<IData>
class Loader {
    baseLink:string;
    options:object
    constructor(baseLink:string, options:object={}) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp(
        { endpoint, options = {} }:ArgLoader,
        callback:CallbackType<IData> = () => {
            console.error('No callback for GET response');
        }
    ) {
        this.load('GET', endpoint, callback, options);
    }

    errorHandler(res:Response) {
        if (!res.ok) {
            if (res.status === ErrorStatus.Unauthorized || res.status === ErrorStatus.NotFound)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(endpoint:string,options:IOptions, ):string {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        (Object.keys(urlOptions) as Array<keyof typeof urlOptions>).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    load(method:string, endpoint:string, callback:CallbackType<IData>, options:object = {}) {
        fetch(this.makeUrl(endpoint, options ), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
// (Object.keys(urlOptions) as Array<keyof typeof urlOptions>)