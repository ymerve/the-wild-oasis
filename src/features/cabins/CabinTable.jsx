import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import useCabin from "./useCabin";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

function CabinTable() {
    const { isLoading, cabins } = useCabin();
    const [searchParam] = useSearchParams();

    if (isLoading) return <Spinner />;

    if (!cabins.length) return <Empty resourceName="cabins" />;

    // 1-) FILTER
    const filterValue = searchParam.get("discount") || "all";

    let filteredCabins;

    if (filterValue === "all") filteredCabins = cabins;
    else if (filterValue === "no-discount")
        filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
    else if (filterValue === "with-discount")
        filteredCabins = cabins.filter((cabin) => cabin.discount > 0);

    // 2-) SORT
    const sortBy = searchParam.get("sortBy") || "startDate-asc";

    const [field, direction] = sortBy.split("-");
    const modifier = direction === "asc" ? 1 : -1;
    const sortedCabins = filteredCabins.sort(
        (a, b) => (a[field] - b[field]) * modifier
    );

    return (
        <Menus>
            <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
                <Table.Header>
                    <div></div>
                    <div>Cabin</div>
                    <div>Capacity</div>
                    <div>Price</div>
                    <div>Discount</div>
                    <div></div>
                </Table.Header>
                <Table.Body
                    // data={cabins}
                    // data={filteredCabins}
                    data={sortedCabins}
                    render={(cabin) => (
                        <CabinRow key={cabin.id} cabin={cabin} />
                    )}
                ></Table.Body>
            </Table>
        </Menus>
    );
}

export default CabinTable;
