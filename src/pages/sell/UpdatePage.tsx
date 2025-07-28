import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import {
  TextInput,
  Select,
  NumberInput,
  Button,
  Group,
  Grid,
  Paper,
  Title,
  Modal,
  Center,
  Textarea,
} from "@mantine/core";
import { Check, Upload, X } from "lucide-react";
import { HiMiniChevronDown } from "react-icons/hi2";
import axios from "axios";
import { productValidationSchema } from "../../validation/productSchema";
import type { Product } from "../../types";

const UpdatePage = () => {
  const { id } = useParams<{ id: string }>();

  type ProductFormValues = {
    productName: string;
    category: string;
    availableQuantity: number | null;
    unit: string;
    unitPrice: number | null;
    productLocation: string;
    description: string;
    image: FileList | File[] | null;
  };

  const navigate = useNavigate();
  const [opened, setOpened] = useState(false);
  const [initialData, setInitialData] = useState<Product | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/product/${id}`);
        setInitialData(res.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const formik = useFormik<ProductFormValues>({
    enableReinitialize: true,
    initialValues: {
      productName: initialData?.productName || "",
      category: initialData?.category || "",
      availableQuantity: initialData?.availableQuantity || null,
      unit: initialData?.unit || "",
      unitPrice: initialData?.unitPrice || null,
      productLocation: initialData?.productLocation || "",
      description: initialData?.description || "",
      image: null,
    },
    validationSchema: productValidationSchema,

    onSubmit: async (values) => {
      setIsSubmitting(true);
      
      try {
        const formData = new FormData();

        formData.append("productName", values.productName);
        formData.append("category", values.category);
        formData.append("availableQuantity", String(values.availableQuantity ?? 0));
        formData.append("unit", values.unit);
        formData.append("unitPrice", String(values.unitPrice ?? 0));
        formData.append("productLocation", values.productLocation);
        formData.append("description", values.description);

        if (values.image && values.image.length > 0) {
          Array.from(values.image).forEach((file) => {
            formData.append("images", file);
          });
        }

        console.log("FormData entries:", [...formData.entries()]);

        const response = await axios.patch(`http://localhost:3000/product/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        console.log("Update successful:", response.data);

        // Reset the file input after successful update
        formik.setFieldValue("image", null);
        
        setOpened(true);
      } catch (error) {
        console.error("Error updating product:", error);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const handleQuantityOrPriceChange = () => {
    const total =
      (formik.values.availableQuantity ?? 0) * (formik.values.unitPrice ?? 0);
    formik.setFieldValue("totalPrice", total);
  };

  const handleRemoveImage = (indexToRemove: number) => {
    if (formik.values.image instanceof FileList) {
      const filesArray = Array.from(formik.values.image);
      const updatedFiles = filesArray.filter((_, index) => index !== indexToRemove);
      
      // Create a new FileList-like object
      const dataTransfer = new DataTransfer();
      updatedFiles.forEach(file => dataTransfer.items.add(file));
      
      formik.setFieldValue("image", dataTransfer.files);
    }
  };

  if (!initialData) return <p>Loading...</p>;

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => {
          setOpened(false);
          navigate("/sell");
        }}
        centered
        withCloseButton={false}
        size="sm"
        radius="lg"
        overlayProps={{ color: "gray" }}
      >
        <Center className="flex flex-col gap-4 text-center px-4 py-6">
          <div className="w-16 h-16 rounded-full bg-[#0F783B] flex items-center justify-center">
            <Check size={28} color="white" />
          </div>
          <h2 className="text-lg font-semibold text-[#0F783B]">
            Updated Successfully!
          </h2>
        </Center>
      </Modal>

      <div className="p-6 m-3 mb-25 bg-[#FFFFFF] border border-[#0F783B1F] rounded-[12px]">
        <Paper className="rounded-lg">
          <Title
            order={3}
            className="pb-3 font-bold font-[Montserrat] text-[#BE8B45] text-[18px] leading-[100%] tracking-normal"
          >
            Update Product
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
                  onBlur={() => formik.setFieldTouched("productName", true)} // Added onBlur handler
                  error={formik.touched.productName && formik.errors.productName}
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
                      padding: "16px",
                      textAlign: "center",
                      position: "relative",
                      minHeight: "139px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {/* Upload Area */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        marginBottom: "8px",
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
                      <Upload size={20} style={{ color: "#9D9999" }} />
                    </div>

                    {/* New Files Preview */}
                    {formik.values.image instanceof FileList &&
                      formik.values.image.length > 0 && (
                        <div style={{ marginTop: "8px", width: "100%" }}>
                          <p style={{ fontSize: "11px", color: "#6B7280", margin: "0 0 8px 0", fontWeight: 600 }}>
                            Selected files:
                          </p>
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                              gap: "8px",
                              marginBottom: "8px",
                            }}
                          >
                            {Array.from(formik.values.image).map((file, index) => (
                              <div key={index} style={{ position: "relative" }}>
                                <img
                                  src={URL.createObjectURL(file)}
                                  alt={`Selected ${index}`}
                                  style={{
                                    width: "60px",
                                    height: "60px",
                                    objectFit: "cover",
                                    borderRadius: "4px",
                                    border: "1px solid #e5e5e5",
                                  }}
                                />
                                <button
                                  type="button"
                                  onClick={() => handleRemoveImage(index)}
                                  style={{
                                    position: "absolute",
                                    top: "-5px",
                                    right: "-5px",
                                    background: "#ef4444",
                                    border: "none",
                                    borderRadius: "50%",
                                    width: "20px",
                                    height: "20px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    cursor: "pointer",
                                    color: "white",
                                  }}
                                >
                                  <X size={12} />
                                </button>
                              </div>
                            ))}
                          </div>
                          <div style={{ textAlign: "left" }}>
                            {Array.from(formik.values.image).map(
                              (file, index) => (
                                <p
                                  key={index}
                                  style={{
                                    fontSize: "10px",
                                    color: "#6B7280",
                                    margin: "0 0 2px 0",
                                  }}
                                >
                                  {file.name}
                                </p>
                              )
                            )}
                          </div>
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

                  {/* Added error display for image field to match Add Product */}
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
                  error={formik.touched.description && formik.errors.description}
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
                type="submit"
                className="font-[Montserrat]"
                color="#0F783B"
                variant="filled"
                loading={isSubmitting}
                disabled={isSubmitting}
                style={{
                  fontWeight: 600,
                  fontSize: "12px",
                  backgroundColor: "#0F783B",
                  border: "1px solid #0F783B1A",
                  width: "160px",
                  height: "40px",
                }}
                radius="xl"
              >
                {isSubmitting ? "Updating..." : "Update Product"}
              </Button>
              <Button
                className="font-[Montserrat]"
                variant="outline"
                disabled={isSubmitting}
                style={{
                  backgroundColor: "#F3FBF2",
                  fontWeight: 600,
                  fontSize: "12px",
                  border: "1px solid #BE8B454D",
                  color: "#BE8B45",
                  width: "160px",
                  height: "40px",
                }}
                radius="xl"
                onClick={() => navigate("/sell")}
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

export default UpdatePage;