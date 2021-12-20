import { isArrowDown } from './toysCards';

class ToyWrapper {
    hiddenArrowDown(): void {
        const toysWrapper = document.querySelector('.toys-wrapper') as HTMLElement;

        if (!isArrowDown) {
            toysWrapper.classList.add('no-arrow');
        } else {
            toysWrapper.classList.remove('no-arrow');
        }
        this.hiddenArrowDownWithScroll();
        this.hiddenArrowDownWithSort();
    }

    hiddenArrowDownWithScroll(): void {
        const toysWrapper = document.querySelector('.toys-wrapper') as HTMLElement;
        const toysContainer = document.querySelector('.toys-container') as HTMLElement;
        toysContainer.addEventListener('scroll', () => {
            if (toysContainer.scrollHeight === Math.round(toysContainer.scrollTop + toysContainer.clientHeight)) {
                toysWrapper.classList.add('no-arrow');
            } else {
                toysWrapper.classList.remove('no-arrow');
            }

            // this.hiddenArrowDownWithSort()
        });
    }

    hiddenArrowDownWithSort(): void {
        const toysWrapper = document.querySelector('.toys-wrapper') as HTMLElement;
        const toysContainer = document.querySelector('.toys-container') as HTMLElement;
        if (toysContainer) {
            if (toysContainer.childNodes.length === 1 || toysContainer.childNodes.length === 0) {
                toysWrapper.classList.add('no-arrow');
            } else {
                toysWrapper.classList.remove('no-arrow');
            }
        }
    }
}
export default ToyWrapper;
