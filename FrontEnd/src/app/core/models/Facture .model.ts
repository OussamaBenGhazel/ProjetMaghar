export class Facture {
  id?: number;
  numeroFactur?: string;
  montantTotal?: number;
  dateEmission?: string; // Date au format string
  dateEcheanc?: string; // Date au format string
  statu?: string; // Par exemple, "EN_ATTENTE"
  userI?: number;
  contratI?: number;

  constructor(data?: Partial<Facture>) {  // Accepte un objet de type Partial<Facture>
    this.id = data?.id;
    this.numeroFactur = data?.numeroFactur;
    this.montantTotal = data?.montantTotal;
    this.dateEmission = data?.dateEmission;
    this.dateEcheanc = data?.dateEcheanc;
    this.statu = data?.statu;
    this.userI = data?.userI;
    this.contratI = data?.contratI;
  }
}
