

interface IDragEvent{
    target: HTMLElement
    dataTransfer:DataTransfer
}
class DragDrop{
    toy:HTMLElement|null
    coordX:number|null
    coordY:number|null
    constructor(){
        this.toy=null
        this.coordX=null
        this.coordY=null
    }

    getDragDrop(){
        const tree=document.querySelector('area') as HTMLElement
        // const likeToys=document.querySelector('.like-toys')as HTMLElement       

        // likeToys.addEventListener('dragstart', this.dragStart)
        // likeToys.addEventListener('dragend', this.dragEnd) 
        this.start()
        // this.end()
        this.dragOver()
        this. drop()
        
    }
    
    start(){
        const likeToys=document.querySelector('.like-toys')as HTMLElement       

        likeToys.addEventListener('dragstart', (e)=>{
            if((e.target as HTMLElement).closest('.like-toys__img')){           
                this.toy=(e.target as HTMLElement).closest('.like-toys__img')
                let countToy=this.toy!.parentNode!.parentNode?.querySelector('.user-toy__count') as HTMLElement
                countToy.textContent=(this.toy!.parentNode!.children.length-1).toString()
                e.dataTransfer!.setData('id',this.toy!.id)
                this.coordX=e.offsetX
                this.coordY=e.offsetY
                console.log('dragStart', this.toy,likeToys.querySelector('.user-toy__count') , this.toy?.parentNode?.children.length)
                console.log('dataTransfer',this.toy!.id,countToy)

            }
        })
        const tree=document.querySelector('area') as HTMLElement

        tree.addEventListener('dragstart',(e)=>{
            if((e.target as HTMLElement).closest('.like-toys__img')){           
                this.toy=(e.target as HTMLElement).closest('.like-toys__img')
                e.dataTransfer!.setData('id',this.toy!.id)
                this.coordX=e.offsetX
                this.coordY=e.offsetY
                console.log('dragStart', this.toy)
                console.log('dataTransfer',this.toy!.id)
            }
        })
    }
    end(){     
        const tree=document.querySelector('.tree-container') as HTMLElement
        tree.addEventListener('dragend', (e)=>{
            
            if((e.target as HTMLElement).closest('.like-toys__img')){
               this.toy=(e.target as HTMLElement).closest('.like-toys__img') as HTMLElement
               this.toy!.style.position='absolute'
     
               this.toy!.style.top=(e.pageY - this.coordY!)+'px'
               this.toy!.style.left=(e.pageX - this.coordX!)+'px'
             console.log('dragend',this.toy!.style.top, this.toy!.style.left, this.toy)
            }
        }) 

    }
    dragOver(){
        const tree=document.querySelector('area') as HTMLElement
        tree.addEventListener('dragover',(e)=>{    
            e.preventDefault()
        })
        const likeToys=document.querySelector('.like-toys')as HTMLElement
        likeToys.addEventListener('dragover',(e)=>{
            if((e.target as HTMLElement).closest('.like-toys__contain')&&(e.target as HTMLElement).closest('.like-toys__contain')!.id===this.toy!.id.substring(0,2)){
                e.preventDefault()
                console.log('true',this.toy!.id.substring(0,2))
            }else{
                console.log('false')
            }
        })
    }
    drop(){
        const tree=document.querySelector('area') as HTMLElement
        tree.addEventListener('drop',(e)=>{
        
            let toy=document.getElementById(e.dataTransfer!.getData('id')) as HTMLElement
            toy.setAttribute('draggable','true')
            toy!.style.position='absolute'
            toy!.style.zIndex='1000';
            let rect =(e.target as HTMLElement).getBoundingClientRect();
            // toy!.style.top=(e.offsetY)+'px';
            // toy!.style.left=(e.offsetX )+'px';
            // (e.target as HTMLElement).style.position='relative'
            // (e.target as HTMLElement).append(toy)
           toy!.style.top=(e.offsetY - this.coordY!)+'px'
            toy!.style.left=(e.offsetX - this.coordX!)+'px'
            tree.append(toy)
            
            console.log('drop',toy,rect)
        
        })
        const likeToys=document.querySelector('.like-toys')as HTMLElement
        likeToys.addEventListener('drop',(e)=>{
            if((e.target as HTMLElement).closest('.like-toys__contain')&&(e.target as HTMLElement).closest('.like-toys__contain')!.id===this.toy!.id.substring(0,2)){
                // let countToy=this.toy!.parentNode!.parentNode?.querySelector('.user-toy__count') as HTMLElement
                let countToy=(e.target as HTMLElement).closest('.like-toys__contain')!.parentNode?.querySelector('.user-toy__count') as HTMLElement
                // countToy.textContent=(this.toy!.parentNode!.children.length-1).toString()
                let container=(e.target as HTMLElement).closest('.like-toys__contain')as HTMLElement
                let toy=document.getElementById(e.dataTransfer!.getData('id')) as HTMLElement
                toy.setAttribute('draggable','true')
                toy!.style.zIndex='1';        
                toy!.style.top='50%'
                toy!.style.left='50%'
                toy!.style.transform='(-50%, -50%)'
                container.append(toy)
                countToy.textContent=(container.children.length).toString()
                console.log('!!!!!!!!!!', countToy)
            }
        })
    }
 
}
export default DragDrop