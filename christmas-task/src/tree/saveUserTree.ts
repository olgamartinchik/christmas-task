import html2canvas from 'html2canvas';
import UserSettings, { ISettings, settings } from './getUserSettings';
interface SettingsTree {
    1: object | ISettings;
    2: object | ISettings;
    3: object | ISettings;
    4: object | ISettings;
    5: object | ISettings;
    6: object | ISettings;
}
let treesSettings: SettingsTree = {
    1: {},
    2: {},
    3: {},
    4: {},
    5: {},
    6: {},
};
export let arrayToys: object = {};
if (localStorage.getItem('arrayToys')) {
    arrayToys = JSON.parse(localStorage.getItem('arrayToys')!);
}

let toys: SettingsTree = {
    1: {},
    2: {},
    3: {},
    4: {},
    5: {},
    6: {},
};
if (localStorage.getItem('treesSettings')) {
    treesSettings = JSON.parse(localStorage.getItem('treesSettings')!);
}
if (localStorage.getItem('toys')) {
    toys = JSON.parse(localStorage.getItem('toys')!);
}

class ScreenTree {
    public saveTree(): void {
        this.saveToysBeforeUnReload();
        this.restoreSettings();

        const screenContainer = document.querySelector('.screen-container') as HTMLElement;
        const treeContainer = document.querySelector('.tree-container') as HTMLElement;
        const saveBtn = document.querySelector('.save-btn') as HTMLElement;

        saveBtn!.addEventListener('click', () => {
            const treeToys = document
                .querySelector('area')!
                .querySelectorAll('.like-toys__img') as NodeListOf<HTMLElement>;
            treeToys.forEach((toy) => {
                arrayToys[toy.id] = [toy.style.top, toy.style.left, toy.getAttribute('data-num')];
            });
           

            html2canvas(treeContainer).then((canvas) => {
                const formTrees = document.querySelectorAll('.form') as NodeListOf<HTMLElement>;
                formTrees.forEach((tree) => {
                    if ((tree as HTMLElement).closest('.active')!) {
                        const treeId = tree!.getAttribute('data-tree');
                        toys[`${treeId}`] = { ...arrayToys };
                        canvas.setAttribute('id', treeId!);
                        canvas.classList.add('screen');
                        screenContainer.appendChild(canvas);
                        const screens = screenContainer.querySelectorAll('canvas');
                        screens.forEach((screen) => {
                            if (screen.id === canvas.id) {
                                screen.remove();
                                screenContainer.appendChild(canvas);
                            }
                        });
                        treesSettings[`${treeId}`] = { ...settings };
                        localStorage.setItem('treesSettings', JSON.stringify(treesSettings));
                        localStorage.setItem('toys', JSON.stringify(toys));
                    }
                });
                arrayToys = {};
                localStorage.setItem('arrayToys', JSON.stringify(arrayToys));
            });
        });
    }

    public restoreSettings(): void {
        const screenContainer = document.querySelector('.screen-container') as HTMLElement;
        screenContainer.addEventListener('click', (e) => {
            if ((e.target as HTMLElement).closest('.screen')) {
                const screenId = (e.target as HTMLElement).closest('.screen')!.id;
                new UserSettings().restoreSaveSettings(treesSettings[`${screenId}`]);
                new UserSettings().getUserSettings();
                this.restoreToys(e);
            }
        });
    }

    private restoreToys(e: Event): void {
        const screenId = (e.target as HTMLElement).closest('.screen')!.id;
        this.restoreToyOnTree(toys[`${screenId}`]);
    }

    private saveToysBeforeUnReload(): void {
        window.addEventListener('beforeunload', () => {
            arrayToys = {};
            const treeToys = document
                .querySelector('area')!
                .querySelectorAll('.like-toys__img') as NodeListOf<HTMLElement>;
            if (treeToys) {
                treeToys.forEach((toy) => {
                    arrayToys[toy.id] = [toy.style.top, toy.style.left, toy.getAttribute('data-num')];
                });
                localStorage.setItem('arrayToys', JSON.stringify(arrayToys));
            }
        });
    }

    public restoreToyOnTree(objectToys: object): void {
        const likToys = document
            .querySelector('.like-toys')!
            .querySelectorAll('.like-toys__img') as NodeListOf<HTMLElement>;
        const area = document.querySelector('area') as HTMLElement;
        area!.innerHTML = '';
        for (const treeToy in objectToys) {
            const img = document.createElement('img');
            img.classList.add('like-toys__img');
            img.src = `./assets/toys/${objectToys[treeToy][2]}.png`;
            img.id = treeToy;
            img.setAttribute('data-num', objectToys[treeToy][2]);
            img.style.top = objectToys[treeToy][0];
            img.style.left = objectToys[treeToy][1];
            img.style.zIndex = '3';
            area!.append(img);

            likToys.forEach((toy) => {
                if (toy.id === treeToy) {
                    const containerToys = toy.parentNode as HTMLDivElement | null;
                    const countToys = toy.parentNode!.parentNode?.querySelector('.user-toy__count') as HTMLElement;
                    
                    toy.remove();
                    countToys.textContent = containerToys!.children.length.toString();
                }
            });
        }
    }

    public cleanObjectToy(): void {
        arrayToys = {};
    }
}
export default ScreenTree;
