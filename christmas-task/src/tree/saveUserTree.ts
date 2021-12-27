import html2canvas from "html2canvas"
import { borderRightStyle } from "html2canvas/dist/types/css/property-descriptors/border-style"
import UserSettings, {ISettings, settings} from './getUserSettings'
import UserToys from "./userToys"
interface SettingsTree{
    1:object|ISettings;
    2:object|ISettings;
    3:object|ISettings;
    4:object|ISettings;
    5:object|ISettings;
    6:object|ISettings
}
let treesSettings:SettingsTree={
    1:{},
    2:{},
    3:{},
    4:{},
    5:{},
    6:{}
}
let arrayToys={}

let toys:SettingsTree={
    1:{},
    2:{},
    3:{},
    4:{},
    5:{},
    6:{}
}
if(localStorage.getItem('treesSettings')){
    treesSettings=JSON.parse(localStorage.getItem('treesSettings')!)
}
if(localStorage.getItem('toys')){
     toys=JSON.parse(localStorage.getItem('toys')!)  
}


class ScreenTree{
    saveTree(){
        this.saveToysBeforeUnReload()      
        this.restoreSettings()
        
        const screenContainer=document.querySelector('.screen-container')as HTMLElement
        const treeContainer=document.querySelector('.tree-container')as HTMLElement
        const saveBtn=document.querySelector('.save-btn') as HTMLElement

        saveBtn!.addEventListener('click',()=>{
            const treeToys=document.querySelector('area')!.querySelectorAll('.like-toys__img') as NodeListOf<HTMLElement>
            treeToys.forEach(toy=>{
                arrayToys[toy.id]=[toy.style.top, toy.style.left,toy.getAttribute('data-num')]
            })
            console.log('treeToys',treeToys,arrayToys,toys)

            html2canvas(treeContainer).then(canvas => {
                const formTrees=document.querySelectorAll('.form')  as NodeListOf<HTMLElement>
                // console.log('formTrees',formTrees)
                formTrees.forEach(tree=>{
                    if((tree as HTMLElement).closest('.active')!){
                        let treeId=tree!.getAttribute('data-tree')
                        toys[`${treeId}`]={...arrayToys} 
                        // console.log('treeId',treeId,screenContainer.querySelectorAll('canvas'))
                        canvas.setAttribute('id', treeId!)
                        canvas.classList.add('screen')
                        screenContainer.appendChild(canvas)
                        let screens=screenContainer.querySelectorAll('canvas')
                        screens.forEach(screen=>{
                            if(screen.id===canvas.id){
                                screen.remove()
                                screenContainer.appendChild(canvas)
                            }                          
                        })
                        treesSettings[`${treeId}`]={...settings}                                             
                        // console.log('treesSettings',treesSettings)
                        localStorage.setItem('treesSettings',JSON.stringify(treesSettings))
                        localStorage.setItem('toys',JSON.stringify(toys))                       
                    }
                })
                arrayToys={}
                localStorage.setItem('arrayToys',JSON.stringify(arrayToys))
            });
         
        })
    }
    restoreSettings(){
        const screenContainer=document.querySelector('.screen-container')as HTMLElement
        screenContainer.addEventListener('click',(e)=>{
            if((e.target as HTMLElement).closest('.screen')){
                let screenId=(e.target as HTMLElement).closest('.screen')!.id
                console.log('screen', screenId)
                new UserSettings().restoreSaveSettings(treesSettings[`${screenId}`])
                console.log('resore settings');
                new UserSettings().getUserSettings()
                this.restoreToys(e)
            }
        })

    }
   async restoreToys(e:Event){
    await   new UserToys().createToysContainer()
       const area=document.querySelector('area') as HTMLElement
       const likToys=document.querySelector('.like-toys')!.querySelectorAll('.like-toys__img')  as NodeListOf<HTMLElement>       
       area!.innerHTML=''
       let screenId=(e.target as HTMLElement).closest('.screen')!.id              
       
        for(let treeToy in toys[`${screenId}`]){
            const img=document.createElement('img')
            img.classList.add('like-toys__img')
            img.src=`./assets/toys/${toys[`${screenId}`][treeToy][2]}.png`
            img.id=treeToy
            img.setAttribute('data-num', toys[`${screenId}`][treeToy][2])
            img.style.top=toys[`${screenId}`][treeToy][0]
            img.style.left=toys[`${screenId}`][treeToy][1]
            img.style.zIndex='3'
            // console.log('@@@@@@@@@@@@',toys[`${screenId}`][treeToy][0])
            area!.append(img)

            likToys.forEach(toy=>{
                if(toy.id===treeToy){
                    let containerToys=toy.parentNode as HTMLDivElement|null
                    let countToys=toy.parentNode!.parentNode?.querySelector('.user-toy__count') as HTMLElement                     
                    // console.log('!!!!!!!!', containerToys,countToys)
                    toy.remove()
                    countToys.textContent=(containerToys!.children.length).toString()
                }
            })
        }
        
       
    }
    saveToysBeforeUnReload(){
        window.addEventListener('beforeunload',()=>{
            const treeToys=document.querySelector('area')!.querySelectorAll('.like-toys__img') as NodeListOf<HTMLElement>
            treeToys.forEach(toy=>{
                arrayToys[toy.id]=[toy.style.top, toy.style.left,toy.getAttribute('data-num')]
            })
            localStorage.setItem('arrayToys',JSON.stringify(arrayToys))
        })
        window.addEventListener('load',()=>{

        })
    }
 
}
export default ScreenTree