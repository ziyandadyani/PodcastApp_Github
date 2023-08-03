import { useState, useEffect, createContext } from "react";
import { supabase } from "../Config/supabase";
import PropTypes from "prop-types"

const AuthContext = createContext({ session: null, user: null, signOut: () => {} })

export default AuthContext

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState()
    const [session, setSession] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const setData = async () => {
            const { data: {session}, error } = await supabase.auth.getSession()
            if (error) throw error
            setSession(session)
            setUser(session?.user)
            setLoading(false)
        }

        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
            setUser(session?.user)
            setLoading(false)
        })

        setData()

        return () => {
            listener?.subscription.unsubscribe()
        }
    }, [])

    const value = {
        session,
        user,
        signOut: () => supabase.auth.signOut()
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

AuthProvider.propTypes = {
    children: PropTypes.any
}