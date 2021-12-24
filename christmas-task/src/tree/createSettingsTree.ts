const dataTree=['1','2','3','4','5','6']
const dataBg=['1','2','3','4','5','6','7','8']
const colorGarland=['multicolor','blue','red','yellow','green']
class SettingsTree{

    createContainer(selector:HTMLElement,divClass:string, dataAttribute:string, array:string[],extension:string, index:number=1){

        array.forEach((data, ind)=>{
            const div=document.createElement('div')
            div.classList.add(`${divClass}`)
            if(ind===index-1){
                div.classList.add(`active`)
            }
            div.setAttribute('data-'+dataAttribute, `${data}`);
            div.style.backgroundImage=`url(../assets/${dataAttribute}/${data}${extension})`
            selector.append(div)
        })
    }
    buildSettingsTree(){
        this.buildTreeForm()
        this.buildTreeBg()
        this. createGarlandBtn()

        
    }
    buildTreeForm(index=1){
        const treeFormContainer=document.querySelector('.tree-form-container') as HTMLElement
        treeFormContainer.innerHTML=''
        this.createContainer(treeFormContainer,'form', 'tree', dataTree,'.png',index)
    }
    buildTreeBg(index=1){
        const backgroundContainer=document.querySelector('.background-container') as HTMLElement
        backgroundContainer.innerHTML=''
        this.createContainer(backgroundContainer,'background', 'bg', dataBg,'.jpg',index)
    }
    createGarlandBtn(index=0){
        const garlandContainer=document.querySelector('.garland-container') as HTMLElement
        garlandContainer!.innerHTML=''
        colorGarland.forEach((color,ind)=>{
            const button=document.createElement('button')
            button.classList.add('color-garland',`btn-${color}`)
            if(ind===index){
                button.classList.add('active')
            }
            button.setAttribute('data-color-lite', color)
            garlandContainer?.append(button)
        })
    }
  
}
export default SettingsTree