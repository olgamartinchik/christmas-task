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
        });
    }

    hiddenArrowDownWithSort(): void {
        const toysWrapper = document.querySelector('.toys-wrapper') as HTMLElement;
        const toysContainer = document.querySelector('.toys-container') as HTMLElement;
        if (toysContainer) {
            console.log('.currentStyle.height',toysContainer.scrollHeight > toysContainer.offsetHeight || toysContainer.scrollWidth > toysContainer.offsetWidth)
            if(toysContainer.scrollHeight > toysContainer.offsetHeight || toysContainer.scrollWidth > toysContainer.offsetWidth){
                 toysWrapper.classList.remove('no-arrow');
            }else{
               
                toysWrapper.classList.add('no-arrow');
            }
          
        }
    }
}
export default ToyWrapper;
