import { Exclude } from "class-transformer";
import { CreateCompanyDto } from "../dto/company.dto";

export class CompanyEntity extends CreateCompanyDto {
  @Exclude()
  password: string;

  constructor(partial: Partial<CompanyEntity>) {
    super()

    Object.assign(this, partial);
  }
}