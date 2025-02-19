import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setAuth } from "../store/auth-slice";
import api from "../http";

export const useAutoLogin = () => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    useEffect(() => {
        (async () => {
            try {
                const res = await api.get(`${process.env.REACT_APP_MODE === 'DEVELOPMENT' ? process.env.REACT_APP_DEV_BASE_URL : process.env.REACT_APP_PROD_BASE_URL}/api/auth/refresh`, {
                    withCredentials: true,
                });

                console.log("res", res)
                if (res.status === 200 || res.success === true) {
                    if (res.data.success) {
                        dispatch(setAuth(res.user));
                        localStorage.setItem('accessToken', res.data?.accessToken);
                        localStorage.setItem('refreshToken', res.data?.refreshToken);
                    }

                    setLoading(false)
                }
                else
                    setLoading(false)

            }
            catch (err) {
                console.log(err)
                setLoading(false)
            }

        })();
    })
    return loading;
}