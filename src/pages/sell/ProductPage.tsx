import React, { useEffect, useState } from "react";
import { Text, Image, Stack, Group, Box, ActionIcon } from "@mantine/core";
import { MdModeEditOutline } from "react-icons/md";
import { Trash2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios"; // ✅ make sure axios is installed
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../store/productTableSlice";
import type { AppDispatch } from "../../store";

// 1️⃣ Define your Product type
interface Product {
  id: number;
  productName: string;
  category: string;
  availableQuantity: number;
  unitPrice: number;
  productLocation: string;
  unit: string;
  description: string;
  status: string;
  images: string[]; // assuming array
}

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

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

  // 2️⃣ Fetch the product on mount
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3000/product/${id}`);
        setProduct(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load product.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleDelete = async (productId: string) => {
    try {
      await axios.delete(`http://localhost:3000/product/${productId}`);
      dispatch(deleteProduct(productId));
      navigate("/");
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  const handleEdit = (productId: string) => {
    navigate(`/update-product/${productId}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>No product found.</p>;

  return (
    <div className="w-full p-3 mb-25">
      <div className="relative flex flex-col md:flex-col lg:flex-row-reverse gap-6">
        {/* Image and Action Icons */}
        <div className="lg:mr-8 lg:mb-6 w-full lg:w-[500px]">
          <div className="flex justify-end gap-2 mb-5">
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
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#DDEEE0]">
                <MdModeEditOutline color="#0F783B" size={18} />
              </div>
            </ActionIcon>
            <ActionIcon
              onClick={() => handleDelete(product.id.toString())}
              variant="light"
              size="lg"
              radius="xl"
              style={{
                backgroundColor: "#FFECEC",
                border: "1px solid #D634341F",
              }}
            >
              <Trash2 className="w-4 h-4 text-[#D63535]" />
            </ActionIcon>
          </div>
          <Box className="w-full">
            <Image
              radius="16px"
              src={`http://localhost:3000${product.images[0]}`}
              alt={`${product.productName} image`}
              className="w-full h-auto rounded-[16px] shadow-sm"
              fit="cover"
            />
          </Box>
        </div>

        {/* Product Details */}
        <div className="flex-1 space-y-8">
          <Stack>
            <Group align="flex-start">
              <Text className="text-[14px] font-[Montserrat] font-normal text-[#000000]">
                Product Name:
              </Text>
              <Text
                c="#BE8B45"
                className="text-[16px] font-[Montserrat] font-semibold"
              >
                {product.productName}
              </Text>
            </Group>

            <Group align="flex-start">
              <Text className="text-[14px] font-[Montserrat] font-normal text-[#000000]">
                Product Category:
              </Text>
              <Text
                c="#BE8B45"
                className="text-[16px] font-[Montserrat] font-semibold"
              >
                {product.category}
              </Text>
            </Group>

            <Group align="flex-start">
              <Text className="text-[14px] font-[Montserrat] font-normal text-[#000000]">
                Available Quantity:
              </Text>
              <Text
                c="#BE8B45"
                className="text-[16px] font-[Montserrat] font-semibold"
              >
                {product.availableQuantity}
              </Text>
            </Group>

            <Group align="flex-start">
              <Text className="text-[14px] font-[Montserrat] font-normal text-[#000000]">
                Unit Price:
              </Text>
              <Text
                c="#BE8B45"
                className="text-[16px] font-[Montserrat] font-semibold"
              >
                {product.unitPrice}
              </Text>
            </Group>

            <Group align="flex-start">
              <Text className="text-[14px] font-[Montserrat] font-normal text-[#000000]">
                Product Location:
              </Text>
              <Text
                c="#BE8B45"
                className="text-[16px] font-[Montserrat] font-semibold"
              >
                {product.productLocation}
              </Text>
            </Group>

            <Group align="flex-start">
              <Text className="text-[14px] font-[Montserrat] font-normal text-[#000000]">
                Unit:
              </Text>
              <Text
                c="#BE8B45"
                className="text-[16px] font-[Montserrat] font-semibold"
              >
                {product.unit}
              </Text>
            </Group>

            {/* <Stack align="flex-start">
              <Text className="text-[16px] font-[Montserrat] font-semibold">Status</Text>
              <Badge
                variant="light"
                color={getStatusColor(product.status)}
                style={{
                  width: "122px",
                  height: "40px",
                  fontSize: "14px",
                  fontWeight: 600,
                  paddingLeft: "12px",
                  paddingRight: "12px",
                  borderRadius: "100px",
                  textTransform: "none",
                }}
              >
                {product.status}
              </Badge>
            </Stack> */}
          </Stack>
        </div>
      </div>

      <Box className="w-full mt-10">
        <Text className="text-[16px] font-normal font-[Montserrat] text-[#000000] mb-2">
          Description:
        </Text>
        <Text
          c="#646464"
          mt={18}
          className="text-[14px] font-normal font-[Montserrat]"
        >
          {product.description}
        </Text>
      </Box>
    </div>
  );
};

export default ProductPage;
