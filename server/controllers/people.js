import md5 from 'md5'

import { slugGenerate, passwordGenerate } from '../helpers/functions'
import invalid from '../helpers/validators'
import Community from '../models/community'
import People from '../models/people'
import { createToken } from './auth'
import { sendResetPassword } from './emails'

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
      name, cpf, email, password, communityCode,
      occupation, communityRelation, address, accept
    } = req.body

    const community = await Community.findOne({ code: communityCode })
    if (!community) return res.status(400).json({ message: 'Código de comunidade não encontrado' })

    await People.findOne(
      {
        email
      }, async (err, people) => {
        if (err) throw err
        try {
          if (!accept) return res.status(400).json({ message: 'Termos de uso precisam ser aceitos' })
          if (people) return res.status(400).json({ message: 'Pessoa já cadastrada' })
          if (invalid.email(email)) return res.status(400).json({ message: 'Email inválido' })
          if (invalid.peopleCPF(cpf)) return res.status(400).json({ message: 'CPF inválido' })
          if (invalid.address(address)) return res.status(400).json({ message: 'CEP inválido' })
          const token = createToken({ id: md5(new Date()) })
          const newPeople = await new People({
            accept,
            token,
            name,
            communityCode,
            slug: slugGenerate(name),
            cpf,
            email,
            password: md5(password),
            occupation,
            communityRelation,
            address
          }).save()
          if (newPeople) {
            return res.json({ message: 'Pessoa cadastrada', people: { ...newPeople._doc } })
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
      name, cpf, newEmail, accept,
      occupation, communityRelation, address,
      specialNeeds, controlledMedication, urgencies, phone
    } = req.body

    await People.findOne(
      {
        _id
      }, async (err, people) => {
        if (err) throw err
        if (!accept) return res.status(400).json({ message: 'Termos de uso precisam ser aceitos' })
        if (!people) return res.status(404).json({ message: 'Pessoa não cadastrada' })
        if (newEmail && invalid.email(newEmail)) return res.status(400).json({ message: 'Email inválido' })
        if (invalid.peopleCPF(cpf)) return res.status(400).json({ message: 'CPF inválido' })
        if (invalid.address(address)) return res.status(400).json({ message: 'CEP inválido' })
        people.accept = accept || people.accept
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

export const resetPassword = async (req, res) => {
  try {
    const { email } = req.body
    await People.findOne(
      {
        email
      }, async (err, people) => {
        if (err) throw err
        if (!people) return res.status(404).json({ message: 'Email não cadastrado' })
        const newPassword = passwordGenerate()
        people.password = md5(newPassword)
        await people.save()
        if (await sendResetPassword(email, newPassword)) {
          return res.json({ message: 'Senha alterada e enviada por email' })
        } else {
          throw err
        }
      }
    )
  } catch (err) {
    return res.status(500).json({ message: 'Erro desconhecido ao atualizar as credenciais da comunidade', err })
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
