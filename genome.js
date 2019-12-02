// JavaScript source code
var Genome = function (geneCount) {
	this.geneCount = geneCount;
	this.genotype = [];
	this.generation = 0;
	this.cost = 0;

	for (var i = 0; i < geneCount; i++) {
		this.genotype.push(new Gene(0));
		this.cost += i;
	}
};

Genome.prototype.mutate = function () {
	this.generation++;
	if (Math.random() > 0.5) {
		this.genotype.forEach(element => element.mutate());
	}
};

Genome.prototype.clone = function () {
	var g = new Genome(this.geneCount);
	g.generation = this.generation + 1;
	g.cost = this.cost;
	g.genotype = [];
	for (var i = 0; i < this.geneCount; i++) {
		var d = this.genotype[i].clone();
		g.genotype.push(d);
	}
	return g;
};

