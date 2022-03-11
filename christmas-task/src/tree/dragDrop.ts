class DragDrop {
  private  toy: HTMLElement | null;

  private   coordX: number | null;

  private   coordY: number | null;

    constructor() {
        this.toy = null;
        this.coordX = null;
        this.coordY = null;
    }

 public   getDragDrop() {
        this.dragStart();
        this.dragOver();
        this.drop();
        this.dragLeave();
    }

   private dragStart() {
        const likeToys = document.querySelector('.like-toys') as HTMLElement;

        likeToys.addEventListener('dragstart', (e) => {
            if ((e.target as HTMLElement).closest('.like-toys__img')) {
                this.toy = (e.target as HTMLElement).closest('.like-toys__img');
                const countToy = this.toy!.parentNode!.parentNode?.querySelector('.user-toy__count') as HTMLElement;
                countToy.textContent = (this.toy!.parentNode!.children.length - 1).toString();
                e.dataTransfer!.setData('id', this.toy!.id);
                this.coordX = e.offsetX;
                this.coordY = e.offsetY;
            }
        });
        const tree = document.querySelector('area') as HTMLElement;

        tree.addEventListener('dragstart', (e) => {
            if ((e.target as HTMLElement).closest('.like-toys__img')) {
                this.toy = (e.target as HTMLElement).closest('.like-toys__img');
                e.dataTransfer!.setData('id', this.toy!.id);
                this.coordX = e.offsetX;
                this.coordY = e.offsetY;
            }
        });
    }

   private dragOver() {
        const tree = document.querySelector('area') as HTMLElement;
        tree.addEventListener('dragover', (e) => {
            e.preventDefault();
        });
        const likeToys = document.querySelector('.like-toys') as HTMLElement;
        likeToys.addEventListener('dragover', (e) => {
            if (
                (e.target as HTMLElement).closest('.like-toys__contain') &&
                (e.target as HTMLElement).closest('.like-toys__contain')!.id === this.toy!.id.substring(0, 2)
            ) {
                e.preventDefault();
            } else {
                likeToys.childNodes.forEach((elem) => {
                    if ((elem.childNodes[1] as HTMLElement).id === this.toy!.id.substring(0, 2)) {
                        if ((elem.childNodes[1] as HTMLElement).lastChild === this.toy!) {
                            (elem.childNodes[0] as HTMLElement).textContent = (
                                elem.childNodes[1] as HTMLElement
                            ).children.length.toString();
                        } else {
                            (elem.childNodes[0] as HTMLElement).textContent = (
                                elem.childNodes[1] as HTMLElement
                            ).children.length.toString();
                        }
                    }
                });
            }
        });
    }

  private  dragLeave() {
        const tree = document.querySelector('area') as HTMLElement;
        tree.addEventListener('dragleave', () => {
            const likeToys = document.querySelector('.like-toys') as HTMLElement;
            likeToys.childNodes.forEach((elem) => {
                const containerToy = elem.childNodes[1] as HTMLElement;
                const countToy = elem.childNodes[0] as HTMLElement;
                if (containerToy.id === this.toy!.id.substring(0, 2)) {
                    this.toy!.style.zIndex = '1';
                    this.toy!.style.top = '50%';
                    this.toy!.style.left = '50%';
                    this.toy!.style.transform = '(-50%, -50%)';
                    containerToy.append(this.toy!);
                    if (containerToy.lastChild === this.toy!) {
                        countToy.textContent = containerToy.children.length.toString();
                    } else {
                        countToy.textContent = containerToy.children.length.toString();
                    }
                }
            });
        });
    }

  private  drop() {
        const tree = document.querySelector('area') as HTMLElement;
        tree.addEventListener('drop', (e) => {
            const toy = document.getElementById(e.dataTransfer!.getData('id')) as HTMLImageElement;
            toy.setAttribute('draggable', 'true');
            toy!.style.zIndex = '3';
            toy!.style.top = e.offsetY - this.coordY! + 'px';
            toy!.style.left = e.offsetX - this.coordX! + 'px';

            tree.append(toy);

            const likeToys = document.querySelector('.like-toys') as HTMLElement;
            likeToys.childNodes.forEach((elem) => {
                const containerToy = elem.childNodes[1] as HTMLElement;
                const countToy = elem.childNodes[0] as HTMLElement;
                if (containerToy.id === this.toy!.id.substring(0, 2)) {
                    if (containerToy.lastChild === this.toy!) {
                        countToy.textContent = containerToy.children.length.toString();
                    } else {
                        countToy.textContent = containerToy.children.length.toString();
                    }
                }
            });
        });
        const likeToys = document.querySelector('.like-toys') as HTMLElement;
        likeToys.addEventListener('drop', (e) => {
            if (
                (e.target as HTMLElement).closest('.like-toys__contain') &&
                (e.target as HTMLElement).closest('.like-toys__contain')!.id === this.toy!.id.substring(0, 2)
            ) {
                const countToy = (e.target as HTMLElement)
                    .closest('.like-toys__contain')!
                    .parentNode?.querySelector('.user-toy__count') as HTMLElement;
                const container = (e.target as HTMLElement).closest('.like-toys__contain') as HTMLElement;
                const toy = document.getElementById(e.dataTransfer!.getData('id')) as HTMLElement;
                toy.setAttribute('draggable', 'true');
                toy!.style.zIndex = '1';
                toy!.style.top = '50%';
                toy!.style.left = '50%';
                toy!.style.transform = '(-50%, -50%)';
                container.append(toy);
                countToy.textContent = container.children.length.toString();
            }
        });
    }

    
}
export default DragDrop;
