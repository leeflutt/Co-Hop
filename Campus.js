class Campus {
    constructor(data) {
        this.cdp = data.CODE_POSTAL;
        this.id_campus = data.ID_CAMPUS;
        this.nom = data.NOM ;
        this.nom_rue = data.NOM_RUE;
        this.num_rue = data.NUMERO_RUE;
        this.ville = data.VILLE;
    }
}

export default Campus; 