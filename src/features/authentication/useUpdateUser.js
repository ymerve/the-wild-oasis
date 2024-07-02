import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateCurrentUser as updateCurrentUserApi } from "../../services/apiAuth";

function useUpdateUser() {
    const queryClient = useQueryClient();

    const { mutate: updateUser, isLoading: isUpdating } = useMutation({
        mutationFn: ({ password, fullName, avatar }) => updateCurrentUserApi({ password, fullName, avatar }),
        onSuccess: ({ user }) => {
            console.log(user)
            toast.success("User account successfuly updated");
            queryClient.setQueriesData("user", user)
            // queryClient.invalidateQueries({
            //     queryKey: ["user"],
            // });
        },
        onError: (err) => toast.error(err.message),
    });
    return { isUpdating, updateUser };
}

export default useUpdateUser;