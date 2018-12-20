module.exports = class RestService {
    constructor(method, endPoint, resource, parameters) {
        // método
        this._method = method;
        this.setMethod = function(method) { this._method = method; }
        this.getMethod = function() { return this._method; }

        // endPoint
        this._endPoint = endPoint;
        this.setEndPoint = function(endPoint) { this._endPoint = endPoint; }
        this.getEndPoint = function() { return this._endPoint; }

        // resource
        this._resource = resource;
        this.setResource = function(resource) { this._resource = resource; }
        this.getresource = function() { return this._resource; }

        // parameters
        this._parameters = parameters;
        this.setParameters = function(parameters) { this._parameters = parameters; }
        this.getParameters = function() { return this._parameters; }
    }
    
    url() {
        return this._endPoint + this._resource + this._parameters;
    }

};