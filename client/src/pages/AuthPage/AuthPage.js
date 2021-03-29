import React, { useState } from 'react'
import { connect } from 'react-redux'
import { requestLogin, requestReg } from '../../store/actionCreators/setAuthorisation'

const mapStateToProps = state => {
  return {
    loading: state.showLoader
  }
}

const mapDispatchToProps = dispatch => {
  return {
    requestLogin: (data) => dispatch(requestLogin(data)),
    requestReg: (data) => dispatch(requestReg(data)),
  }
}

const AuthPage = ({ loading, requestLogin, requestReg}) => {
  const [formData, setFormData] = useState({ login: '', password: '' })

  const formChangeHandler = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <>
      <h1 className="text-center">Auth Page</h1>
      <form className="col-7 mr-auto ml-auto" onSubmit={e => e.preventDefault()}>
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
            onChange={ e => formChangeHandler(e) }
          />
        </div>
        <div className="m-3 row justify-content-between">
          <button
            className="btn btn-primary"
            onClick={() => {requestReg(formData)}}
            disabled={loading}
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

export default connect(mapStateToProps, mapDispatchToProps)(AuthPage)
