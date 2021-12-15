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
    createMessage():HTMLDivElement{
        let h2=document.createElement('h2')
        h2.classList.add('toys-container__title')
        h2.textContent='Совпаденией нет'
        return h2
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
        if(filterData.minMaxSort){
            if(filterData.minMaxSort==='name-max'){
                 data.sort((a,b)=>a.name.toLowerCase().charCodeAt(0)-b.name.toLowerCase().charCodeAt(0))
                //  {
                //         if(a.name.toLowerCase()<b.name.toLowerCase()){
                //             return 1
                //         }
                //         if(a.name.toLowerCase()>b.name.toLowerCase()){
                //             return -1
                //         }
                //         return 0
                //  })
            }
            if(filterData.minMaxSort==='name-mim'){
                data.sort((a,b)=>b.name.toLowerCase().charCodeAt(0)-a.name.toLowerCase().charCodeAt(0))
                
            }
            if(filterData.minMaxSort==='count-max'){
                data.sort((a,b)=>(+a.count)-(+b.count))
            }
            if(filterData.minMaxSort==='count-min'){
                data.sort((a,b)=>(+b.count)-(+a.count))
            }
           
        }


    //    console.log('data',data)
        data.forEach((card )=> {
            // console.log(filterData)
            if(!filterData.favorite
                &&!filterData.shape
                &&!filterData.color
                &&!filterData.size
                &&!filterData.name
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
                (!filterData.name ||(card.name.toLowerCase()).includes(filterData.name))
                &&
                (+card.count >= +filterData.minNum! && +card.count <= +filterData.maxNum!)
                &&
                (+card.year >= +filterData.minYear! && +card.year <= +filterData.maxYear!)
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