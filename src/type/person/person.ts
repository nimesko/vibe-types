export type Id = string | number;

export type PersonCategory = "fisica" | "juridica";
export type PersonDocuments = "cpf" | "rg" | "cnh" | "passport";
export type PersonDocument = Partial<Record<PersonDocuments, string>>;

export interface Entity {
  id: Id;
}

export type Person = {
  name: string;
  category?: PersonCategory;
  relationship?: Person[];
  [propname: string]: any;
} & Partial<Entity> &
  PersonDocument;

const eu: Person = {
  id: 1,
  category: "fisica",
  name: "Rogerio Tristão Junior",
  hasNotebook: true
};

console.log(eu);
