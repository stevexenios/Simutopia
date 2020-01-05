// JavaScript source code

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
		this.mutationRate = null;
		this.setMutationRate(this.label);

		// Initial genome generation is 0, only changes during cloning.
		this.generation = 0;
		
		// Genome cost (=sum of genes in genotype array) is dynamic generationally, but static for each generation.
		this.cost = 0;
		
		// Array containing the genes
		this.genotype = [];
		
		for (var i = 0; i < geneCount; i++) {
			this.genotype.push(new Gene(0));
		}
	}

	/**
	 * Function that sets mutation rate depending on the label
	 * @param label that marks biological (0), individual (1) or social learning (2)
	 */
	setMutationRate(label){
		if(label === 0){
			this.mutationRate = B_GENOME_MUTATION_RATE;
		} else if(label === 1){
			this.mutationRate = I_GENOME_MUTATION_RATE;
		} else {
			this.mutationRate = S_GENOME_MUTATION_RATE;
		}
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
			this.genotype[i].mutate(this.mutationRate);
		}
		//console.log("After: " + this.genotype[i].value);
	}

	/**
	 * Function to Clone Each Gene
	 */
	clone(){
		var clonedGenome = new Genome(GENE_COUNT, this.genomeLabel, this.mutationRate);
		clonedGenome.generation = this.generation + 1;
		for (var i = 0; i < GENE_COUNT; i++) {
			var clonedGene = this.genotype[i].clone();
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
		return genome.genotype.reduce(function(accumulator, i){return accumulator + i}, 0);
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
		if (mutationRate > Math.random()) {
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
