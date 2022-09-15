class Trajet {
    constructor(dir, depart, arrivee, nbPlaces, date, time) {
        this.dir = dir;
        this.depart = dir == 'Direction Maison' ? depart : undefined;
        this.arrivee = dir == 'Direction Campus' ? arrivee : undefined ;
        this.nbPlaces = nbPlaces;
        this.date = date;
        this.time = time;
    }
}

export default Trajet; 