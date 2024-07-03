import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import { useRecentStays } from "./useRecentStays";

const StyledDashboardLayout = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: auto 34rem auto;
    gap: 2.4rem;
`;

function DashboardLayout() {
    const { bookings, isLoading } = useRecentBookings();
    const {
        stays,
        isLoading: isLoadingStays,
        confirmedStays,
    } = useRecentStays();

    if (isLoading) return <Spinner />;

    return (
        <StyledDashboardLayout>
            <div>Statustics</div>
            <div>Today's activity</div>
            <div>Chart stay duration</div>
            <div>Chart sales</div>
        </StyledDashboardLayout>
    );
}

export default DashboardLayout;
