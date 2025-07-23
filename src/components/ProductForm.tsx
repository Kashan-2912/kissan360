import { useState } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import {
  TextInput,
  Select,
  NumberInput,
  Textarea,
  Button,
  Group,
  Grid,
  Paper,
  Title,
  Modal,
  Center,
} from "@mantine/core";
import { Upload, Check } from "lucide-react";
import { productValidationSchema } from "../validation/productSchema";
import { addProduct } from "../store/productSlice";
import { HiMiniChevronDown } from "react-icons/hi2";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

export const ProductForm = () => {
  const dispatch = useDispatch();
  const [opened, setOpened] = useState(false);

  // const [message, setMessage] = useState("");
  // const [loading, setLoading] = useState(false);

  type Product = {
    productLocation: string;
    productName: string;
    category: string;
    availableQuantity: number | null;
    unit: string;
    unitPrice: number | null;
    image: FileList | File[] | null;
    description: string;
  };

  const formik = useFormik<Product>({
    initialValues: {
      productName: "",
      category: "",
      availableQuantity: null,
      unit: "",
      unitPrice: 0,
      productLocation: "",
      image: null,
      description: "",
    },

    validationSchema: productValidationSchema,

    onSubmit: async (values) => {
      // setLoading(true);
      // setMessage("");

      try {
        const formData = new FormData();

        // formData.append("id", uuidv4());
        formData.append("productName", values.productName);
        formData.append("category", values.category);
        formData.append(
          "availableQuantity",
          String(values.availableQuantity ?? 0)
        );
        formData.append("unit", values.unit);
        formData.append("unitPrice", String(values.unitPrice ?? 0));
        formData.append("productLocation", values.productLocation);
        formData.append("description", values.description);

        if (values.image) {
          Array.from(values.image).forEach((file) => {
            // console.log(file);
            formData.append("images", file);
          });
        }

        // Make the POST request to your Node/Nest backend
        await axios.post("http://localhost:3000/product", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const productWithId = {
          ...values,
          id: uuidv4(),
        };

        dispatch(addProduct(productWithId));

        console.log("Product submitted:", values);
        // setMessage("✅ Product added successfully!");
        console.log("Product added successfully!");
        setOpened(true);
        formik.resetForm();
      } catch (error) {
        console.error(error);
        console.log("❌ Failed to submit product.");
      }
    },
  });

  const handleQuantityOrPriceChange = () => {
    const total =
      (formik.values.availableQuantity ?? 0) * (formik.values.unitPrice ?? 0);

    formik.setFieldValue("totalPrice", total);
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        centered
        withCloseButton={false}
        size="sm"
        radius="lg"
        overlayProps={{
          color: "gray",
        }}
      >
        <Center className="flex flex-col gap-4 text-center px-4 py-6">
          <div className="w-16 h-16 rounded-full bg-[#0F783B] flex items-center justify-center">
            <Check size={28} color="white" />
          </div>
          <h2 className="text-lg font-semibold text-[#0F783B]">
            Request Sent Successfully!
          </h2>
          <p className="text-sm text-gray-600">
            Your request to add new product has been sent. Our team will contact
            you soon. Thank you!
          </p>
        </Center>
      </Modal>

      <div className="p-6 m-3 mb-25 bg-[#FFFFFF] border border-[#0F783B1F] rounded-[12px]">
        <Paper className="rounded-lg">
          <Title
            order={3}
            className="pb-3 font-bold font-[Montserrat] text-[#BE8B45] text-[18px] leading-[100%] tracking-normal"
          >
            Add New Product
          </Title>
          <form onSubmit={formik.handleSubmit}>
            <Grid>
              <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                <Select
                  className="font-[Montserrat]"
                  label="Product Name"
                  placeholder="Wheat"
                  required
                  data={[
                    { value: "wheat", label: "Wheat" },
                    { value: "rice", label: "Rice" },
                    { value: "corn", label: "Corn" },
                  ]}
                  value={formik.values.productName}
                  onChange={(value) =>
                    formik.setFieldValue("productName", value)
                  }
                  onBlur={() => formik.setFieldTouched("productName", true)}
                  error={
                    formik.touched.productName && formik.errors.productName
                  }
                  rightSection={
                    <div
                      style={{
                        width: "100%",
                        backgroundColor: "#FFFFFF",
                        borderLeft: "1px solid #00000012",
                        borderTopRightRadius: "8px",
                        borderBottomRightRadius: "8px",
                        height: "34px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <HiMiniChevronDown className="w-4 h-4 text-[#0F783B]" />
                    </div>
                  }
                  rightSectionWidth={28.83}
                  styles={{
                    label: {
                      fontWeight: 600,
                      fontSize: "12px",
                      paddingBottom: "8px",
                    },
                    input: {
                      fontFamily: "Montserrat",
                      border: "1px solid #00000012",
                      borderRadius: "8px",
                      backgroundColor: "#F5F5F599",
                      height: "36px",
                      fontWeight: 400,
                      fontSize: "12px",
                    },
                  }}
                />
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                <TextInput
                  className="font-[Montserrat]"
                  label="Category"
                  placeholder="Grain"
                  required
                  {...formik.getFieldProps("category")}
                  error={formik.touched.category && formik.errors.category}
                  styles={{
                    label: {
                      fontWeight: 600,
                      fontSize: "12px",
                      paddingBottom: "8px",
                    },
                    input: {
                      fontFamily: "Montserrat",
                      border: "1px solid #00000012",
                      borderRadius: "8px",
                      backgroundColor: "#F5F5F599",
                      height: "36px",
                      fontWeight: 400,
                      fontSize: "12px",
                    },
                  }}
                />
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                <NumberInput
                  className="font-[Montserrat]"
                  label="Available Quantity"
                  placeholder="0"
                  required
                  hideControls
                  min={0}
                  value={formik.values.availableQuantity ?? 0}
                  onChange={(value) => {
                    formik.setFieldValue("availableQuantity", value || 0);
                    setTimeout(handleQuantityOrPriceChange, 0);
                  }}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.availableQuantity &&
                    formik.errors.availableQuantity
                      ? formik.errors.availableQuantity
                      : undefined
                  }
                  styles={{
                    label: {
                      fontWeight: 600,
                      fontSize: "12px",
                      paddingBottom: "8px",
                    },
                    input: {
                      fontFamily: "Montserrat",
                      border: "1px solid #00000012",
                      borderRadius: "8px",
                      backgroundColor: "#F5F5F599",
                      height: "36px",
                      fontWeight: 400,
                      fontSize: "12px",
                    },
                  }}
                />
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                <Select
                  className="font-[Montserrat]"
                  label="Unit"
                  placeholder="Select unit"
                  required
                  data={[
                    { value: "kg", label: "Kilogram (kg)" },
                    { value: "liter", label: "Liter (L)" },
                    { value: "ton", label: "Ton" },
                  ]}
                  value={formik.values.unit}
                  onChange={(value) => formik.setFieldValue("unit", value)}
                  onBlur={() => formik.setFieldTouched("unit", true)}
                  error={formik.touched.unit && formik.errors.unit}
                  rightSection={
                    <div
                      style={{
                        width: "100%",
                        backgroundColor: "#FFFFFF",
                        borderLeft: "1px solid #00000012",
                        borderTopRightRadius: "8px",
                        borderBottomRightRadius: "8px",
                        height: "34px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <HiMiniChevronDown className="w-4 h-4 text-[#0F783B]" />
                    </div>
                  }
                  rightSectionWidth={28.83}
                  styles={{
                    label: {
                      fontWeight: 600,
                      fontSize: "12px",
                      paddingBottom: "8px",
                    },
                    input: {
                      fontFamily: "Montserrat",
                      border: "1px solid #00000012",
                      borderRadius: "8px",
                      backgroundColor: "#F5F5F599",
                      height: "36px",
                      fontWeight: 400,
                      fontSize: "12px",
                    },
                  }}
                />
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                <NumberInput
                  className="font-[Montserrat]"
                  label="Unit Price"
                  placeholder="Write unit price"
                  required
                  hideControls
                  min={0}
                  value={formik.values.unitPrice ?? 0}
                  onChange={(value) => {
                    formik.setFieldValue("unitPrice", value || 0);
                    setTimeout(handleQuantityOrPriceChange, 0);
                  }}
                  error={formik.touched.unitPrice && formik.errors.unitPrice}
                  styles={{
                    label: {
                      fontWeight: 600,
                      fontSize: "12px",
                      paddingBottom: "8px",
                    },
                    input: {
                      fontFamily: "Montserrat",
                      border: "1px solid #00000012",
                      borderRadius: "8px",
                      backgroundColor: "#F5F5F599",
                      height: "36px",
                      fontWeight: 400,
                      fontSize: "12px",
                    },
                  }}
                />
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                <TextInput
                  className="font-[Montserrat]"
                  label="Product Location"
                  placeholder="Enter product location"
                  required
                  value={formik.values.productLocation}
                  onChange={(event) =>
                    formik.setFieldValue(
                      "productLocation",
                      event.currentTarget.value
                    )
                  }
                  error={
                    formik.touched.productLocation &&
                    formik.errors.productLocation
                  }
                  styles={{
                    label: {
                      fontWeight: 600,
                      fontSize: "12px",
                      paddingBottom: "8px",
                    },
                    input: {
                      fontFamily: "Montserrat",
                      border: "1px solid #00000012",
                      borderRadius: "8px",
                      backgroundColor: "#F5F5F599",
                      height: "36px",
                      fontWeight: 400,
                      fontSize: "12px",
                    },
                  }}
                />
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                <div>
                  <label
                    className="font-[Montserrat]"
                    style={{
                      fontWeight: 600,
                      fontSize: "12px",
                      paddingBottom: "13px",
                      display: "block",
                    }}
                  >
                    Image <span style={{ color: "#EF4444" }}>*</span>
                  </label>
                  <div
                    style={{
                      border: "1px solid #00000012",
                      borderRadius: "8px",
                      backgroundColor: "#F5F5F599",
                      padding: "32px 16px",
                      textAlign: "center",
                      position: "relative",
                      minHeight: "139px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <p
                        className="font-[Montserrat]"
                        style={{
                          fontWeight: 400,
                          color: "#9D9999",
                          fontSize: "12px",
                          margin: 0,
                        }}
                      >
                        Upload or drag multiple images here.
                      </p>
                      <Upload
                        size={20}
                        style={{
                          color: "#9D9999",
                        }}
                      />
                    </div>

                    {formik.values.image && formik.values.image.length > 0 && (
                      <div
                        style={{
                          marginTop: "8px",
                          textAlign: "left",
                        }}
                      >
                        {Array.from(formik.values.image).map((file, index) => (
                          <p
                            key={index}
                            style={{
                              fontSize: "11px",
                              color: "#6B7280",
                              margin: 0,
                            }}
                          >
                            {file.name}
                          </p>
                        ))}
                      </div>
                    )}

                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) =>
                        formik.setFieldValue("image", e.target.files)
                      }
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        opacity: 0,
                        cursor: "pointer",
                      }}
                    />
                  </div>

                  {formik.touched.image && formik.errors.image && (
                    <div
                      className="font-[Montserrat]"
                      style={{
                        color: "#EF4444",
                        fontSize: "12px",
                        marginTop: "4px",
                      }}
                    >
                      {formik.errors.image}
                    </div>
                  )}
                </div>
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 6, lg: 8 }}>
                <Textarea
                  className="font-[Montserrat]"
                  label="Description"
                  placeholder="Write description of the product..."
                  rows={6}
                  {...formik.getFieldProps("description")}
                  error={
                    formik.touched.description && formik.errors.description
                  }
                  styles={{
                    label: {
                      fontWeight: 600,
                      fontSize: "12px",
                      paddingBottom: "8px",
                    },
                    input: {
                      fontFamily: "Montserrat",
                      border: "1px solid #00000012",
                      borderRadius: "8px",
                      backgroundColor: "#F5F5F599",
                      height: "139px",
                      fontWeight: 400,
                      fontSize: "12px",
                    },
                  }}
                />
              </Grid.Col>
            </Grid>

            <Group justify="flex-start" mt={{ base: 40, md: 100 }} gap="xl">
              <Button
                className="font-[Montserrat]"
                color="#0F783B"
                type="submit"
                variant="filled"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 600,
                  fontSize: "12px",
                  backgroundColor: "#0F783B",
                  fontFamily: "Montserrat",
                  border: "1px solid #0F783B1A",
                  width: "160px",
                  height: "40px",
                  padding: "0",
                  lineHeight: "1",
                }}
                radius="xl"
                size="md"
              >
                Send Request
              </Button>

              <Button
                className="font-[Montserrat]"
                variant="outline"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#F3FBF2",
                  fontWeight: 600,
                  fontSize: "12px",
                  border: "1px solid #BE8B454D",
                  color: "#BE8B45",
                  fontFamily: "Montserrat",
                  width: "160px",
                  height: "40px",
                  padding: "0",
                  lineHeight: "1",
                }}
                size="md"
                radius="xl"
                onClick={() => formik.resetForm()}
              >
                Cancel
              </Button>
            </Group>
          </form>
        </Paper>
      </div>
    </>
  );
};
