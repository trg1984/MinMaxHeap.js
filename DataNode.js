function DataNode(key, data) {
	this.key = key;
	this.data = data;
}

DataNode.prototype.key = function() { return this.key; }

DataNode.prototype.data = function() { return this.data; }

DataNode.prototype.compareTo = function(node) {
	if (typeof(this.key) === typeof(node.key)) return this.key - node.key;
	return 1;
}

DataNode.prototype.equals = function(obj) {
	if (this === obj) return true;
	if (obj instanceof Node) {
		
		return this.compareTo(obj) === 0;
	}
}