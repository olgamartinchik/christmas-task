import ToysCard from './toysCards';
import { SortType } from './filters';

class GeneratorCards {
    generateCard(sortData: SortType): void {
        const toysContainer = document.querySelector('.toys-container') as HTMLElement;
        toysContainer.innerHTML = '';
        new ToysCard().buildCards(toysContainer, sortData);
    }
}
export default GeneratorCards;
