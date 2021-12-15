import FiltersControls from "./filtersSettings"
import { SortType } from "./filters"

interface ICard{
    num: string,
        name: string,
        count: string,
        year: string,
        shape: string,
        color: string,
        size: string,
        favorite: boolean,
}
type IData= [ card:ICard]
class ToysCard{
    setAttributes:FiltersControls
    descriptionArray:object
    constructor(){
       this.descriptionArray={}
        this.setAttributes=new FiltersControls()
    }
    async getData():Promise<IData>{
            const url='../data.json'
            const res = await fetch(url);
            const data = await res.json();
            return data
    }
    createCards(card:ICard):HTMLDivElement{
        this.descriptionArray={'Количество:':`${card.count}`, 'Год покупки:':`${card.year}`, 'Форма:':`${card.shape}`, 'Цвет:':`${card.color}`, 'Размер:':`${card.size}`, 'Любимая:':`${card.favorite===false ?'нет':'да'}`}

        const toyCard=document.createElement('div')            
        this.setAttributes.setAttributes(toyCard,{'class':'toy-card','data-num-toy':`${card.num}`});
        const h2=document.createElement('h2')
        h2.classList.add('toy-card__title')
        h2.textContent=`${card.name}`
        let img=document.createElement('img') as HTMLElement
        this.setAttributes.setAttributes(img,{'class':'toy-card__image','src':`./assets/toys/${card.num}.png`, 'alt':'toy'});
        let ul=document.createElement('ul')
            ul.classList.add('toy-card__description')
            for(let description in this.descriptionArray){
                let li=document.createElement('li')                 
                li.textContent=`${description} ${this.descriptionArray[description]}`
                ul.appendChild(li)
            }           
        const toyCardLike=document.createElement('div')
        toyCardLike.classList.add('toy-card__like')
        toyCard.append(h2, img, ul,toyCardLike)        
        return toyCard
    }
   async buildCards(selector:HTMLElement,filterData:SortType):Promise<HTMLElement>{
        let data=await this.getData()
        let toyCard:HTMLDivElement
       
        data.forEach(card => {
            // console.log(filterData)
            if(!filterData.favorite||!filterData.shape||!filterData.color||!filterData.size
                ||!filterData.name
                ){
                toyCard =  this.createCards(card)
                selector.appendChild( toyCard)
            }else {
                // console.log(filterData);
                if((filterData.favorite!.length === 0 ||filterData.favorite!.includes(card.favorite))
                &&
                (filterData.shape!.length === 0 ||filterData.shape!.includes(card.shape))
                &&
                (filterData.color!.length === 0 ||filterData.color!.includes(card.color))
                &&
                (filterData.size!.length === 0 ||filterData.size!.includes(card.size))
                &&
                (filterData.name!.length === 0 ||(card.name.toLowerCase()).includes(filterData.name))
                ){

                toyCard=  this.createCards(card)
                selector.appendChild( toyCard)
            }
        }
        // selector.appendChild( toyCard)
        });
        
        return selector
    }
}


export default ToysCard