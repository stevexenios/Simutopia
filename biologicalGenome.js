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
	for (var i = 0; i < GENE_COUNT; i++) {
		this.genotype[i].mutate();
	}
};

Genome.prototype.clone = function () {
	var g = new Genome(this.geneCount);
	g.generation = this.generation + 1;
	g.cost = this.cost;
	g.genotype = [];

	for (var i = 0; i < this.geneCount; i++) {
		g.genotype.push(this.genotype[i]);
	}
	g.mutate();
	return g;
};

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
