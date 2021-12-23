const audio=document.querySelector('.audio') as HTMLElement
const music=new Audio()
music.src='../assets/audio/audio.mp3'
 let isMute=true

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
        snowflake!.addEventListener('click', ()=>{
            snowflake.classList.toggle('active')
        })
    }

    getUserSettings(){
        this.toggleAudio()
        this.toggleSnow()
    }
}
export default UserSettings