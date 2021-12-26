interface IDragEvent{
    target: HTMLElement
    dataTransfer:DataTransfer
}
class DragDrop{

    getDragDrop(){
        const tree=document.querySelector('area') as HTMLElement
        console.log('tree',tree)
        const likeToys=document.querySelector('.like-toys')as HTMLElement

        tree.addEventListener('dragover',this.handlerDragOver)
        tree.addEventListener('drop',this.handlerDrop)
        
        likeToys!.addEventListener('dragstart', this.handlerDragStart)
        likeToys!.addEventListener('drop', this.handlerDragStart)
        likeToys!.addEventListener('dragover', this.handlerDragStart)

    }
    handlerDragStart(e:any):void{
        if(e.target.closest('.like-toys__img')){
             e.dataTransfer.setData('id',(e.target as HTMLElement).id)
        console.log('11111111',(e.target as HTMLElement))
        }
       

    }
    handlerDragOver(e:any){
        e.preventDefault()
        if(e.target.closest('.like-toys__contain')){
            e.preventDefault()
        }

    }
    handlerDrop(e:any){
        let itemId=e.dataTransfer.getData('id')
        console.log('itemId',itemId)
        e.target.append(document.getElementById(itemId))
        if(e.target.closest('.like-toys__img')){
            let itemId=e.dataTransfer.getData('id')
            console.log('itemId',itemId)
            let item=document.getElementById(itemId)
            
            e.target.append(item)
        }
    }
 
}
export default DragDrop