import { useEffect, useState } from "react";

const useUser = (email: string) => {
    const [loggedInUser, setLoggedInUser] = useState<any>([])
    const [userLoading, setUserLoading] = useState(true);
    useEffect(() => {
        fetch(`http://localhost:3000/user?email=${email}`)
            .then(res => res.json())
            .then(data => {
                setLoggedInUser(data)
                setUserLoading(false)
            })
    }, [email])
    return { loggedInUser, userLoading };
}

export default useUser;