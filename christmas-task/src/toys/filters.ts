import GeneratorCards from './generateCarts'

type ObjectData=(string | null | undefined)[] | undefined
export type SortType={
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
    field:string|null
    constructor(){
    this.sortData={
        name:null,
        shape:[],
        color:[],
        size:[],
        favorite:[],

    }
    this.field=null
    this.dataAttribute=null
    this.generatorCards=new GeneratorCards
}
   private removeItemInArray(item:string | boolean | null | undefined, sortItem:string|null){
        if(item){
            for( sortItem in this.sortData){
                let ind=this.sortData[sortItem].indexOf(item)
                this.sortData[sortItem].splice(ind,1)
            }
            
        }        
    }    
    private sort(selector:NodeListOf<Element>,object:ObjectData,dataAttribute:string|null){
        selector.forEach(filter=>{
            filter.addEventListener('click',()=>{
                filter.classList.toggle('active')
                if(filter.classList.contains('active')){
                    object!.push(filter.getAttribute(`${dataAttribute}`))
                    this.generatorCards.generateCard(this.sortData)
                }else{                   
                    let ind=object!.indexOf(filter.getAttribute(`${dataAttribute}`))
                    object!.splice(ind,1)                    
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
            }else{               
                let ind= this.sortData.favorite!.indexOf(true)
                this.sortData.favorite!.splice(ind,1)                
                this.generatorCards.generateCard(this.sortData)
            }
        })
    }
    searchToy(){
        const navSearch=document.querySelector('.nav__search') as HTMLInputElement
        navSearch!.addEventListener('input',()=>{
            console.log('search',navSearch!.value)
            this.sortData.name=(navSearch!.value).toLowerCase()
            console.log('search111',this.sortData.name)
            this.generatorCards.generateCard(this.sortData)
        })
    }
    filterMaxMin(){
        const sort = document.querySelector('.sort')
        console.log('sort', sort)
        sort!.addEventListener('click',(e)=>{
        console.log('target',e.target)
        })
    }
    filterCards(){
        this.sortByFavorite()
        this.sortByShape()  
        this.sortByColor()
        this.sortBySize()
        this.searchToy()
        this.filterMaxMin()     
        this.generatorCards.generateCard(this.sortData)
    }
}


export default Filters