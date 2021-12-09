class App{
    public start():void{
        (document.querySelector('.main-page__button')as HTMLElement).addEventListener('click', ():void=>{
           (document.querySelector('.main-page') as HTMLElement).classList.add('hidden');  
           (document.querySelector('.nav__container')as HTMLElement).classList.remove('hidden');       
        })

    }
}
export default App