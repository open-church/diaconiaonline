import faker from 'faker/locale/pt_BR'

import { slugGenerate } from '../helpers/functions'

export const getCommunity = (code) => {
  const name = faker.company.companyName()
  return {
    token: faker.internet.password(),
    name: name,
    slug: slugGenerate(name),
    email: faker.internet.email().toLowerCase(),
    password: faker.internet.password(),
    cnpj: faker.random.number().toString(),
    stock: {
      money: faker.finance.amount(),
      basicBaskets: faker.random.number(),
      hygieneProducts: faker.random.number(),
      ppe: faker.random.number()
    },
    code,
    financialDetails: {
      accountName: faker.finance.accountName(),
      bank: faker.random.number(),
      agency: faker.random.number(),
      account: faker.random.number(),
      doc: faker.internet.password()
    },
    phone: faker.phone.phoneNumber(),
    address: {
      street: faker.address.streetName(),
      complement: faker.lorem.words(),
      number: faker.random.number(),
      neighborhood: faker.lorem.words(),
      state: faker.address.state(),
      country: 'BR',
      zipCode: faker.address.zipCode().replace('-', '')
    }
  }
}
