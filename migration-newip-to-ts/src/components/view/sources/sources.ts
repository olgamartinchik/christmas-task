import './sources.css';

type SourceItem={
    name:string|null,
    id:string
}
class Sources {
    draw(data:SourceItem[]):void {
        const fragment = document.createDocumentFragment() as DocumentFragment;
        const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;

        data.forEach((item:SourceItem) => {

     const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLElement;

           (sourceClone.querySelector('.source__item-name') as HTMLElement).textContent = item.name;
            (sourceClone.querySelector('.source__item') as HTMLElement).setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);

           
        });

        (document.querySelector('.sources') as HTMLElement).append(fragment);
    }
}

export default Sources;
