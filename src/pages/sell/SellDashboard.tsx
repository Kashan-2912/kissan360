import { useSelector, useDispatch } from "react-redux";
import {
  Table,
  Select,
  Button,
  Group,
  Avatar,
  Badge,
  ActionIcon,
} from "@mantine/core";
import { Trash2 } from "lucide-react";
import type { RootState, AppDispatch } from "../../store";
import {
  setFilters,
  applyFilters,
  resetFilters,
  deleteProduct,
} from "../../store/sellProductSlice";
import { MdModeEditOutline } from "react-icons/md";
import View from "../../assets/search-file.png";
import { FaSortDown } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import { CgUndo } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import NotFound from "../../assets/not_found.png";

const SellDashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { filters } = useSelector((state: RootState) => state.productTable);

  type Product = {
    id: number;
    productName: string;
    category: string;
    availableQuantity: number;
    unit: string;
    unitPrice: number;
    productLocation: string;
    description?: string;
    images?: string[];
  };

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get("http://localhost:3000/product", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        timeout: 5000,
      });
      if (response.data) {
        setProducts(response.data);
        console.log("✅ Products fetched:", response.data);
      } else {
        setError("No data received from server");
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to fetch products. Please try again.";
      setError(errorMessage);
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const navigate = useNavigate();

  const handleFilterChange = (field: string, value: string) => {
    dispatch(setFilters({ [field]: value }));
  };

  const handleSearch = () => {
    dispatch(applyFilters());
  };

  const handleReset = () => {
    dispatch(resetFilters());
  };

  const handleDelete = async (productId: string) => {
    try {
      await axios.delete(`http://localhost:3000/product/${productId}`);
      dispatch(deleteProduct(productId));
      setProducts((prev) => prev.filter((p) => p.id.toString() !== productId));
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  const handleView = (productId: string) => {
    console.log("Viewing product with ID:", productId);
    navigate(`/sell/product/${productId}`);
  };

  const handleEdit = (productId: string) => {
    navigate(`/sell/update-product/${productId}`);
  };

  useEffect(() => {
    dispatch(applyFilters());
  }, [filters, dispatch]);

  // const getStatusColor = (status: string) => {
  //   switch (status) {
  //     case "Submitted":
  //       return "#BD8E43";
  //     case "Rejected":
  //       return "#D63535";
  //     case "Live for sale":
  //       return "#0F783B";
  //     default:
  //       return "gray";
  //   }
  // };

  const selectStyles = {
    input: {
      paddingBottom: 25,
      paddingLeft: 8,
      borderBottom: "2px solid #BFE1C8",
      borderRadius: 0,
      fontFamily: "Montserrat, sans-serif",
      fontSize: 14,
      borderTop: "none",
      borderLeft: "none",
      borderRight: "none",
      backgroundColor: "transparent",
    },
    placeholder: {
      position: "absolute" as const,
      top: 2,
      left: 8,
      fontSize: 12,
      fontWeight: 600,
      color: "#0F783B",
      fontFamily: "Montserrat, sans-serif",
      transform: "translateY(0)",
      transition: "all 0.2s ease",
      pointerEvents: "none" as const,
    },
    wrapper: {
      position: "relative" as const,
    },
  };

  const fields: Array<keyof typeof filters> = [
    "searchByName",
    "searchByStatus",
    "searchByCategory",
  ];

  return (
    <div className="p-6 mt-[-35px] mb-25">
      {loading && (
        <div className="mb-4 text-center text-[#0F783B] font-[Montserrat] text-sm">
          Loading products...
        </div>
      )}

      {error && (
        <div className="mb-4 text-center text-red-600 font-[Montserrat] text-sm">
          {error}
        </div>
      )}
      <div className="p-6">
        {/* Filters */}
        <div className="mb-6 flex flex-wrap gap-4 justify-between">
          <div className="flex flex-wrap gap-4">
            {fields.map((field) => (
              <div key={field} className="relative w-60">
                <div className="absolute -top-2 right-2 z-10 pointer-events-none">
                  <FaSortDown className="text-[#0F783B]" />
                </div>
                <Select
                  variant="unstyled"
                  placeholder={
                    field === "searchByName"
                      ? "Search by name"
                      : field === "searchByStatus"
                      ? "Search by status"
                      : "Search by category"
                  }
                  data={
                    field === "searchByName"
                      ? ["Wheat", "Sugar", "Rice", "Corn", "Barley"]
                      : field === "searchByStatus"
                      ? ["Submitted", "Rejected", "Live for Sale"]
                      : ["Grain", "Vegetables", "Fruits", "Dairy", "Meat"]
                  }
                  value={filters[field]}
                  onChange={(value) => handleFilterChange(field, value || "")}
                  className="w-full"
                  clearable
                  rightSectionWidth={0}
                  styles={selectStyles}
                />
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Button
              color="#0F783B"
              variant="filled"
              leftSection={<BsSearch className="w-3 h-3" />}
              className="text-[#FDFDFD]"
              onClick={handleSearch}
              style={{
                fontFamily: "Montserrat",
                fontWeight: "500",
                fontSize: "13px",
                width: "110px",
                height: "35px",
                borderRadius: "100px",
                border: "1px solid #00000012",
                // padding: "10px 30px",
                gap: "8px",
              }}
            >
              Search
            </Button>
            <ActionIcon
              variant="light"
              size="lg"
              radius="xl"
              onClick={handleReset}
              style={{
                backgroundColor: "#D634342B",
                border: "1px solid #FF6B6B40",
                borderRadius: "100px",
                width: "50px",
                height: "35px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CgUndo size={20} color="#D63535" />
            </ActionIcon>
          </div>
        </div>

        {/* md+ Table */}
        <div className="hidden md:block">
          <div className="rounded-[8px] overflow-hidden border border-[#D9D9D9] w-full">
            <Table style={{ tableLayout: "fixed", width: "100%" }}>
              <Table.Thead className="bg-[#0F783B] h-[48px]">
                <Table.Tr className="font-[Montserrat] font-semibold text-[12px] text-[#FFFFFF]">
                  <Table.Th>Product Name</Table.Th>
                  <Table.Th>Category</Table.Th>
                  <Table.Th>Available Quantity</Table.Th>
                  {/* <Table.Th>Status</Table.Th> */}
                  <Table.Th>Actions</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {products.length > 0 ? (
                  products.map((product) => (
                    <Table.Tr key={product.id.toString()} bg="#f3fbf2">
                      <Table.Td>
                        <Group gap="sm">
                          <Avatar
                            src={
                              product.images?.[0]
                                ? `http://localhost:3000${product.images[0]}`
                                : undefined
                            }
                          />

                          <span className="text-[#000000] font-[Montserrat] text-[12px]">
                            {product.productName}
                          </span>
                        </Group>
                      </Table.Td>
                      <Table.Td>
                        <Badge
                          variant="light"
                          styles={{
                            root: {
                              color: "#7B5214",
                              fontSize: 10,
                              backgroundColor: "#F8E8D2",
                              fontFamily: "Montserrat, sans-serif",
                              fontWeight: 600,
                              borderRadius: 100,
                              textTransform: "capitalize",
                            },
                          }}
                        >
                          {product.category}
                        </Badge>
                      </Table.Td>
                      <Table.Td>
                        <span className="text-[#000000] font-[Montserrat] text-[12px]">
                          {product.availableQuantity?.toLocaleString()}{" "}
                          {product.unit}
                        </span>
                      </Table.Td>
                      {/* <Table.Td>
                        <Badge
                          variant="light"
                          color={getStatusColor(product.status)}
                          styles={{
                            root: {
                              textTransform: "capitalize",
                              fontWeight: 600,
                              fontFamily: "Montserrat, sans-serif",
                              height: "32px",
                              lineHeight: "32px",
                              padding: "0 16px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              fontSize: "14px",
                            },
                          }}
                        >
                          {product.status}
                        </Badge>
                      </Table.Td> */}
                      <Table.Td>
                        <Group gap="xs">
                          <ActionIcon
                            onClick={() => handleEdit(product.id.toString())}
                            variant="light"
                            size="lg"
                            radius="xl"
                            style={{
                              backgroundColor: "#DDEEE0",
                              border: "1px solid #0F783B1A",
                            }}
                          >
                            <MdModeEditOutline color="#0F783B" size={18} />
                          </ActionIcon>
                          <ActionIcon
                            variant="light"
                            size="lg"
                            radius="xl"
                            style={{
                              backgroundColor: "#FFECEC",
                              border: "1px solid #D634341F",
                            }}
                            onClick={() => handleDelete(product.id.toString())}
                          >
                            <Trash2 className="w-4 h-4 text-[#D63535]" />
                          </ActionIcon>
                          <ActionIcon
                            onClick={() => handleView(product.id.toString())}
                            variant="light"
                            size="lg"
                            radius="xl"
                            style={{
                              backgroundColor: "#D9D9D994",
                              border: "1px solid #0000001F",
                            }}
                          >
                            <img
                              src={View || "/placeholder.svg"}
                              alt="view"
                              className="w-4 h-4 opacity-70"
                            />
                          </ActionIcon>
                        </Group>
                      </Table.Td>
                    </Table.Tr>
                  ))
                ) : (
                  <Table.Tr>
                    <Table.Td colSpan={4}>
                      <div className="flex flex-col items-center justify-center py-8">
                        <img
                          src={NotFound}
                          alt="Not Found"
                          className="w-40 h-auto mb-4"
                        />
                        <h3 className="text-[#0F783B] text-lg font-semibold mb-2">
                          No Product Information?
                        </h3>
                        <p className="text-[#9D9999] text-sm text-center max-w-xs">
                          Add new product, the information of the product will
                          show up here.
                        </p>
                      </div>
                    </Table.Td>
                  </Table.Tr>
                )}
              </Table.Tbody>
            </Table>
          </div>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden flex flex-col gap-4">
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product.id.toString()}
                className="border rounded-lg p-4 flex flex-col gap-2 shadow-sm"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-lg">
                    {product.productName}
                  </h3>
                  <img
                    src={
                      product.images?.[0]
                        ? `http://localhost:3000${product.images[0]}`
                        : "/placeholder.png" // fallback if you want
                    }
                    alt={product.productName}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                </div>
                <p className="text-sm">
                  <span className="font-medium">Category:</span>{" "}
                  <span className="text-[#BD8E43]">{product.category}</span>
                </p>
                <p className="text-sm">
                  <span className="font-medium">Available Quantity:</span>{" "}
                  {product.availableQuantity?.toLocaleString()} {product.unit}
                </p>
                {/* <Badge
                  variant="light"
                  color={getStatusColor(product.status)}
                  className="w-fit"
                >
                  {product.status}
                </Badge> */}
                <div className="flex gap-2">
                  <ActionIcon
                    variant="light"
                    style={{ backgroundColor: "#DDEEE0" }}
                  >
                    <MdModeEditOutline color="#0F783B" size={18} />
                  </ActionIcon>
                  <ActionIcon
                    variant="light"
                    style={{ backgroundColor: "#FFECEC" }}
                    onClick={() => handleDelete(product.id.toString())}
                  >
                    <Trash2 className="w-4 h-4 text-[#D63535]" />
                  </ActionIcon>
                  <ActionIcon
                    variant="light"
                    style={{ backgroundColor: "#D9D9D994" }}
                    onClick={() => handleView(product.id.toString())}
                  >
                    <img
                      src={View || "/placeholder.svg"}
                      alt="view"
                      className="w-4 h-4 opacity-70"
                    />
                  </ActionIcon>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-8">
              <img
                src={NotFound}
                alt="Not Found"
                className="w-40 h-auto mb-4"
              />
              <h3 className="text-[#0F783B] text-lg font-semibold mb-2">
                No Product Information?
              </h3>
              <p className="text-[#9D9999] text-sm text-center max-w-xs">
                Add new product, the information of the product will show up
                here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellDashboard;
