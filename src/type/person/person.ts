type Id = string | number;

type PersonCategory = "fisica" | "juridica";
type PersonDocuments = "cpf" | "rg" | "cnh" | "passport";
type PersonDocument = Partial<Record<PersonDocuments, string>>;

interface Entity {
  id: Id;
}

type Person = {
  name: string;
  category: PersonCategory;
  relationship?: Person[];
  [propname: string]: any;
} & Entity &
  PersonDocument;

const eu: Person = {
  id: 1,
  category: "fisica",
  name: "Rogerio Tristão Junior",
  hasNotebook: true
};

console.log(eu);
