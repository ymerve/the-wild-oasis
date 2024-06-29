import { useQuery } from "@tanstack/react-query"
import { getBookings } from "../../services/apiBookings"
import { useSearchParams } from "react-router-dom";

function useBookings() {
    const [searchParam] = useSearchParams();

    // 1. FILTER
    const filterValue = searchParam.get("status");
    const filter = !filterValue || filterValue === "all"
        ? null
        : { field: "status", value: filterValue };

    const {
        isLoading,
        data: bookings,
        error,
    } = useQuery({
        queryKey: ["bookings", filter],
        queryFn: () => getBookings({ filter })
    })

    return { isLoading, error, bookings };
}

export default useBookings;