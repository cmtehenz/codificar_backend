interface ITemplateVariables {
  [key: string]: string | number;
}

export default interface IteDTO {
  file: string;
  variables: ITemplateVariables;
}
