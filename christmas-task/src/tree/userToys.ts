import {numLikeCards} from '../toys/selectionToy'
import ToysCard, { ICard } from '../toys/toysCards'

const userTreeContainer=document.querySelector('.user-tree-container')
class UserToys{
    data:ToysCard
    constructor(){
    this.data=new ToysCard()
    }
    createUserToy(toy:ICard):HTMLDivElement{
        const userToys=document.createElement('div')
        userToys.classList.add('user-toys')
        userToys.setAttribute('data-num',`${toy.num}`)
        let span=document.createElement('span')
        span.classList.add('user-toy__count')
        span.textContent=toy.count
        const likeToysContain=document.createElement('div')
        likeToysContain.classList.add('like-toys__contain');
        [...Array(+toy.count)].map(()=>{
            let img=document.createElement('img')
            img.classList.add('like-toys__img')
            img.src=`./assets/toys/${toy.num}.png`
            img.alt='toy'
            likeToysContain.append(img)
        });
        userToys.append(span,likeToysContain)
       
        return userToys
    }
async createToysContainer(){
    const likeToys=document.querySelector('.like-toys') as HTMLDivElement
    likeToys.innerHTML=''
    let userToys:HTMLDivElement
    let data=await this.data.getData()
     data.forEach((toy, ind)=>{
        
        if(numLikeCards.length===0){
             if(ind<=19)    {
                userToys=this.createUserToy(toy)
                likeToys.append(userToys!)
            }
        }else{
            numLikeCards.forEach(num=>{
                if(num===toy.num){
                     userToys=this.createUserToy(toy)
                     likeToys.append(userToys!)
                }
            }) 
        }
    })


}



}
export default UserToys