function game (m, n) {
    // game est la fonction qui génère la grille du jeu
    let plateau = new Grille(m, n);
    return
}

class Cellule {
    // la plus petite entité de mon jeu de la vie
    constructor(posX, posY, etat = 0) {
        this.posX = posX;
        this.posY = posY;
        this.etat = etat;
    }
    changeEtat () {
        if (this.etat == 0) {
            this.etat = 1;
        } else {
            this.etat = 0;
        }
    }
}

class Grille {
    // la classe qui génère ma grille 
    constructor(m, n) {
        this.m = m;
        this.n = n;
        this.plateau = new Array(m);
        for (var i = 0; i < this.n; i++) {
            let ligne = new Array(n);
            for (var j = 0; j < this.n; j++) {
                ligne[j] = new Cellule(this.m, j);
            }
            this.plateau[i] = ligne;
        }
    }
}