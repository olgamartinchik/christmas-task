import FiltersControls from './controlsContainer';

class ControlsPanel {
    buildControls() {
        const toysPageControls = document.querySelector('.toys-page__controls') as HTMLElement;
        toysPageControls.innerHTML = '';
        new FiltersControls().buildControlsContainer(toysPageControls);
    }
}
export default ControlsPanel;
