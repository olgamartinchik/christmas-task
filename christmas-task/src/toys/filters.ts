import GeneratorCards from './generateCarts'
import SelectionToys from "./selectionToy";
import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import LikeCards from './likeCardsHandler';




type ObjectData=(string | null | undefined)[] | undefined
export type SortType={
    minMaxSort?:string|null,
        minNum?:string|undefined,
        maxNum?:string|undefined,
        minYear?:string|undefined,
        maxYear?:string|undefined,
        num?: string,
        name?: string|undefined|null,
        count?: string,
        year?: string,
        shape?: ObjectData,
        color?: ObjectData,
        size?: ObjectData,
        favorite?: boolean[],
}
class Filters{
    generatorCards:GeneratorCards
    sortData:SortType
    dataAttribute:string|null
  
  
    constructor(){
    this.sortData={
        minMaxSort:null,
        minNum:'1',
        maxNum:'12',
        minYear:'1940',
        maxYear:'2020',
        name:null,
        shape:[],
        color:[],
        size:[],
        favorite:[],

    }
  
    this.dataAttribute=null
    this.generatorCards=new GeneratorCards
}
      
    private sort(selector:NodeListOf<Element>,object:ObjectData,dataAttribute:string|null){
        selector.forEach(filter=>{
            filter.addEventListener('click',()=>{
                filter.classList.toggle('active')
                if(filter.classList.contains('active')){
                    object!.push(filter.getAttribute(`${dataAttribute}`))
                    console.log('object',object)  
                    this.generatorCards.generateCard(this.sortData)
                }else{                   
                    let ind=object!.indexOf(filter.getAttribute(`${dataAttribute}`))
                    object!.splice(ind,1)      
                    console.log('object',object)              
                    this.generatorCards.generateCard(this.sortData)
                }
            })
        })
    }
    sortByShape(){
        const shapeFilter=document.querySelectorAll('[data-shape]')
       
        this.dataAttribute='data-shape'
        this.sort(shapeFilter,this.sortData.shape, this.dataAttribute)
    }
    sortByColor(){
        const colorFilter=document.querySelectorAll('[data-color]')
        
        this.dataAttribute='data-color'
        this.sort(colorFilter,this.sortData.color, this.dataAttribute)
    }
    sortBySize(){
        const colorFilter=document.querySelectorAll('[data-size]')
      
        this.dataAttribute='data-size'
        this.sort(colorFilter,this.sortData.size, this.dataAttribute)
    }
  

    sortByFavorite(){
        const favoriteToy=document.querySelector('#favorite') as HTMLInputElement
        favoriteToy!.addEventListener('change',():void=>{
            if(favoriteToy.checked===true){                
                this.sortData.favorite!.push(true)
                this.generatorCards.generateCard(this.sortData)
                console.log('this.sortData.favorite',this.sortData.favorite)
            }else{               
                let ind= this.sortData.favorite!.indexOf(true)
                this.sortData.favorite!.splice(ind,1)                
                this.generatorCards.generateCard(this.sortData)
                console.log('this.sortData.favorite',this.sortData.favorite)
            }
        })
    }
    searchToy(){
        const navSearch=document.querySelector('.nav__search') as HTMLInputElement
        navSearch!.addEventListener('input',()=>{
            console.log('search',navSearch!.value)
            this.sortData.name=(navSearch!.value).toLowerCase().trim()
            console.log('search111',this.sortData.name)
            this.generatorCards.generateCard(this.sortData)
        })
    }
    filterMaxMin(){
        const sort = document.querySelector('.sort') as HTMLInputElement      
        // console.log('sort', sort)
        (sort! as HTMLInputElement).addEventListener('change',(e)=>{
        console.log('target',(e.currentTarget! as  HTMLInputElement).value)
            let valueSelect=(e.currentTarget! as  HTMLInputElement).value
            this.sortData.minMaxSort=valueSelect
            // console.log('this.sortData.minMaxSort',this.sortData.minMaxSort)
            this.generatorCards.generateCard(this.sortData)
        })
    }
    filterByNum(){     
        
        const sliderItems=document.querySelector('#slider-items')  as noUiSlider.target
        const inputItem1=document.querySelector('#input-item1')  as HTMLInputElement
        const inputItem2=document.querySelector('#input-item2')  as HTMLInputElement
        if(sliderItems){
            noUiSlider.create(sliderItems,{
            start: [1, 12],
            connect: true,
            step:1,
            range: {
                'min': [1],
                'max': [12]
            }
        });
        const inputItems=[inputItem1,inputItem2];
        sliderItems.noUiSlider!.on('change',(values:(number|string)[],handle):void=>{
        inputItems[handle.toString()].value=Math.round(values[handle.toString()])

        this.sortData.minNum=inputItems[0].value
        this.sortData.maxNum=inputItems[1].value
       

     console.log('noUiSlider')
      


        this.generatorCards.generateCard(this.sortData)
        })
        }
        console.log('noUiSlider111')
    }
    filterByYear(){
            const sliderYears=document.querySelector('#slider-years')  as     noUiSlider.target
            const inputYear1=document.querySelector('#input-year1')  as HTMLInputElement
            const inputYear2=document.querySelector('#input-year2')  as HTMLInputElement

            if(sliderYears){
            noUiSlider.create(sliderYears,{
            start: [1940, 2020],
            connect: true,
            step:10,
                range: {
                'min': [1940],
                'max': [2020]
                }
            });
            const inputYears=[inputYear1,inputYear2];
            sliderYears!.noUiSlider!.on('change',(values:(number|string)[],handle):void=>{
            inputYears[handle.toString()].value=Math.round(values[handle.toString()])
            this.sortData.minYear=inputYears[0].value
            this.sortData.maxYear=inputYears[1].value
           
            console.log('noUiSlider')
            this.generatorCards.generateCard(this.sortData)
          
           
            
            })
            console.log('noUiSlider111')
}
    }
    filterCards():void{
        this.sortByFavorite()
        this.sortByShape()  
        this.sortByColor()
        this.sortBySize()
        this.searchToy()
        this.filterMaxMin() 
        this.filterByNum()  
        this.filterByYear()  
        this.generatorCards.generateCard(this.sortData)


        // new SelectionToys().toggleSelectionCards()
        // new LikeCards().openLikeCards()
    }
}


export default Filters