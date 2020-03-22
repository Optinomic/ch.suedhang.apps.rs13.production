SvgComponent = Polymer({
    is: 'svg-component',

    _node: {},

    _namespace: 'http://www.w3.org/2000/svg',

    get rootElement() {
        if (this.parentNode.nodeName === 'SVG-CONTAINER')
            return this.parentNode.$.svg;
        else
            return this.parentNode._node;
    },

    factoryImpl: function (attributes) {
        for (var key in attributes)
            this.setAttribute(key, attributes[key]);
    },

    attached: function () {
        var is = this.attributes.is.value;

        if (is !== undefined) {
            this._node = document.createElementNS(this._namespace, is);

            for (var i = 0; i < this.attributes.length; i++) {
                if (this.attributes[i].name !== 'is')
                    this._node.setAttribute(this.attributes[i].name, this.attributes[i].value);
            }
            this.rootElement.appendChild(this._node);
        }
    }
});