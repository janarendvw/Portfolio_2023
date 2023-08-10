const options = ['possibilites', 'ideas', 'solutions', 'opportunities', 'potential'];
const swapText = () => {
    const text = document.querySelector('.swap-text');
    let index = 0;
    setInterval(() => {
        if(!text) return;
        text.innerHTML = options[index];
        index++;
        if (index === options.length)
            index = 0;
    }, 2000);
}

export default swapText;