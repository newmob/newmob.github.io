export interface AccessInterface {
  id: String;
  access: String;
  refresh: String;
}

export interface Mensagem {
  mensagem: String[];
  contextos: any[];
  metadata?: any;
}
