import Snow from "./getSnow"

const audio=document.querySelector('.audio') as HTMLElement
const music=new Audio()
music.src='../assets/audio/audio.mp3'
 let isMute=true
 let isSnow=false
if(localStorage.getItem('isSnow')){
    isSnow=JSON.parse(localStorage.getItem('isSnow')!)
}
 if(localStorage.getItem('isMute')){
    isMute=JSON.parse(localStorage.getItem('isMute')!)
 }

class UserSettings{
    playMusic(){
        music.play()
    }

    toggleAudio(){      
        if(isMute){           
            music.pause()
            audio!.classList.remove('play')                
        }else{
            document.addEventListener('click',this.playMusic)
            audio!.classList.add('play')
        }
        console.log('isMute',isMute)
        audio.addEventListener('click',()=>{
            document.removeEventListener('click',this.playMusic)
            audio!.classList.toggle('play')
            if(audio.classList.contains('play')){
                isMute=false
                this.playMusic()
                localStorage.setItem('isMute',JSON.stringify(isMute))
            }else{
                isMute=true
                music.pause()
                localStorage.setItem('isMute',JSON.stringify(isMute))
            }
            console.log('isMute',isMute)
          
        })
    }
    toggleSnow(){
        const snowflake=document.querySelector('.snowflake') as HTMLElement
        const snow =document.querySelector('.snow')as HTMLElement
        if(isSnow){
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
                isSnow=true
                snow!.classList.remove('hide')
              
                localStorage.setItem('isSnow',JSON.stringify(isSnow))
            }else{
                snow!.classList.add('hide')
                 isSnow=false
                 localStorage.setItem('isSnow',JSON.stringify(isSnow))
            }
        })
    }

    getUserSettings(){
        this.toggleAudio()
        this.toggleSnow()
    }
}
export default UserSettings