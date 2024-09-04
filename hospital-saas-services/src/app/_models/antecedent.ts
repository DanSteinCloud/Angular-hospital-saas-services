export class antecedentConjoint{
  age: number;
  groupeSanguin: string;
  id: number;
  nationalite: number;
  nombreEpouses: number;
  pathologie: number;
  poids: number;
  profession: string;
  rhesus: string;
  taille: number
}

export class  antecedentFamiliaux{
  id:number;
  mere:string;
  pere: string
}

export class antecedentMedicauxMere{
  autres: string;
  id: number;
  imc: number;
  maladies:string [];
  poids: number;
  tabac: string;
  taille: number;
  toxicomanie: string
}

export class antecedentGynecologique {
  gynecoAutres: string;
  gynecoPrecision: string;
  id: number;
  maladies: string [];
}
export class antecedentChirurgieMere{
  id: number;
  chirurAutres:string;
  chirurGyneco:string;
}

export class antecedentObstetricaux {
  accouchement: string;
  allaitement: string;
  annee: number;
  deroulementGrossesse: string;
  evolution: string;
  id: number;
  issue: string;
  poidsNne: number;
  sexeNne: string;
  terme: string;
}
