import { validateBr } from 'js-brasil'

export default {
  email: (email) => (!validateBr.email(email)),
  communityCNPJ: (cnpj) => (cnpj && !validateBr.cnpj(cnpj)),
  communityAddress: (address) => (!address || (address && !validateBr.cep(address.zipCode))),
  communityFinancialDetails: (financialDetails) => financialDetails && !validateBr.cnpj(financialDetails.doc) && !validateBr.cpf(financialDetails.doc)
}
