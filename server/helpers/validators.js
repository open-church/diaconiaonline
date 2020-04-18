import { validateBr } from 'js-brasil'

export default {
  email: (email) => (!validateBr.email(email)),
  address: (address) => (!address || (address && !validateBr.cep(address.zipCode))),
  communityCNPJ: (cnpj) => (cnpj && !validateBr.cnpj(cnpj)),
  communityFinancialDetails: (financialDetails) => financialDetails && !validateBr.cnpj(financialDetails.doc) && !validateBr.cpf(financialDetails.doc),
  peopleCPF: (cpf) => (cpf && !validateBr.cpf(cpf)),
  required: (field) => (!field)
}
