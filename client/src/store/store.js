import { createStore, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'
import { loginRequestWatcher, regRequestWatcher } from './sagas'
// import { requestProjectsWatcher, createProjectWatcher, requestProjectByIdWatcher, saveProjectWatcher, removeProjectWatcher } from './sagas'
import { requestProjectsWatcher, createProjectWatcher, removeProjectWatcher } from './sagas'
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './reducer'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(reducer, composeWithDevTools(applyMiddleware(sagaMiddleware)))

sagaMiddleware.run(loginRequestWatcher)
sagaMiddleware.run(regRequestWatcher)

sagaMiddleware.run(requestProjectsWatcher)
sagaMiddleware.run(createProjectWatcher)
// sagaMiddleware.run(requestProjectByIdWatcher)
// sagaMiddleware.run(saveProjectWatcher)
sagaMiddleware.run(removeProjectWatcher)

export default store
