import FiltersControls from "./filtersSettings"


class ToysCard{
    setAttributes:FiltersControls
    descriptionArray:object
    constructor(){
       this.descriptionArray={}
        this.setAttributes=new FiltersControls()
    }
    async getData(){
        const url='../data.json'
        const res = await fetch(url);
        const data = await res.json();
        return data

    }
   async buildCards(selector:HTMLElement,filterData):Promise<HTMLElement>{
        let data=await this.getData() 
        console.log('data',data)
        data.forEach(card => {
            if(card.shape===filterData.includes('шар')||card.shape===filterData.includes('колокольчик')||card.shape===filterData.includes('шишка')||card.shape===filterData.includes('снежинка')||card.shape===filterData.includes('фигурка')&&card.size===filterData.includes('большой')||card.size===filterData.includes('средний')||card.size===filterData.includes('маленький')&&card.color===filterData.includes('белый')||card.color===filterData.includes('желтый')||card.color===filterData.includes('красный')||card.color===filterData.includes('синий')||card.color===filterData.includes('зеленый')){}
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
            selector.appendChild(toyCard) 
     
        });
        return selector
    }
}


export default ToysCard