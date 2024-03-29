import { useEffect, useState } from "react";

const useUser = (email: string) => {
    const [loggedInUser, setLoggedInUser] = useState<any>([])
    const [userLoading, setUserLoading] = useState(true);
    //Get User Access Token
    const accessToken = localStorage.getItem('AccessToken');
    useEffect(() => {
        const getUser = async () => {
            const res = await fetch(`http://localhost:3000/user?email=${email}`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            })
            const data = await res.json();
            setLoggedInUser(data[0])
            setUserLoading(false)
        }
        getUser();
    }, [email])
    return { loggedInUser, userLoading };
}

export default useUser;