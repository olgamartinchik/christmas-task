import Garland from "./createGarland"
import SettingsTree from "./createSettingsTree"
import Snow from "./getSnow"

const audio=document.querySelector('.audio') as HTMLElement
const music=new Audio()
music.src='../assets/audio/audio.mp3'
interface ISettings{
    isMute:boolean,
    isSnow:boolean,
    dataBg:string|null;
    dataTree:string|null;
    dataGarland:string|null;
    idGarland:string|null;
    isGarland:boolean
}


let settings:ISettings={
    isMute:true,
    isSnow:false,
    dataBg:'1',
    dataTree:'1',
    dataGarland:'multicolor',
    idGarland:'0',
    isGarland:false,
}
//  let isMute=true
//  let isSnow=false
if(localStorage.getItem('settings')){
    settings.isSnow=Boolean(JSON.parse(localStorage.getItem('settings')!).isSnow)
    settings.isMute=Boolean(JSON.parse(localStorage.getItem('settings')!).isMute)
    settings.dataBg=JSON.parse(localStorage.getItem('settings')!).dataBg
    settings.dataTree=JSON.parse(localStorage.getItem('settings')!).dataTree
    settings.dataGarland=JSON.parse(localStorage.getItem('settings')!).dataGarland
    settings.idGarland=JSON.parse(localStorage.getItem('settings')!).idGarland
    settings.isGarland=Boolean(JSON.parse(localStorage.getItem('settings')!).isGarland)
}


class UserSettings{
  private  playMusic(){
        music.play();
        music.volume = 0.03;
    }
    toggleAudio(){      
        if(settings.isMute){           
            music.pause()
            audio!.classList.remove('play')                
        }else{
            document.addEventListener('click',this.playMusic)
            audio!.classList.add('play')
        }
        console.log('isMute',settings.isMute)
        audio.addEventListener('click',()=>{
            document.removeEventListener('click',this.playMusic)
            audio!.classList.toggle('play')
            if(audio.classList.contains('play')){
                settings.isMute=false
                this.playMusic()
                localStorage.setItem('settings',JSON.stringify(settings))
            }else{
                settings.isMute=true
                music.pause()
                localStorage.setItem('settings',JSON.stringify(settings))
            }
            console.log('isMute',settings.isMute)
          
        })
    }
    toggleSnow(){
        const snowflake=document.querySelector('.snowflake') as HTMLElement
        const snow =document.querySelector('.snow')as HTMLElement
        if(settings.isSnow){
            snowflake.classList.add('active')
            snow!.classList.remove('hide')
            new Snow().getSnow()
        }else{
            snowflake.classList.remove('active')
            snow!.classList.add('hide')
        }
        snowflake!.addEventListener('click', ()=>{
            snowflake.classList.toggle('active')
            if(snowflake.classList.contains('active')){
                settings.isSnow=true
                snow!.classList.remove('hide')
                new Snow().getSnow()
                localStorage.setItem('settings',JSON.stringify(settings))
            }else{
                snow!.classList.add('hide')
                settings.isSnow=false
                 localStorage.setItem('settings',JSON.stringify(settings))
            }
        })
    }
    toggleBackground(){
        const backgroundContainer=document.querySelector('.background-container')as HTMLElement
        this.setBgTree(settings.dataBg!)
        new SettingsTree().buildTreeBg(+settings.dataBg!)
        backgroundContainer!.addEventListener('click',(e)=>{
            if((e.target  as HTMLElement).closest('.background')){
               let numBg=(e.target  as HTMLElement).closest('.background')!.getAttribute('data-bg') ;
                settings.dataBg=numBg!
                this.setBgTree(settings.dataBg)
                new SettingsTree().buildTreeBg(+settings.dataBg)
                
                localStorage.setItem('settings',JSON.stringify(settings))
            }
        })
    }
    setBgTree(dataBg:string){
        const treeContainer=document.querySelector('.tree-container') as HTMLElement
        treeContainer.style.backgroundImage=`url(../assets/bg/${dataBg}.jpg)`
    }
    setUserTree(dataTree:string){
        const userTree=document.querySelector('.user-tree') as HTMLImageElement
        userTree.src=`./assets/tree/${dataTree}.png`
    }
    toggleTree(){
        const treeFormContainer=document.querySelector('.tree-form-container') as HTMLElement
        new SettingsTree().buildTreeForm(+settings.dataTree!)
        this.setUserTree(settings.dataTree!)
        treeFormContainer.addEventListener('click',(e)=>{
            if((e.target as HTMLElement).closest('.form')){
                let numTree=(e.target as HTMLElement).closest('.form')?.getAttribute('data-tree');
                settings.dataTree=numTree!
                new SettingsTree().buildTreeForm(+settings.dataTree!)
                this.setUserTree(settings.dataTree!)
                localStorage.setItem('settings',JSON.stringify(settings))
            }
        })
        
    }
    switchGarland(){
      const garlandContainer=document.querySelector('.garland-container')as HTMLElement
      new SettingsTree().createGarlandBtn(+settings.idGarland!)
      new Garland().createGarland(settings.dataGarland!)
      garlandContainer!.addEventListener('click',(e)=>{
          if((e.target as HTMLElement).closest('.color-garland')){
            settings.dataGarland=(e.target as HTMLElement).closest('.color-garland')!.getAttribute('data-color-lite')
            settings.idGarland=(e.target as HTMLElement).closest('.color-garland')!.id
            new SettingsTree().createGarlandBtn(+settings.idGarland)
            new Garland().createGarland(settings.dataGarland!)
            localStorage.setItem('settings',JSON.stringify(settings))
          }
      })
    }
    onOfGarland(){
        const checkbox=document.querySelector('.checkbox') as HTMLInputElement
        checkbox.checked=settings.isGarland
        const garlandTreeContainer=document.querySelector('.garland-tree-container') as HTMLElement
        if(checkbox.checked){
            garlandTreeContainer.classList.remove('hide')
        }else{
            garlandTreeContainer.classList.add('hide')
        }
        checkbox.addEventListener('click',()=>{
            settings.isGarland=checkbox.checked
            if(checkbox.checked){
                garlandTreeContainer.classList.remove('hide')
            }else{
                garlandTreeContainer.classList.add('hide')
            }
            localStorage.setItem('settings',JSON.stringify(settings))
        })

    }

    getUserSettings(){
        this.toggleAudio()
        this.toggleSnow()
        this.toggleBackground()
        this.toggleTree()
        this.switchGarland()
        this.onOfGarland()
        console.log('settings',settings)
    }
}
export default UserSettings