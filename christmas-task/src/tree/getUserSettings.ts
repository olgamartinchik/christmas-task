import Garland from './createGarland';
import SettingsTree from './createSettingsTree';
import Snow from './getSnow';

// const audio=document.querySelector('.audio') as HTMLElement
const music = new Audio();
music.src = '../assets/audio/audio.mp3';
export interface ISettings {
    isMute: boolean;
    isSnow: boolean;
    dataBg: string | null;
    dataTree: string | null;
    dataGarland: string | null;
    idGarland: string | null;
    isGarland: boolean;
}

export let settings: ISettings = {
    isMute: true,
    isSnow: false,
    dataBg: '1',
    dataTree: '1',
    dataGarland: 'multicolor',
    idGarland: '0',
    isGarland: false,
};
//  let isMute=true
//  let isSnow=false
if (localStorage.getItem('settings')) {
    settings.isSnow = Boolean(JSON.parse(localStorage.getItem('settings')!).isSnow);
    settings.isMute = Boolean(JSON.parse(localStorage.getItem('settings')!).isMute);
    settings.dataBg = JSON.parse(localStorage.getItem('settings')!).dataBg;
    settings.dataTree = JSON.parse(localStorage.getItem('settings')!).dataTree;
    settings.dataGarland = JSON.parse(localStorage.getItem('settings')!).dataGarland;
    settings.idGarland = JSON.parse(localStorage.getItem('settings')!).idGarland;
    settings.isGarland = Boolean(JSON.parse(localStorage.getItem('settings')!).isGarland);
}

class UserSettings {
    private playMusic(): void {
        music.play();
        music.volume = 0.03;
    }

    private toggleAudio(): void {
        const audio = document.querySelector('.audio') as HTMLElement;
        if (settings.isMute) {
            music.pause();
            audio!.classList.remove('play');
        } else {
            document.addEventListener('click', this.playMusic);
            audio!.classList.add('play');
        }
        console.log('isMute', settings.isMute);
        audio.removeEventListener('click', this.handleAudioToggle);
        audio.addEventListener('click', this.handleAudioToggle);
        audio.addEventListener('click', () => {
            document.removeEventListener('click', this.playMusic);
        });
    }

    private handleAudioToggle(): void {
        const audio = document.querySelector('.audio') as HTMLElement;
        console.log('settings', settings);
        audio!.classList.toggle('play');
        if (audio.classList.contains('play')) {
            settings.isMute = false;
            // this.playMusic()
            music.play();
            music.volume = 0.03;
            localStorage.setItem('settings', JSON.stringify(settings));
        } else {
            settings.isMute = true;
            music.pause();
            localStorage.setItem('settings', JSON.stringify(settings));
        }
        console.log('isMute', settings.isMute);
    }

    private toggleSnow(): void {
        const snowflake = document.querySelector('.snowflake') as HTMLElement;
        const snow = document.querySelector('.snow') as HTMLElement;
        // new Snow().getSnow()
        if (settings.isSnow) {
            snowflake.classList.add('active');
            snow!.classList.remove('hide');
            new Snow().getSnow();
        } else {
            snowflake.classList.remove('active');
            snow!.classList.add('hide');
            new Snow().clearInterval();
        }
        snowflake!.removeEventListener('click', this.handleSnowflakeClick);
        snowflake!.addEventListener('click', this.handleSnowflakeClick);
    }

    private handleSnowflakeClick(): void {
        const snowflake = document.querySelector('.snowflake') as HTMLElement;
        const snow = document.querySelector('.snow') as HTMLElement;

        snowflake.classList.toggle('active');
        settings.isSnow = snowflake.classList.contains('active');
        console.log('settings', settings);
        if (settings.isSnow) {
            snowflake.classList.add('active');
            snow!.classList.remove('hide');
            new Snow().getSnow();
        } else {
            snowflake.classList.remove('active');
            snow!.classList.add('hide');
            new Snow().clearInterval();
        }
        localStorage.setItem('settings', JSON.stringify(settings));
    }

    private toggleBackground(): void {
        const backgroundContainer = document.querySelector('.background-container') as HTMLElement;
        this.setBgTree(settings.dataBg!);
        new SettingsTree().buildTreeBg(+settings.dataBg!);
        backgroundContainer!.addEventListener('click', (e) => {
            if ((e.target as HTMLElement).closest('.background')) {
                const numBg = (e.target as HTMLElement).closest('.background')!.getAttribute('data-bg');
                settings.dataBg = numBg!;
                this.setBgTree(settings.dataBg);
                new SettingsTree().buildTreeBg(+settings.dataBg);

                localStorage.setItem('settings', JSON.stringify(settings));
            }
        });
    }

    private setBgTree(dataBg: string): void {
        const treeContainer = document.querySelector('.tree-container') as HTMLElement;
        treeContainer.style.backgroundImage = `url(../assets/bg/${dataBg}.jpg)`;
    }

    private setUserTree(dataTree: string): void {
        const userTree = document.querySelector('.user-tree') as HTMLImageElement;
        userTree.src = `./assets/tree/${dataTree}.png`;
    }

    private toggleTree(): void {
        const treeFormContainer = document.querySelector('.tree-form-container') as HTMLElement;
        new SettingsTree().buildTreeForm(+settings.dataTree!);

        this.setUserTree(settings.dataTree!);

        treeFormContainer.addEventListener('click', (e) => {
            if ((e.target as HTMLElement).closest('.form')) {
                const numTree = (e.target as HTMLElement).closest('.form')?.getAttribute('data-tree');
                settings.dataTree = numTree!;
                new SettingsTree().buildTreeForm(+settings.dataTree!);
                this.setUserTree(settings.dataTree!);
                localStorage.setItem('settings', JSON.stringify(settings));
            }
        });
    }

    private switchGarland() {
        const garlandContainer = document.querySelector('.garland-container') as HTMLElement;
        new SettingsTree().createGarlandBtn(+settings.idGarland!);
        new Garland().createGarland(settings.dataGarland!);
        garlandContainer!.addEventListener('click', (e) => {
            if ((e.target as HTMLElement).closest('.color-garland')) {
                settings.dataGarland = (e.target as HTMLElement)
                    .closest('.color-garland')!
                    .getAttribute('data-color-lite');
                settings.idGarland = (e.target as HTMLElement).closest('.color-garland')!.id;
                new SettingsTree().createGarlandBtn(+settings.idGarland);
                new Garland().createGarland(settings.dataGarland!);
                localStorage.setItem('settings', JSON.stringify(settings));
            }
        });
    }

    private onOfGarland() {
        const checkbox = document.querySelector('.checkbox') as HTMLInputElement;
        checkbox.checked = settings.isGarland;
        const garlandTreeContainer = document.querySelector('.garland-tree-container') as HTMLElement;
        if (checkbox.checked) {
            garlandTreeContainer.classList.remove('hide');
        } else {
            garlandTreeContainer.classList.add('hide');
        }
        checkbox.addEventListener('click', () => {
            settings.isGarland = checkbox.checked;
            if (checkbox.checked) {
                garlandTreeContainer.classList.remove('hide');
            } else {
                garlandTreeContainer.classList.add('hide');
            }
            localStorage.setItem('settings', JSON.stringify(settings));
        });
    }

    public getUserSettings() {
        this.toggleAudio();
        this.toggleSnow();
        this.toggleBackground();
        this.toggleTree();
        this.switchGarland();
        this.onOfGarland();
        console.log('settings', settings);
    }

    public resetUserSettings() {
        settings.isMute = true;
        settings.isSnow = false;
        settings.dataBg = '1';
        settings.dataTree = '1';
        settings.dataGarland = 'multicolor';
        settings.idGarland = '0';
        settings.isGarland = false;
    }

    public restoreSaveSettings(newSettings: ISettings) {
        settings = newSettings;
    }
}
export default UserSettings;
