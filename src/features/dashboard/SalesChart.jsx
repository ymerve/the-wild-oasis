import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import Heading from "../../ui/Heading";

import { useDarkMode } from "../../context/DarkModeContext";
import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";

const StyledSalesChart = styled(DashboardBox)`
    grid-column: 1 / -1;

    /* Hack to change grid line colors */
    & .recharts-cartesian-grid-horizontal line,
    & .recharts-cartesian-grid-vertical line {
        stroke: var(--color-grey-300);
    }
`;

export default function SalesChart({ bookings, numDays }) {
    const { isDarkMode } = useDarkMode();

    const allDates = eachDayOfInterval({
        start: subDays(new Date(), numDays - 1),
        end: new Date(),
    });
    const data = allDates.map((date) => {
        return {
            label: format(date, "MMM dd"),
            totalSales: bookings
                .filter((booking) =>
                    isSameDay(date, new Date(booking.created_at))
                )
                .reduce((acc, cur) => acc + cur.totalPrice, 0),
            extrasSales: bookings
                .filter((booking) =>
                    isSameDay(date, new Date(booking.created_at))
                )
                .reduce((acc, cur) => acc + cur.extrasPrice, 0),
        };
    });
    // const isDarkMode = true;
    const colors = isDarkMode
        ? {
              totalSales: { stroke: "#6864b5", fill: "#7683b1" },
              extrasSales: { stroke: "#2eb05e", fill: "#3fc570" },
              text: "#e5e7eb",
              background: "#18212f",
          }
        : {
              totalSales: { stroke: "#8884d8", fill: "#c7d2fe" },
              extrasSales: { stroke: "#82ca9d", fill: "#dcfce7" },
              text: "#374151",
              background: "#fff",
          };
    return (
        <StyledSalesChart>
            <Heading $as="h2">Sales</Heading>
            <ResponsiveContainer height={300} width="100%">
                <AreaChart data={data}>
                    <XAxis
                        dataKey="label"
                        tick={{ fill: colors.text }}
                        tickLine={{ stroke: colors.text }}
                    />
                    <YAxis
                        unit="$"
                        tick={{ fill: colors.text }}
                        tickLine={{ stroke: colors.text }}
                    />
                    <CartesianGrid strokeDasharray="4" />
                    <Tooltip
                        contentStyle={{ backgroundColor: colors.background }}
                    />
                    <Area
                        dataKey="totalSales"
                        type="monotone"
                        stroke={colors.totalSales.stroke}
                        fill={colors.totalSales.fill}
                        name="Total sales"
                        strokeWidth={2}
                        unit="$"
                    />
                    <Area
                        dataKey="extrasSales"
                        type="monotone"
                        stroke={colors.extrasSales.stroke}
                        fill={colors.extrasSales.fill}
                        name="Extras sales"
                        strokeWidth={2}
                        unit="$"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </StyledSalesChart>
    );
}
