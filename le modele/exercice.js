class Combatant {
    constructor(nom, pv, dmg, pos) {
        this.nom = nom;
        this.pv = pv;
        this.dmg = dmg;
        this.pos = [0, 0];
        function isClose (pos) {
            return (abs(pos.x - this.pos[0]) < 1 || abs(pos.y - this.pos[1]) < 1)
        }
        function subitDmg (dmg) {
            this.pv = this.pv - dmg;
            return ("AAAARGH")

        }
        function tape (adversaire) {
            if (adversaire.isClose(this.pos)) {
                adversaire.subitDmg(this.dmg);
            }
        }
    }
}

let Alyta = new Combatant("Alyta", "15", "3")
let Yougo = new Combatant("Yougo", "18", "3")

console.log(Alyta.tape(Yougo))
console.log(Yougo.isClose(Alyta))
