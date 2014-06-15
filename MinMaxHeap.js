function MinMaxHeap() {	this.content = []; }

MinMaxHeap.prototype.left = function(index) { return 2 * index + 1; }

MinMaxHeap.prototype.right = function(index) { return 2 * index + 2; }

MinMaxHeap.prototype.parent = function(index) { return index > 0 ? (index - 1) / 2 | 0 : -1; }

MinMaxHeap.prototype.swap = function(i1, i2) {
	var temp = this.content[i1];
	this.content[i1] = this.content[i2];
	this.content[i2] = temp;
}

MinMaxHeap.prototype.extractMin = function() {
	if (this.content.length === 0) return null;
	else {
		this.swap(0, this.content.length - 1);
		var extracted = this.content.splice(this.content.length - 1, 1)[0];
		this.validateDown(0);
		
		return extracted;
	}
}

MinMaxHeap.prototype.extractMax = function() {
	if (this.content.length === 0) return null;
	else {
		if (this.content.length <= 2) return this.content.splice(this.content.length - 1, 1)[0];
		else {
			var greatestIndex = (this.content[1].compareTo(this.content[2]) >= 0) ? 1 : 2;
			
			this.swap(greatestIndex, this.content.length - 1);
			var extracted = this.content.splice(this.content.length - 1, 1)[0];
			this.validateDown(greatestIndex);
			
			return extracted;
		}
	}
}

MinMaxHeap.prototype.insert = function(node) {
	this.content.push(node);
	var minLevel = Math.floor(Math.log(this.content.length) / Math.log(2)) % 2 === 0;
	
	if (
		(this.content.length > 1) &&
		(
			( minLevel && (node.compareTo(this.content[this.parent(this.content.length - 1)]) > 0)) ||
			(!minLevel && (node.compareTo(this.content[this.parent(this.content.length - 1)]) < 0))
		)
	) {
		this.swap(this.content.length - 1, this.parent(this.content.length - 1));
		this.validateUp(this.parent(this.content.length - 1));
	}
	else this.validateUp(this.content.length - 1);
}

MinMaxHeap.prototype.validateUp = function(nodeIndex) {
	if (this.parent(this.parent(nodeIndex)) >= 0) {
		
		var node = this.content[nodeIndex];
		var grandParent = this.content[this.parent(this.parent(nodeIndex))];
		var minLevel = Math.floor(Math.log(nodeIndex + 1) / Math.log(2)) % 2 == 0;
		
		if (
			( minLevel && (node.compareTo(grandParent) < 0)) ||
			(!minLevel && (node.compareTo(grandParent) > 0))
		) {
			this.swap(nodeIndex, this.parent(this.parent(nodeIndex)));
			this.validateUp(this.parent(this.parent(nodeIndex))); // Validate the grandparent recursively
		}
	}
}

MinMaxHeap.prototype.validateDown = function(nodeIndex) {
	if (
		(0 <= nodeIndex) &&
		(nodeIndex <= this.parent(this.content.length - 1))
	) {
		var m;
		var best = -1;
		var minLevel = (Math.floor(Math.log(nodeIndex + 1) / Math.log(2)) % 2) == 0;
		var node = this.content[nodeIndex];
		
		for(var i = 0; i < 6; ++i) {
			switch (i) {
				case 0  : m = this.left(this.left(nodeIndex)); break;		// Leftmost grandchild
				case 1  : m = this.left(this.right(nodeIndex)); break;		// Second grandchild from left
				case 2  : m = this.right(this.left(nodeIndex)); break;		// Second grandchild from right
				case 3  : m = this.right(this.right(nodeIndex)); break;		// Rightmost grandchild
				case 4  : m = this.left(nodeIndex); break;					// Left child
				default : m = this.right(nodeIndex); break;					// Right child
			}
			if (
				(m < this.content.length) &&
				(
					( minLevel && node.compareTo(this.content[m]) > 0) ||
					(!minLevel && node.compareTo(this.content[m]) < 0)
				)
			) {
				node = this.content[m];
				best = m;
			}
		}
		if (node.compareTo(this.content[nodeIndex]) !== 0) {
			
			if (this.parent(this.parent(best)) === nodeIndex) {
				
				node = this.content[best];
				if (
					( minLevel && node.compareTo(this.content[nodeIndex]) < 0) ||
					(!minLevel && node.compareTo(this.content[nodeIndex]) > 0)
				) {
					this.swap(best, nodeIndex);
					node = this.content[best];
					if (
						( minLevel && node.compareTo(this.content[this.parent(best)]) > 0) ||
						(!minLevel && node.compareTo(this.content[this.parent(best)]) < 0)
					) this.swap(best, this.parent(best));
					
					this.validateDown(best);
				}
			}
			else {
				node = this.content[best];
				if (
					( minLevel && node.compareTo(this.content[nodeIndex]) < 0) ||
					(!minLevel && node.compareTo(this.content[nodeIndex]) > 0)
				) this.swap(nodeIndex, best);
			}
		}
	}
}