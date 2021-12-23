const dataTree=['1','2','3','4','5','6']
const dataBg=['1','2','3','4','5','6','7','8']
class SettingsTree{

    createContainer(selector:HTMLElement,divClass:string, dataAttribute:string, array:string[],extension:string){

        array.forEach((data, ind)=>{
            const div=document.createElement('div')
            div.classList.add(`${divClass}`)
            if(ind===0){
                div.classList.add(`active`)
            }
            div.setAttribute('data-'+dataAttribute, `${data}`);
            div.style.backgroundImage=`url(../assets/${dataAttribute}/${data}${extension})`
            selector.append(div)
        })
    }
    buildSettingsTree(){
        const treeFormContainer=document.querySelector('.tree-form-container') as HTMLElement
        treeFormContainer.innerHTML=''
        this.createContainer(treeFormContainer,'form', 'tree', dataTree,'.png')

        const backgroundContainer=document.querySelector('.background-container') as HTMLElement
        backgroundContainer.innerHTML=''
        this.createContainer(backgroundContainer,'background', 'bg', dataBg,'.jpg')
    }
  
}
export default SettingsTree