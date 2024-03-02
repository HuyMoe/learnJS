var tabs = document.querySelectorAll('.tab-item')
var panes = document.querySelectorAll('.tab-pane')
var tabActive = document.querySelector('.tab-item.active')
var lineActive = document.querySelector('.tabs .line')

lineActive.style.left = tabActive.offsetLeft + 'px'
lineActive.style.width = tabActive.offsetWidth + 'px'

tabs.forEach(function(tab, index) {
    var pane = panes[index]
    
    tab.onclick = function() {
        document.querySelector('.tab-item.active').classList.remove('active')
        tab.classList.add('active')

        document.querySelector('.tab-pane.active').classList.remove('active')
        pane.classList.add('active')

        lineActive.style.left = tab.offsetLeft + 'px'
        lineActive.style.width = tab.offsetWidth + 'px'
    }
})

