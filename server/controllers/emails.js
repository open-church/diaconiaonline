import sendgrid from '@sendgrid/mail'

export const sendResetPassword = async (email, newPassword) => {
  try {
    sendgrid.setApiKey(process.env.SENDGRID_KEY)
    const msg = {
      to: email,
      from: 'diaconiaon@gmail.com',
      subject: 'Diaconia.online - Nova senha',
      html: `Olá,
      <br/><br/>Você solicitou uma nova senha na plataforma <strong>Diaconia.online</strong>.
      <br/>Seguem as novas credenciais:
      <ul>
      <li><strong>Email:</strong> ${email}</li>
      <li><strong>Senha:</strong> ${newPassword}</li>
      </ul>
      <br/><br/>Obrigado por usar a <strong>Diaconia.online</strong>`
    }
    await sendgrid.send(msg)
    return true
  } catch (err) {
    console.log('resetPassword: ', err)
    return false
  }
}
