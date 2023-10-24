export class CompanyEntity {
  name: string
  email: string;
  created_at: Date

  constructor(partial: Partial<CompanyEntity>) {
    Object.assign(this, partial)
  }
}