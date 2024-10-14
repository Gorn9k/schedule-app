import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

export const useUrlValidation = (validateUrl: () => boolean) => {
    const navigate = useNavigate()
    
    const badRequest = validateUrl()

    useEffect(() => {
        if (badRequest) {
            navigate('/')
        }
    }, [badRequest, navigate])

    return badRequest
}