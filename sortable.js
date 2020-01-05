const Sortable = function(el, options) {
    if (!(el && el.nodeType && el.nodeType === 1)) {
        throw new Error('sortable: 参数el必须是一个HTMLElement')
    }
    const defaults = {
        direction: 'horizon', // horizon-水平 vertical-垂直
        ghostClass: '',
        chosenClass: '',
        dragClass: '',
    }
    this.el = el
    this.options = Object.assign({}, defaults, options)
    // bind all private methods
    for (let fn in this) {
        if (fn.charAt(0) === '_' && typeof this[fn] === 'function') {
            this[fn] = this[fn].bind(this);
        }
    }
    // bind some events
    $bind(el, 'mousedown', this._onMouseDown)
    $bind(el, 'dragover', this)
    $bind(el, 'dragenter', this)

}
Sortable.prototype = {
    constructor: Sortable, //TODO: why???
    _onMouseDown: function(ev) {
        let el = this.el
        let options = this.options
        let target = ev.target
        let startIndex
        if (options.disabled) {
            return
        }
        target = $closest(target, el)
        if (!target) {
            return
        }
        startIndex = $index(target)
        this._prepareDragStart(ev, target, startIndex)
    },
    _prepareDragStart: function(ev, target, startIndex) {
        let el = this.el
        let options = this.options
        let ownerDocument = el.ownerDocument
        let dragStartFn
        if (target && (target.parentNode === el)) {
            let rootEl = el
            let dragEl = target
            let parentEl = dragEl.parentNode
            let nextEl = dragEl.nextSibing
            let oldIndex = startIndex
        }
    }
}
Sortable.create = function(el, options = {}) {
    return new Sortable(el, options)
}

function $bind(el, event, fn) {
    el.addEventListener(event, fn, false)
}
function $closest(el, ctx) {
    if (el) {
        return el
    }
    return null
}
function $index(el) {
    let index = 0
    if (!el || !el.parentNode) {
        return -1
    }
    while(el) {
        index++
        el = el.previousElementSibling
    }
    return index
}
export { Sortable }