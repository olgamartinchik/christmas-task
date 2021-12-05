import './sources.css';
import { IData } from '../appView';
type SourceItem={
    name:string|null,
    id:number
}

class Sources {
    draw(data:SourceItem[]):void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLElement;

        data.forEach((item) => {

     const sourceClone = sourceItemTemp.content.cloneNode(true);

           sourceClone.querySelector('.source__item-name').textContent = item.name;
            sourceClone.querySelector('.source__item').setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);

           
        });

        (document.querySelector('.sources') as HTMLElement).append(fragment);
    }
}

export default Sources;
