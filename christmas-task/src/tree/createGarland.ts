type ArrayGarland={
    multicolor:string[],
    blue:string[],
    red:string[],
    yellow:string[],
    green:string[]
}
let colorGarland:ArrayGarland={
    multicolor:['#dc143c','#24e0ff','#ff0','#abff00'],
    blue:['#24e0ff'],
    yellow:['#ff0'],
    green:['#abff00'],
    red:['#dc143c']

}

class Garland{

    createGarland(dataAttribute:string='multicolor'){        
        
        const garlandTreeContainer=document.querySelector('.garland-tree-container') as HTMLElement
        garlandTreeContainer!.innerHTML=''
        
        for (let i=0; i<7;i++){
            const ul=document.createElement('ul')
            ul.classList.add('lightrope')
            
            for( let j=0 ;j<(i+1)*2; j++){
                let color=this.getRandomInt(0,colorGarland[`${dataAttribute}`].length-1)

                const li=document.createElement('li')
                li.style.backgroundColor=`${colorGarland[`${dataAttribute}`][color]}`
                ul.append(li)
            }
            garlandTreeContainer!.append(ul)
        }        
        window.addEventListener('load',()=>{     
            this.getHeightTree()
        })
        
        window.addEventListener(`resize`, event => {
            this.getHeightTree()        
          });

    }
    getHeightTree(){
        const imgHeight=document.querySelector('.user-tree') as HTMLElement
        const garlandTreeContainer=document.querySelector('.garland-tree-container') as HTMLElement
            let heightImg=imgHeight.getBoundingClientRect().height
            if(heightImg!==0){
                garlandTreeContainer.style.height=Math.floor(imgHeight.getBoundingClientRect().height )+'px'
            }
    }
    getRandomInt(min: number,max: number):number{
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


}
export default Garland