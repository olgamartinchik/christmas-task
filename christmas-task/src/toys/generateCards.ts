import ToysCard from './toysCards';
import { SortType } from './filters';
import ToyWrapper from './toysContainerScroll';


class GeneratorCards {
   
    generateCard(sortData: SortType):void {
        const toysContainer = document.querySelector('.toys-container') as HTMLElement;
        toysContainer.innerHTML = '';
        new ToysCard().buildCards(toysContainer, sortData);
        // new ToyWrapper().hiddenArrowDownWithSort()
    }
}
export default GeneratorCards;
