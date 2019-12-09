
function Gene(gene){
	this.value = gene ? gene : 0;
}

Gene.prototype.clone = function () {
	var g = new Gene(this.value);
	return g;
};

Gene.prototype.mutate = function () {
	if (MUTATION_RATE > Math.random()) {
		if (Math.random() > 0.5) { this.value++; }
		else {
			this.value--;
			if (this.value < 0) {
				this.value = 0;
			}
		}
	}
};
