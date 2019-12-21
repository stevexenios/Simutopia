// JavaScript source code
var IndividualLearningGenome = function (geneCount) {
	this.geneCount = geneCount;
	this.ilgenotype = [];
	this.generation = 0;
	this.cost = 0;

	for (var i = 0; i < this.geneCount; i++) {
		this.ilgenotype.push(new ILGene(0));
		this.cost += i;
	}
};

IndividualLearningGenome.prototype.mutate = function () {
	this.generation++;
	for (var i = 0; i < GENE_COUNT; i++) {
		this.ilgenotype[i].mutate();
	}
};

IndividualLearningGenome.prototype.clone = function () {
	var g = new IndividualLearningGenome(this.geneCount);
	g.generation = this.generation + 1;
	g.cost = this.cost;
	g.ilgenotype = [];

	for (var i = 0; i < this.geneCount; i++) {
		g.ilgenotype.push(this.ilgenotype[i]);
	}
	g.mutate();
	return g;
};

class ILGene {
	constructor(ilgene) {
		this.value = ilgene ? ilgene : 0;
	}
	clone() {
		var g = new ILGene(this.value);
		return g;
	}
	mutate() {
		if (INDIVIDUAL_LEARNING_RATE > Math.random()) {
			if (Math.random() > 0.5) {
				this.value++;
			}
			else {
				this.value--;
				if (this.value < 0) {
					this.value = 0;
				}
			}
		}
	}
}



