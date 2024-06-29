import { Button, Input } from "antd";
import ProductCard from "../../components/ui/ProductCard";
import {
  useBikesBulkDeleteMutation,
  useGetAllBikesQuery,
} from "../../redux/features/bike/bikeApi";
import { useEffect, useState } from "react";
import ModalForm from "../../components/form/ModalForm";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  selectFilter,
  setFilter,
  setPriceRange,
} from "../../redux/features/filterSlice";
import { TQueryParam } from "../../types/global";
// import { TQueryParam } from "../../types/global";

export default function AllProducts() {
  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
  const dispatch = useAppDispatch();
  const { search } = useAppSelector(selectFilter);
  const { data } = useGetAllBikesQuery(params);
  const [bikesBulkDelete, { isSuccess, isError }] =
    useBikesBulkDeleteMutation();
  const bikesArray = data?.data?.result;
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedBike, setSelectedBike] = useState(null);
  const [selectedBikes, setSelectedBikes] = useState<any[]>([]);
  const { minPrice, maxPrice } = useAppSelector((state) => state.filter);

  useEffect(() => {
    const priceRance = [
      { name: "minPrice", value: minPrice },
      { name: "maxPrice", value: maxPrice },
    ];
    setParams(priceRance);
  }, [minPrice, maxPrice]);

  // console.log(minPrice, maxPrice, "minPrice");
  const searchProduct = (product: any) => {
    if (search) {
      return product?.name
        .trim()
        .toLowerCase()
        .includes(search.trim().toLowerCase());
    } else {
      return true;
    }
  };

  const handleChange = (e: any) => {
    const queryParams: TQueryParam[] = [];
    queryParams.push({ name: "searchTerm", value: e.target.value });
    dispatch(setFilter({ search: e.target.value }));
    // setParams("");
  };

  const handleSellClick = (bike: any) => {
    setSelectedBike(bike);
    setModalVisible(true);
  };

  const handleCheckboxChange = (bike: any, isChecked: boolean) => {
    if (isChecked) {
      setSelectedBikes((prevSelectedBikes) => [...prevSelectedBikes, bike]);
    } else {
      setSelectedBikes((prevSelectedBikes) =>
        prevSelectedBikes.filter(
          (selectedBike) => selectedBike._id !== bike._id
        )
      );
    }
  };
  // const onPriceChange = (e) => {
  //   const queryParams: TQueryParam[] = [];
  //   console.log(e.target.value);
  //   queryParams.push({ name: "price", value: e.target.value });
  //   setParams(queryParams);
  // };
  const handlePriceChange = (e: any) => {
    const { name, value } = e.target;
    console.log(name, value);
    dispatch(
      setPriceRange({
        minPrice: name === "minPrice" ? parseInt(value, 10) : minPrice,
        maxPrice: name === "maxPrice" ? parseInt(value, 10) : maxPrice,
      })
    );
  };
  const handleBulkDelete = async () => {
    console.log(selectedBikes);
    bikesBulkDelete(selectedBikes);
  };
  if (isSuccess) {
    <p>Multiple deleted Successfully</p>;
  }
  if (isError) {
    <p>wrong</p>;
  }
  const productToShow = bikesArray?.filter(searchProduct);
  return (
    <>
      <div>
        <div style={{ marginBottom: "30px" }}>
          <h1>Products</h1>
          <div>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <Input
                placeholder="Search..."
                style={{ width: 350 }}
                onChange={handleChange}
              />
              <Input
                type="number"
                name="minPrice"
                value={minPrice}
                onChange={handlePriceChange}
              />
              <Input
                type="number"
                name="maxPrice"
                value={maxPrice}
                onChange={handlePriceChange}
              />
              <Button type="primary" onClick={handleBulkDelete}>
                Bulk Delete
              </Button>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          {productToShow?.length > 0
            ? productToShow
                ?.filter(searchProduct)
                .map(
                  (bike: any) =>
                    bike.quantity > 0 && (
                      <ProductCard
                        bike={bike}
                        key={bike._id}
                        onSellClick={handleSellClick}
                        onCheckboxChange={handleCheckboxChange}
                      />
                    )
                )
            : "No Bike found"}
        </div>
      </div>
      <ModalForm
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        bike={selectedBike}
      />
    </>
  );
}
