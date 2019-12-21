// JavaScript source code
var SocialLearningGenome = function (geneCount) {
	this.geneCount = geneCount;
	this.slgenotype = [];
	this.generation = 0;
	this.cost = 0;

	for (var i = 0; i < geneCount; i++) {
		this.slgenotype.push(new Gene(0));
		this.cost += i;
	}
};

SocialLearningGenome.prototype.mutate = function () {
	this.generation++;
	for (var i = 0; i < GENE_COUNT; i++) {
		this.slgenotype[i].mutate();
	}
};

SocialLearningGenome.prototype.clone = function () {
	var g = new SocialLearningGenome(this.geneCount);
	g.generation = this.generation + 1;
	g.cost = this.cost;
	g.slgenotype = [];

	for (var i = 0; i < this.geneCount; i++) {
		g.slgenotype.push(this.slgenotype[i]);
	}
	g.mutate();
	return g;
};

function SLGene(slgene){
	this.value = slgene ? slgene : 0;
}

SLGene.prototype.clone = function () {
	var g = new SLGene(this.value);
	return g;
};

SLGene.prototype.mutate = function () {
	if (SOCIAL_LEARNING_RATE > Math.random()) {
		if (Math.random() > 0.5) { this.value++; }
		else {
			this.value--;
			if (this.value < 0) {
				this.value = 0;
			}
		}
	}
};
