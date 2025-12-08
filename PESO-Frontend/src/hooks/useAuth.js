import { useSelector } from 'react-redux'


export default function useAuth() {
const user = useSelector((s) => s.auth.user)
const token = useSelector((s) => s.auth.token)
return { user, token, isAuthenticated: Boolean(token) }
}