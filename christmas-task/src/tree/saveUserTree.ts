import html2canvas from "html2canvas"


class ScreenTree{
    saveTree(){
        const screenContainer=document.querySelector('.screen-container')as HTMLElement
        const treeContainer=document.querySelector('.tree-container')as HTMLElement
        const saveBtn=document.querySelector('.save-btn') as HTMLElement
        saveBtn!.addEventListener('click',()=>{
            html2canvas(treeContainer).then(canvas => {
                canvas.classList.add('screen')
                screenContainer.appendChild(canvas)
            });
        })
    }
}
export default ScreenTree