function toast (options) {
    var validation = document.querySelector(options.validator)

    var autoRemove = setTimeout(function () {
        validation.removeChild(toast)
    }, options.duration + 1000)

    validation.onclick = function (e) {
        if(e.target.closest('.toast__close')) {
            validation.removeChild(toast)
            clearTimeout(autoRemove)
        }
    }

    if(validation) {
        var toast = document.createElement('div')
        var icon = options.icons[options.type]
        var delay = (options.duration / 1000).toFixed(2)
        toast.classList.add('toast',`toast--${options.type}`)
        toast.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`
        toast.innerHTML = `
            <div class="toast__icon">
                <i class="${icon}"></i>
            </div>
            <div class="toast__body">
                <h3 class="toast__title">${options.title}</h3>
                <p class="toast__msg">${options.message}</p>
            </div>
            <div class="toast__close">
                <i class="fa-solid fa-xmark"></i>
            </div>
        `
        validation.appendChild(toast)
    }
}

