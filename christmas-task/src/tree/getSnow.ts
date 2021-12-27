let intervalId: NodeJS.Timeout | null = null;
class Snow {
    private createSnowFlake() {
        const snow = document.querySelector('.snow') as HTMLElement;
        const snowFlake = document.createElement('i');
        snowFlake.classList.add('far', 'fa-snowflake');
        snowFlake.style.left = Math.random() * snow.offsetWidth + 'px';
        snowFlake.style.animationDuration = Math.random() * 3 + 2 + 's';
        snowFlake.style.opacity = Math.random().toString();
        snowFlake.style.fontSize = Math.random() * 10 + 10 + 'px';
        snow!.append(snowFlake);
        setTimeout(() => {
            snowFlake.remove();
        }, 5000);
    }

    public getSnow() {
        intervalId! = setInterval(this.createSnowFlake, 50);
    }

    public clearInterval() {
        clearInterval(intervalId!);
    }
}
export default Snow;
