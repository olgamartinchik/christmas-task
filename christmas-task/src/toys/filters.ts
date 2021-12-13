import ToysCard from './toysCards'


class Filters{

sortData:[(string | undefined)?, (boolean | undefined)?]
constructor(){
this.sortData=[]
}
    sortForm(){
        const formFilter=document.querySelectorAll('[data-filter]')
        console.log('formFilter',formFilter)
        formFilter.forEach(filter=>{
            filter.addEventListener('click', ():void=>{
                filter.classList.toggle('active')

            })
           
        })
        


    }
    filterOutCards(){
        this.sortForm()
         const toysContainer=document.querySelector('.toys-container') as HTMLElement
         toysContainer.innerHTML=''
         new ToysCard().buildCards(toysContainer,this.sortData)

    }
}


export default Filters