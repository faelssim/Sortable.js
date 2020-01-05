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
    _bind(el, 'mousedown', this._onMouseDown)
    _bind(el, 'dragover', this)
    _bind(el, 'dragenter', this)

}
Sortable.prototype = {
    constructor: Sortable, //TODO: why???
    _onMouseDown: function(ev) {
        let _self = this
        let el = this.el
        let options = this.options
        let target = ev.target
        if (options.disabled) {
            return
        }
        target = _closest(target, el)
        console.log(target)
    }
}
Sortable.create = function(el, options = {}) {
    return new Sortable(el, options)
}

function _bind(el, event, fn) {
    el.addEventListener(event, fn, false)
}
function _closest(el, ctx) {
    if (el) {
        return el
    }
    return null
}
export { Sortable }