import faker from 'faker/locale/pt_BR'
import md5 from 'md5'

import { communityRelations, occupations } from '../helpers/enums'
import { slugGenerate } from '../helpers/functions'
import { randomNumber } from './functions'

export const getPeople = (code) => {
  return {
    token: faker.internet.password(),
    name: faker.name.findName(),
    slug: slugGenerate(faker.name.findName()),
    email: faker.internet.email(),
    password: md5('123456'),
    cpf: faker.internet.password(),
    communityCode: code,
    communityRelation: communityRelations[randomNumber(communityRelations.length)].name,
    occupation: occupations[randomNumber(occupations.length)].name,
    specialNeeds: {
      value: faker.random.boolean(),
      description: faker.lorem.word()
    },
    controlledMedication: {
      value: faker.random.boolean(),
      description: faker.lorem.word()
    },
    urgencies: faker.lorem.paragraph(),
    phone: faker.phone.phoneNumber(),
    address: {
      street: faker.address.streetName(),
      complement: faker.lorem.words(),
      number: faker.random.number(),
      neighborhood: faker.lorem.words(),
      state: faker.address.state(),
      country: faker.address.country(),
      zipCode: faker.address.zipCode()
    }
  }
}
