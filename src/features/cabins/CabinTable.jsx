import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import useCabin from "./useCabin";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

function CabinTable() {
    const { isLoading, cabins } = useCabin();
    const [searchParam] = useSearchParams();

    if (isLoading) return <Spinner />;

    const filterValue = searchParam.get("discount") || "all";

    let filteredCabins;

    if (filterValue === "all") filteredCabins = cabins;
    else if (filterValue === "no-discount")
        filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
    else if (filterValue === "with-discount")
        filteredCabins = cabins.filter((cabin) => cabin.discount > 0);

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
                    data={filteredCabins}
                    render={(cabin) => (
                        <CabinRow key={cabin.id} cabin={cabin} />
                    )}
                ></Table.Body>
            </Table>
        </Menus>
    );
}

export default CabinTable;
