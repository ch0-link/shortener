export type Template = (ctx?: any) => string

export interface TemplatePage {
  head: Template
  body: Template
}
