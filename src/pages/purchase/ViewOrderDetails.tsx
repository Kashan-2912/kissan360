import React from 'react';
import { Container, Group, Text, Stack, Paper, Image, Flex } from '@mantine/core';
// import { useSelector } from 'react-redux';
// import { RootState } from '../store/store';
import IMG from "../../assets/f3.png"

interface Product {
  id: string;
  image: string;
  productName: string;
  category: string;
  quantity: string;
  price: string;
}

interface OrderDetails {
  orderId: string;
  orderDate: string;
  totalPrice: string;
  status: string;
  shippingDetails: string;
  totalProducts: number;
  products: Product[];
}

const ViewOrderDetails: React.FC = () => {
  // Get order details from Redux store (commented out for demo)
  // const orderDetails = useSelector((state: RootState) => state.orders.currentOrder);

  // Dummy data for demonstration
  const orderDetails: OrderDetails = {
    orderId: "47895303",
    orderDate: "47895303",
    totalPrice: "PKR 30,000",
    status: "Shipped",
    shippingDetails: "Sybrid Private Limited, street 14, i9/2, Islamabad, Pakistan",
    totalProducts: 2,
    products: [
      {
        id: "1",
        image: IMG,
        productName: "Nitrophos NP",
        category: "Fertilizer",
        quantity: "1 bag",
        price: "9,000 PKR"
      },
      {
        id: "2",
        image: IMG,
        productName: "Urea",
        category: "Fertilizer",
        quantity: "1 bag",
        price: "9,000 PKR"
      }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Shipped":
        return "#BD8E43";
      case "Pending":
        return "#D63535";
      case "Delivered":
        return "#0F783B";
      case "Cancelled":
        return "#6B7280";
      default:
        return "gray";
    }
  };

  const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
    <Flex align="center" gap={42} style={{ width: '579px', height: '182px' }}>
      {/* Image Container with white background */}
      <Paper
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0px 4px 10px 0px rgba(0,0,0,0.15)',
          width: '206px',
          height: '182px',
        }}
      >
        <Image
          src={product.image}
          alt={product.productName}
          style={{
            width: '98px',
            height: '133px',
            objectFit: 'cover',
            borderRadius: '4px',
            // boxShadow: '0px 4px 10px 0px rgba(0,0,0,0.1)'
          }}
        />
      </Paper>
      
      {/* Product Details Container - Left aligned */}
      <Stack justify="center" style={{ width: '167px', height: '122px' }} gap={16}>
        {/* Product Name */}
        <Text
          style={{
            textAlign: 'left',
            color: 'black',
            fontWeight: 600,
            fontSize: '24px',
            lineHeight: '1',
            letterSpacing: 'normal',
            fontFamily: 'Montserrat'
          }}
        >
          {product.productName}
        </Text>
        
        {/* Category */}
        <Group gap={4} style={{ justifyContent: 'flex-start' }}>
          <Text
            style={{
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '1',
              letterSpacing: 'normal',
              color: '#7B7B7B',
              fontFamily: 'Poppins'
            }}
          >
            Category:
          </Text>
          <Text
            style={{
              fontWeight: 500,
              fontSize: '16px',
              lineHeight: '1',
              letterSpacing: 'normal',
              color: '#BE8B45',
              fontFamily: 'Poppins'
            }}
          >
            {product.category}
          </Text>
        </Group>
        
        {/* Quantity */}
        <Group gap={4} style={{ justifyContent: 'flex-start' }}>
          <Text
            style={{
              fontWeight: 400,
              fontSize: '14px',
              lineHeight: '1',
              letterSpacing: 'normal',
              color: '#7B7B7B',
              fontFamily: 'Poppins'
            }}
          >
            Quantity:
          </Text>
          <Text
            style={{
              fontWeight: 400,
              fontSize: '14px',
              lineHeight: '1',
              letterSpacing: 'normal',
              color: '#202020',
              fontFamily: 'Poppins'
            }}
          >
            {product.quantity}
          </Text>
        </Group>
        
        {/* Price */}
        <Group gap={4} style={{ justifyContent: 'flex-start' }}>
          <Text
            style={{
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '1',
              letterSpacing: 'normal',
              color: '#7B7B7B',
              fontFamily: 'Poppins'
            }}
          >
            Price:
          </Text>
          <Text
            style={{
              fontWeight: 600,
              fontSize: '16px',
              lineHeight: '1',
              letterSpacing: 'normal',
              color: '#202020',
              fontFamily: 'Poppins'
            }}
          >
            {product.price}
          </Text>
        </Group>
      </Stack>
    </Flex>
  );

  return (
    <Container style={{ padding: '2px', minHeight: '100vh' }}>
      <Paper bg={"transparent"} style={{ maxWidth: '896px', borderRadius: '8px' }}>
        {/* Order Header Information */}
        <Stack gap={32} style={{ marginBottom: '40px' }}>
          {/* First Row: Order ID, Order Date, Total Price */}
          <Flex align="center" justify="space-between">
            {/* Order ID */}
            <Group gap={16}>
              <Text
                style={{
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: '1',
                  letterSpacing: 'normal',
                  color: '#5C5C5C',
                  fontFamily: 'Montserrat'
                }}
              >
                Order ID
              </Text>
              <Text
                style={{
                  fontWeight: 600,
                  fontSize: '16px',
                  lineHeight: '1',
                  letterSpacing: 'normal',
                  color: 'black',
                  fontFamily: 'Montserrat'
                }}
              >
                {orderDetails.orderId}
              </Text>
            </Group>
            
            {/* Order Date */}
            <Group gap={16}>
              <Text
                style={{
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: '1',
                  letterSpacing: 'normal',
                  color: '#5C5C5C',
                  fontFamily: 'Montserrat'
                }}
              >
                Order Date
              </Text>
              <Text
                style={{
                  fontWeight: 600,
                  fontSize: '16px',
                  lineHeight: '1',
                  letterSpacing: 'normal',
                  color: 'black',
                  fontFamily: 'Montserrat'
                }}
              >
                {orderDetails.orderDate}
              </Text>
            </Group>
            
            {/* Total Price */}
            <Group gap={16}>
              <Text
                style={{
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: '1',
                  letterSpacing: 'normal',
                  color: '#5C5C5C',
                  fontFamily: 'Montserrat'
                }}
              >
                Total Price
              </Text>
              <Text
                style={{
                  fontWeight: 600,
                  fontSize: '16px',
                  lineHeight: '1',
                  letterSpacing: 'normal',
                  color: 'black',
                  fontFamily: 'Montserrat'
                }}
              >
                {orderDetails.totalPrice}
              </Text>
            </Group>
          </Flex>
          
          {/* Second Row: Status, Shipping Details */}
          <Flex align="flex-start" justify="space-between" style={{ width: '100%' }}>
            {/* Status */}
            <Group gap={16}>
              <Text
                style={{
                  fontWeight: 400,
                  fontSize: '14px',
                  whiteSpace: 'nowrap',
                  color: '#5C5C5C',
                  fontFamily: 'Montserrat'
                }}
              >
                Status
              </Text>
              <Text
                style={{
                  fontWeight: 600,
                  fontSize: '16px',
                  color: getStatusColor(orderDetails.status),
                  fontFamily: 'Montserrat'
                }}
              >
                {orderDetails.status}
              </Text>
            </Group>
            
            {/* Shipping Details */}
            <Group gap={16} style={{ marginLeft: '80px' }}>
              <Text
                style={{
                  fontWeight: 400,
                  fontSize: '14px',
                  whiteSpace: 'nowrap',
                  color: '#5C5C5C',
                  fontFamily: 'Montserrat'
                }}
              >
                Shipping Details
              </Text>
              <Text
                style={{
                  fontWeight: 600,
                  fontSize: '16px',
                  color: 'black',
                  fontFamily: 'Montserrat'
                }}
              >
                {orderDetails.shippingDetails}
              </Text>
            </Group>
          </Flex>
        </Stack>
        
        {/* Product Information Section */}
        <Stack style={{ marginTop: '48px' }}>
          <Text
            style={{
              fontWeight: 700,
              fontSize: '18px',
              lineHeight: '1',
              letterSpacing: 'normal',
              marginBottom: '4px',
              color: '#BE8B45',
              fontFamily: 'Montserrat'
            }}
          >
            Product Information
          </Text>
          
          {/* Total Products */}
          <Group gap={16} style={{ marginBottom: '32px' }}>
            <Text
              style={{
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '1',
                letterSpacing: 'normal',
                color: '#5C5C5C',
                fontFamily: 'Montserrat'
              }}
            >
              Total Products
            </Text>
            <Text
              style={{
                fontWeight: 600,
                fontSize: '16px',
                lineHeight: '1',
                letterSpacing: 'normal',
                color: 'black',
                fontFamily: 'Montserrat'
              }}
            >
              {orderDetails.totalProducts}
            </Text>
          </Group>
          
          {/* Products List */}
          <Stack gap={30}>
            {orderDetails.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Stack>
        </Stack>
      </Paper>
    </Container>
  );
};

export default ViewOrderDetails;

/*
// In your store/ordersSlice.ts
interface OrderState {
  currentOrder: OrderDetails | null;
  orders: OrderDetails[];
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  currentOrder: null,
  orders: [],
  loading: false,
  error: null,
};

// Actions
export const fetchOrderDetails = createAsyncThunk(
  'orders/fetchOrderDetails',
  async (orderId: string) => {
    const response = await api.getOrderDetails(orderId);
    return response.data;
  }
);

// In your component:
const ViewOrderDetails: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currentOrder, loading, error } = useSelector((state: RootState) => state.orders);
  const { orderId } = useParams<{ orderId: string }>();

  useEffect(() => {
    if (orderId) {
      dispatch(fetchOrderDetails(orderId));
    }
  }, [dispatch, orderId]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!currentOrder) return <div>Order not found</div>;

  // Rest of component logic...
};
*/