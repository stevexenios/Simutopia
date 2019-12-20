// JavaScript source code
var Genome = function (geneCount) {
	this.geneCount = geneCount;
	
	// Normal Genotype
	this.bioGenotype = [];
	// Array for Individual Learning
	this.indGenotype = [];
	// Array for Social Learning 
	this.socGenotype = [];

	this.generation = 0;
	this.cost = 0;

	for (var i = 0; i < geneCount; i++) {
		this.bioGenotype.push(new Gene(0));
		this.indGenotype.push(new Gene(0));
		this.socGenotype.push(new Gene(0));
		this.cost += i;
	}
};

Genome.prototype.mutate = function () {
	this.generation++;
	for (var i = 0; i < GENE_COUNT; i++) {
		this.bioGenotype[i].mutate();
		this.indGenotype[i].mutate();
		this.socGenotype[i].mutate();
	}
};

Genome.prototype.clone = function () {
	var g = new Genome(this.geneCount);
	g.generation = this.generation + 1;
	g.cost = this.cost;
	g.bioGenotype = [];
	// Array for Individual Learning
	g.indGenotype = [];
	// Array for Social Learning 
	g.socGenotype = [];
	for (var i = 0; i < this.geneCount; i++) {
		var bio = this.bioGenotype[i].clone();
		var ind = this.indGenotype[i].clone();
		var soc = this.socGenotype[i].clone();
		g.bioGenotype.push(bio);
		g.indGenotype.push(ind);
		g.socGenotype.push(soc);
	}
	g.mutate();
	return g;
};

