import UserSettings, { settings } from "./getUserSettings";

class resetMemoryTree{
    cleanLocalMemory(){
        const resetTreeBtn=document.querySelector('.reset-treeBtn') as HTMLElement
        resetTreeBtn!.addEventListener('click', this.handlerResetMemory)
    }
    handlerResetMemory(){
        
        if(localStorage.getItem('settings')){
            localStorage.removeItem('settings');        
          
        }
        
        new UserSettings().resetUserSettings()
        new UserSettings().getUserSettings()
    }


}
export default resetMemoryTree