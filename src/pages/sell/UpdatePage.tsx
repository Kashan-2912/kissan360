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
import { Check, Upload } from "lucide-react";
import { HiMiniChevronDown } from "react-icons/hi2";
import axios from "axios";
import { productValidationSchema } from "../../validation/productSchema";
import type { Product } from "../../types";

const UpdatePage = () => {
  const { id } = useParams<{ id: string }>();

  type ProductFormValues = {
    productName: string;
    category: string;
    availableQuantity: number;
    unit: string;
    unitPrice: number;
    productLocation: string;
    description: string;
    image: FileList | null;
  };

  const navigate = useNavigate();
  const [opened, setOpened] = useState(false);
  const [initialData, setInitialData] = useState<Product | null>(null);
  const [existingImages, setExistingImages] = useState<string[]>([]);

  useEffect(() => {
    axios.get(`http://localhost:3000/product/${id}`).then((res) => {
      setInitialData(res.data);
      setExistingImages(res.data.images || []);
    });
  }, [id]);

  const formik = useFormik<ProductFormValues>({
    enableReinitialize: true,
    initialValues: {
      productName: initialData?.productName || "",
      category: initialData?.category || "",
      availableQuantity: initialData?.availableQuantity || 0,
      unit: initialData?.unit || "",
      unitPrice: initialData?.unitPrice || 0,
      productLocation: initialData?.productLocation || "",
      description: initialData?.description || "",
      image: null,
    },
    validationSchema: productValidationSchema,

    onSubmit: async (values) => {
      const formData = new FormData();

      formData.append("productName", values.productName);
      formData.append("category", values.category);
      formData.append("availableQuantity", String(values.availableQuantity));
      formData.append("unit", values.unit);
      formData.append("unitPrice", String(values.unitPrice));
      formData.append("productLocation", values.productLocation);
      formData.append("description", values.description);

      // ✅ Always send existing images too:
      formData.append("existingImages", JSON.stringify(existingImages));

      // ✅ If there are new files, append them
      if (values.image && values.image.length > 0) {
        Array.from(values.image).forEach((file) => {
          formData.append("images", file);
        });
      }

      await axios.patch(`http://localhost:3000/product/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setOpened(true);
    },
  });

  const handleQuantityOrPriceChange = () => {
    const total =
      (formik.values.availableQuantity ?? 0) * (formik.values.unitPrice ?? 0);
    formik.setFieldValue("totalPrice", total);
  };

  if (!initialData) return <p>Loading...</p>;

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => {
          setOpened(false);
          navigate("/");
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
                  value={formik.values.availableQuantity}
                  onChange={(value) =>
                    formik.setFieldValue("availableQuantity", value || 0)
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
                  value={formik.values.unitPrice}
                  onChange={(value) => {
                    formik.setFieldValue("unitPrice", value || 0);
                    setTimeout(handleQuantityOrPriceChange, 0);
                  }}
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
                  {...formik.getFieldProps("productLocation")}
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
                      <Upload size={20} style={{ color: "#9D9999" }} />
                    </div>

                    {/* ✅ EXISTING IMAGES PREVIEW */}
                    {existingImages.length > 0 && (
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          marginTop: "12px",
                          gap: "8px",
                        }}
                      >
                        {existingImages.map((url, index) => (
                          <div key={index} style={{ position: "relative" }}>
                            <img
                              src={`http://localhost:3000${url}`}
                              alt={`Product ${index}`}
                              style={{
                                width: "80px",
                                height: "80px",
                                objectFit: "cover",
                                borderRadius: "4px",
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    {formik.values.image instanceof FileList &&
                      formik.values.image.length > 0 && (
                        <div style={{ marginTop: "8px", textAlign: "left" }}>
                          {Array.from(formik.values.image).map(
                            (file, index) => (
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
                            )
                          )}
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
                </div>
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 6, lg: 8 }}>
                <Textarea
                  className="font-[Montserrat]"
                  label="Description"
                  placeholder="Write description of the product..."
                  rows={6}
                  {...formik.getFieldProps("description")}
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
                onClick={() => formik.submitForm()}
                className="font-[Montserrat]"
                color="#0F783B"
                type="submit"
                variant="filled"
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
                Update Product
              </Button>
              <Button
                className="font-[Montserrat]"
                variant="outline"
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
                onClick={() => navigate("/")}
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
