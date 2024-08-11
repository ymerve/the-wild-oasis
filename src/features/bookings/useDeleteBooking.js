import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
import { toast } from "react-hot-toast";

function useDeleteBooking() {
    const queryClient = useQueryClient();

    const { mutate: deleteBooking, isLoading: isDeleteBooking } = useMutation({
        mutationFn: deleteBookingApi,
        onSuccess: () => {
            toast.success("Booking successfully deleted");
            queryClient.invalidateQueries({
                queryKey: ["bookings"]
            });
        },
        onError: (err) => toast.error("There was an error deleting the booking ", err.message)
    });

    return { deleteBooking, isDeleteBooking }
}

export default useDeleteBooking;