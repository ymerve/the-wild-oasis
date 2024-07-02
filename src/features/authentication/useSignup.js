import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useSignup() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate: signup, isLoading } = useMutation({
        mutationFn: signupApi,
        onSuccess: (user) => {
            console.log(user)
            toast.success("Account successfully created! Please verify the new account from the user`s email address.")
        },
        onError: (err) => {
            console.log("ERROR: ", err);
            toast.error(err.message);
        }
    });

    return { signup, isLoading };
}