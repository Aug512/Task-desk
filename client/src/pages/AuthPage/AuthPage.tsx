import React, { useState } from 'react'
import { useActions } from '../../middleware/useActions'
import { useTypedSelector } from '../../middleware/useTypedSelector'

const styles = require('./AuthPage.module.css')

const AuthPage: React.FC = () => {

  const [formData, setFormData] = useState({ login: '', password: '', saveData: true })

  const loading = useTypedSelector(state => state.showLoader)
  const { requestLogin, requestReg } = useActions()

  const formChangeHandler = (e: React.FormEvent<HTMLInputElement>): void => {

    setFormData({
      ...formData,
      [e.currentTarget.name]: e.currentTarget.name === 'saveData' ? e.currentTarget.checked : e.currentTarget.value
    })
  }

  return (
    <>
      <h1 className="text-center">Auth Page</h1>
      <form className={styles.formContainer} onSubmit={e => e.preventDefault()}>
        <div className="mb-3">
          <label htmlFor="login" className="form-label">Логин</label>
          <input
            type="text"
            pattern="[^А-Яа-яЁё\s]{5,}"
            className="form-control"
            id="login"
            name="login"
            value={formData.login}
            aria-describedby="emailHelp"
            placeholder="Введите логин"
            autoComplete='off'
            onChange={ e => formChangeHandler(e) }
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Пароль</label>
          <input
            type="password"
            pattern="[^А-Яа-яЁё\s]{8,}"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            placeholder="Введите пароль"
            autoComplete='off'
            onChange={ e => formChangeHandler(e) }
          />
        </div>
        <div className="mb-3">
          <input
            type='checkbox'
            id='saveData'
            name='saveData'
            defaultChecked={true}
            onChange={ e => formChangeHandler(e) }
          />
          <label htmlFor="saveData" className="form-label ml-2">Запомнить меня</label>
        </div>
        <div className={styles.buttonGroup}>
          <button
            className="btn btn-primary"
            onClick={() => {requestReg(formData)}}
            disabled={loading}
            type='button'
          >
            Зарегистрироваться
          </button>
          <button
            type='submit'
            className="btn btn-light"
            onClick={() => {requestLogin(formData)}}
            disabled={loading}
          >
            Войти
          </button>
        </div>
      </form>
    </>
  )
}

export default AuthPage
// export default connect(mapStateToProps, mapDispatchToProps)(AuthPage)
