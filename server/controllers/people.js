import md5 from 'md5'

import { slugGenerate } from '../helpers/functions'
import invalid from '../helpers/validators'
import People from '../models/people'

export const getPeople = async (req, res) => {
  try {
    const { _id } = req.people
    const people = await People.findById(_id)
    if (people) return res.json(people)
    return res.status(404).json({ message: 'Pessoa não encontrada' })
  } catch (err) {
    return res.status(500).json({ message: 'Erro desconhecido ao buscar uma pessoa', err })
  }
}

export const createPeople = async (req, res) => {
  try {
    const {
      name, cpf, email, password,
      occupation, communityRelation, address
    } = req.body

    await People.findOne(
      {
        email
      }, async (err, people) => {
        if (err) throw err
        try {
          if (people) return res.status(400).json({ message: 'Pessoa já cadastrada' })
          if (invalid.email(email)) return res.status(400).json({ message: 'Email inválido' })
          if (invalid.peopleCPF(cpf)) return res.status(400).json({ message: 'CPF inválido' })
          if (invalid.address(address)) return res.status(400).json({ message: 'CEP inválido' })
          if (invalid.required(communityRelation)) return res.status(400).json({ message: 'Relação com a comunidade inválida' })
          if (invalid.required(occupation)) return res.status(400).json({ message: 'Ocupação inválida' })
          const newPeople = await new People({
            name,
            slug: slugGenerate(name),
            cpf,
            email,
            password: md5(password),
            occupation,
            communityRelation,
            address
          }).save()
          if (newPeople) {
            return res.json({ message: 'Pessoa cadastrada', community: { ...newPeople._doc } })
          } else {
            throw new Error(err)
          }
        } catch (err) {
          return res.status(500).json({ message: 'Erro desconhecido ao cadastrar pessoa', err })
        }
      }
    )
  } catch (err) {
    return res.status(500).json({ message: 'Erro desconhecido ao cadastrar pessoa', err })
  }
}

export const updatePeople = async (req, res) => {
  try {
    const { _id } = req.people
    const {
      name, cpf, newEmail,
      occupation, communityRelation, address,
      specialNeeds, controlledMedication, urgencies, phone
    } = req.body

    await People.findOne(
      {
        _id
      }, async (err, people) => {
        if (err) throw err
        if (!people) return res.status(404).json({ message: 'Pessoa não cadastrada' })
        if (newEmail && invalid.email(newEmail)) return res.status(400).json({ message: 'Email inválido' })
        if (invalid.peopleCPF(cpf)) return res.status(400).json({ message: 'CPF inválido' })
        if (invalid.address(address)) return res.status(400).json({ message: 'CEP inválido' })
        if (invalid.required(communityRelation)) return res.status(400).json({ message: 'Relação com a comunidade inválida' })
        if (invalid.required(occupation)) return res.status(400).json({ message: 'Ocupação inválida' })
        people.name = name || people.name
        people.cnpj = cpf || people.cpf
        people.slug = slugGenerate(people.name)
        people.email = newEmail || people.email
        people.occupation = occupation || people.occupation
        people.communityRelation = communityRelation || people.communityRelation
        people.address = address || people.address
        people.specialNeeds = specialNeeds || people.specialNeeds
        people.controlledMedication = controlledMedication || people.controlledMedication
        people.urgencies = urgencies || people.urgencies
        people.phone = phone || people.phone
        const newPeople = await people.save()
        return res.json({ message: 'Pessoa atualizada', people: { ...newPeople._doc } })
      }
    )
  } catch (err) {
    return res.status(500).json({ message: 'Erro desconhecido ao atualizar pessoa', err })
  }
}

export const updatePassword = async (req, res) => {
  try {
    const { _id } = req.people
    const { password, newPassword } = req.body
    await People.findOne(
      {
        _id,
        password: md5(password)
      }, async (err, people) => {
        if (err) throw err
        if (!people) return res.status(404).json({ message: 'Credenciais inválidas' })
        if (!newPassword) return res.status(404).json({ message: 'Nova senha inválida' })
        people.password = md5(newPassword)
        const newPeople = await people.save()
        return res.json({ message: 'Credenciais atualizadas', people: { ...newPeople._doc } })
      }
    )
  } catch (err) {
    return res.status(500).json({ message: 'Erro desconhecido ao atualizar as credenciais', err })
  }
}

export const removePeople = async (req, res) => {
  try {
    const { _id } = req.people
    const people = await People.deleteOne({ _id })
    if (people.deletedCount > 0) return res.json({ message: 'Pessoa removida com sucesso' })
    return res.status(404).json({ message: 'Pessoa não encontrada' })
  } catch (err) {
    return res.status(500).json({ message: 'Erro desconhecido ao remover pessoa', err })
  }
}
