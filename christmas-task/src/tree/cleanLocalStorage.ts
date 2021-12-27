import UserSettings from './getUserSettings';
import ScreenTree from './saveUserTree';
import UserToys from './userToys';

class ResetMemoryTree {
    public cleanLocalMemory() {
        const resetTreeBtn = document.querySelector('.reset-treeBtn') as HTMLElement;
        resetTreeBtn!.addEventListener('click', this.handlerResetMemory);
    }

    public handlerResetMemory() {
        if (localStorage.getItem('settings')) {
            localStorage.removeItem('settings');
        }

        new UserSettings().resetUserSettings();
        new UserSettings().getUserSettings();

        new ScreenTree().cleanObjectToy();

        new UserToys().createToysContainer();
    }
}
export default ResetMemoryTree;
