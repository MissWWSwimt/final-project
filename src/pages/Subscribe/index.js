import React, { useState } from 'react'
import axios from 'axios'
import PageWrapper from '../../components/PageWrapper'

function Subscribe() {
  const [email, setEmail] = useState('')
  const [showExists, setShowExists] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const API = 'https://x1cz0kcbm8.execute-api.eu-central-1.amazonaws.com/?method=verifymail'

  const sendEmail = (event) => {
    event.preventDefault()
    axios
      .get(`${API}&email=${email}`)
      .then((response) => {
        const { data } = response
        showMessage(data)
      })
  }
  const showMessage = (data) => {
    console.log(data)
    switch (data) {
      case 'exists':
        setShowExists(true)
        console.log(showExists)
        setTimeout(() => setShowExists(false), 3000)
        break
      case 'success':
        setShowSuccess(true)
        setTimeout(() => setShowSuccess(false), 3000)
        break
    }
  }

  return (
    <PageWrapper>
      <div className="subscribe_form">
        <form className="subscribe" onSubmit={sendEmail}>
        <span>If you want to get notifications</span>
          <label htmlFor="email">Enter your email:</label>
          <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="submit" value="Отправить" />
        </form>
        {showExists && (
        <p>
          Данный адрес почты уже зарегистрирован
        </p>
        )}
        {showSuccess && (
        <p>
          Ваш адрес почты успешно зарегистрирован.
          Проверьте свой почтовый ящик и подтвердите email.
        </p>
        )}
      </div>
    </PageWrapper>
  )
}

export default Subscribe
