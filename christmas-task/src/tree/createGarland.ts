let array:string[]=['#dc143c','#24e0ff','#ff0','#abff00']

class Garland{

    createGarland(){        
        
        const garlandTreeContainer=document.querySelector('.garland-tree-container') as HTMLElement
        garlandTreeContainer!.innerHTML=''
        for (let i=0; i<5;i++){
            const ul=document.createElement('ul')
            ul.classList.add('lightrope')
            
            for( let j=0 ;j<(i+1)*2; j++){
                let color=this.getRandomInt(0,array.length-1)

                const li=document.createElement('li')
                li.style.backgroundColor=`${array[color]}`
                ul.append(li)
            }
            garlandTreeContainer!.append(ul)
        }
  

    }
    getRandomInt(min: number,max: number):number{
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


}
export default Garland