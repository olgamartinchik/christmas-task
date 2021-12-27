const dataTree: string[] = ['1', '2', '3', '4', '5', '6'];
const dataBg: string[] = ['1', '2', '3', '4', '5', '6', '7', '8'];

const colorGarland: string[] = ['multicolor', 'blue', 'red', 'yellow', 'green'];
class SettingsTree {
    private createContainer(
        selector: HTMLElement,
        divClass: string,
        dataAttribute: string,
        array: string[],
        extension: string,
        index = 1
    ): void {
        array.forEach((data, ind) => {
            const div = document.createElement('div');
            div.classList.add(`${divClass}`);
            if (ind === index - 1) {
                div.classList.add(`active`);
            }
            div.setAttribute('data-' + dataAttribute, `${data}`);
            div.style.backgroundImage = `url(../assets/${dataAttribute}/${data}${extension})`;
            selector.append(div);
        });
    }

    public buildSettingsTree(): void {
        this.buildTreeForm();
        this.buildTreeBg();
        this.createGarlandBtn();
    }

    public buildTreeForm(index = 1): void {
        const treeFormContainer = document.querySelector('.tree-form-container') as HTMLElement;
        treeFormContainer.innerHTML = '';
        this.createContainer(treeFormContainer, 'form', 'tree', dataTree, '.png', index);
    }

    public buildTreeBg(index = 1): void {
        const backgroundContainer = document.querySelector('.background-container') as HTMLElement;
        backgroundContainer.innerHTML = '';
        this.createContainer(backgroundContainer, 'background', 'bg', dataBg, '.jpg', index);
    }

    public createGarlandBtn(index = 0): void {
        // console.log('colorGarland[`${dataAttribute}`]', colorGarland);
        const garlandContainer = document.querySelector('.garland-container') as HTMLElement;
        garlandContainer!.innerHTML = '';
        colorGarland.forEach((color: string, ind: number) => {
            const button = document.createElement('button');
            button.classList.add('color-garland', `btn-${color}`);
            if (ind === index) {
                button.classList.add('active');
            }
            button.setAttribute('data-color-lite', color);
            button.id = ind.toString();
            garlandContainer!.append(button);
        });
    }
}
export default SettingsTree;
