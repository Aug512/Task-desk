import { TypedUseSelectorHook, useSelector } from 'react-redux'
import state from '../store/reducer'

type stateType = ReturnType<typeof state>

export const useTypedSelector: TypedUseSelectorHook<stateType> = useSelector
