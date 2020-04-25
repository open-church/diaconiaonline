import md5 from 'md5'

import { slugGenerate } from '../helpers/functions'
import invalid from '../helpers/validators'
import Community from '../models/community'

export const getCommunity = async (req, res) => {
  try {
    const { _id } = req.community
    const community = await Community.findById(_id)
    if (community) return res.json(community)
    return res.status(404).json({ message: 'Comunidade não encontrada' })
  } catch (err) {
    return res.status(500).json({ message: 'Erro desconhecido ao buscar uma comunidade', err })
  }
}

export const getMembers = async (req, res) => {
  try {

  } catch (err) {
    return res.status(500).json({ message: 'Erro desconhecido ao buscar membros da comunidade', err })
  }
}

const codeGenerate = async () => {
  let community = true
  let code = null
  while (community) {
    code = Math.floor(Date.now() / 1000).toString()
    code = code.substr(code.length - 6, code.length)
    community = await Community.findOne({ code })
  }
  return code
}

export const createCommunity = async (req, res) => {
  try {
    const {
      name, cnpj, email, password,
      stock, financialDetails, address
    } = req.body

    await Community.findOne(
      {
        $or: [{ cnpj }, { email }]
      }, async (err, community) => {
        if (err) throw err
        try {
          if (community) return res.status(400).json({ message: 'Comunidade já cadastrada' })
          if (invalid.email(email)) return res.status(400).json({ message: 'Email inválido' })
          if (invalid.communityCNPJ(cnpj)) return res.status(400).json({ message: 'CNPJ inválido' })
          if (invalid.address(address)) return res.status(400).json({ message: 'CEP inválido' })
          if (invalid.communityFinancialDetails(financialDetails)) return res.status(400).json({ message: 'CPF/CNPJ da conta bancária é inválido' })
          const code = await codeGenerate()
          const newCommunity = await new Community({
            name,
            slug: slugGenerate(name),
            cnpj,
            code,
            email,
            password: md5(password),
            stock,
            financialDetails,
            address
          }).save()
          if (newCommunity) {
            return res.json({ message: 'Comunidade cadastrada', community: { ...newCommunity._doc } })
          } else {
            throw new Error(err)
          }
        } catch (err) {
          return res.status(500).json({ message: 'Erro desconhecido ao cadastrar comunidade', err })
        }
      }
    )
  } catch (err) {
    return res.status(500).json({ message: 'Erro desconhecido ao cadastrar comunidade', err })
  }
}

export const updateCommunity = async (req, res) => {
  try {
    const { _id } = req.community
    const {
      name, cnpj, newEmail,
      stock, financialDetails, address
    } = req.body

    await Community.findOne(
      {
        _id
      }, async (err, community) => {
        if (err) throw err
        if (!community) return res.status(404).json({ message: 'Comunidade não cadastrada' })
        if (newEmail && invalid.email(newEmail)) return res.status(400).json({ message: 'Email inválido' })
        if (invalid.communityCNPJ(cnpj)) return res.status(400).json({ message: 'CNPJ inválido' })
        if (invalid.address(address)) return res.status(400).json({ message: 'CEP inválido' })
        if (invalid.communityFinancialDetails(financialDetails)) return res.status(400).json({ message: 'CPF/CNPJ da conta bancária é inválido' })
        community.name = name || community.name
        community.cnpj = cnpj || community.cnpj
        community.slug = slugGenerate(community.name)
        community.email = newEmail || community.email
        community.stock = stock || community.stock
        community.financialDetails = financialDetails || community.financialDetails
        community.address = address || community.address
        const newCommunity = await community.save()
        return res.json({ message: 'Comunidade atualizada', community: { ...newCommunity._doc } })
      }
    )
  } catch (err) {
    return res.status(500).json({ message: 'Erro desconhecido ao atualizar comunidade', err })
  }
}

export const updatePassword = async (req, res) => {
  try {
    const { _id } = req.community
    const { password, newPassword } = req.body
    await Community.findOne(
      {
        _id,
        password: md5(password)
      }, async (err, community) => {
        if (err) throw err
        if (!community) return res.status(404).json({ message: 'Credenciais inválidas' })
        if (!newPassword) return res.status(404).json({ message: 'Nova senha inválida' })
        community.password = md5(newPassword)
        const newCommunity = await community.save()
        return res.json({ message: 'Credenciais da comunidade atualizadas', community: { ...newCommunity._doc } })
      }
    )
  } catch (err) {
    return res.status(500).json({ message: 'Erro desconhecido ao atualizar as credenciais da comunidade', err })
  }
}

export const removeCommunity = async (req, res) => {
  try {
    const { _id } = req.community
    const community = await Community.deleteOne({ _id })
    if (community.deletedCount > 0) return res.json({ message: 'Comunidade removida com sucesso' })
    return res.status(404).json({ message: 'Comunidade não encontrada' })
  } catch (err) {
    return res.status(500).json({ message: 'Erro desconhecido ao remover comunidade', err })
  }
}
