// JavaScript source code

// ??? remove params from genome

/**
 * This is the genome class.
 * Each Agent has a genome. During genome construction,
 * each genome takes in:
 * @param geneCount the number of genes
 * @param genomeLabel the label of the genome:
 *  	-label 0: biological genome
 * 		-label 1: individual learning genome
 * 		-label 3: social learning genome
 * @param mutationRate the mutation rate for the particular genome,
 *  depending on the labels above 
 */
class Genome {
	constructor (geneCount, genomeLabel, mutationRate) {
		this.geneCount = geneCount;
		this.label = genomeLabel;
		this.mutationRate = mutationRate;
		
		// Initial genome generation is 0, only changes during cloning.
		this.generation = 0;

		// if(this.label === 0){ // Bio
		// 	this.costReproFactor = B_REPRODUCTION_FACTOR; // Default is 1
		// } else if(this.label === 1){ // Indi
		// 	this.costReproFactor = I_REPRODUCTION_FACTOR;
		// } else if( this.label === 2){ // Soci
		// 	this.costReproFactor = S_REPRODUCTION_FACTOR;
		// }
		
		// Array containing the genes
		this.genotype = [];
		// Genome cost (=sum of genes in genotype array) is dynamic generationally, but static for each generation.
		this.cost = 0; // Set in initGenoType
		this.initGenoType();
	}

	/**
	 * Function to initiate the genotype with Genes upto genecount.
	 */
	initGenoType(){
		for (var i = 0; i < this.geneCount; i++) {
			if(this.label === 0){ // Bio
				if(GENE_VALUE_DISTRIBUTION_CONSTANT){
					this.genotype.push(new Gene(0));
				} else if(GENE_VALUE_DISTRIBUTION_RANDOM){
					var val = randomInt(MAX_GENE_VALUE);
					this.genotype.push(new Gene(val));
					// console.log(val);
				}
			} else {
				this.genotype.push(new Gene(0));
			}
		}
		// console.log("0 :" + MAX_GENE_VALUE);
		// console.log("1 :" + GENE_VALUE_DISTRIBUTION_RANDOM);
		// console.log("2 :" + GENE_VALUE_DISTRIBUTION_CONSTANT);
		this.cost = this.genomeCost(this);
	}
	
	/**
	 * This function is called during reproduction and mutates the genome,
	 * by calling mutate for each gene in genotype.
	 * 
	 * Increases the generation of the preceding genome by 1,
	 * which becomes the generation of the newly mutated genome. 
	 */
	mutate(){
		this.generation++;
		for (var i = 0; i < GENE_COUNT; i++) {
			// console.log("Before Mutatetd: " + this.genotype[i].value);
			this.genotype[i].mutate(this.mutationRate);
			// console.log("Mutatetd: " + this.genotype[i].value);
		}
		//console.log(this.genotype);
	}

	/**
	 * Function to Clone Each Gene
	 */
	clone(){
		var clonedGenome = new Genome(GENE_COUNT, this.label, this.mutationRate);
		clonedGenome.generation = this.generation + 1;
		clonedGenome.genotype = [];
		for (var i = 0; i < GENE_COUNT; i++) {
			var clonedGene = this.genotype[i].clone();
			// console.log(clonedGene.value);
			clonedGenome.genotype.push(clonedGene);
		}
		clonedGenome.mutate();
		clonedGenome.cost = this.genomeCost(clonedGenome);
		return clonedGenome;
	}

	/**
	 * Function to calculate the cost of the given genome.
	 * @param genome 
	 */
	genomeCost(genome){
		return genome.genotype.reduce(function(accumulator, i){return accumulator + i.value}, 0);
	}
};

/** 
 * Gene class for the agents.
 * @param value  is a natural number. Values start at 0 at day 0, 
 * and change during mutation which occurs during reproduction.
 */ 
class Gene {
	constructor(gene) {
		this.value = gene ? gene : 0;
	}
	clone() {
		return new Gene(this.value);
	}
	mutate(mutationRate) {
		if (mutationRate > randomInt(100)) {
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
