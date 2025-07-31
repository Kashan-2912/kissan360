import React, { useEffect } from 'react';
import { Container, Group, Text, Stack, Paper, Image, Flex } from '@mantine/core';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { selectOrders, selectSelectedOrder, setSelectedOrder } from '../../store/orderHistorySlice';
import type { OrderDetails, OrderedProduct } from '../../types';
import IMG from "../../assets/f3.png";

const ViewOrderDetails: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orderId } = useParams<{ orderId: string }>();

  console.log("ORDER ID: ", orderId)
  
  const orders = useSelector(selectOrders);
  const selectedOrder = useSelector(selectSelectedOrder);

  // console.log("selected order id: ", selectedOrder?.orderedProducts.length)

  // Find and set the selected order when component mounts or orderId changes
  useEffect(() => {
    if (orderId && orders.length > 0) {
      const order = orders.find(o => o.orderId === orderId);
      if (order) {
        dispatch(setSelectedOrder(order));
      } else {
        // Order not found, redirect back to order history
        navigate(`/purchase/order/${orderId}`);
      }
    }
  }, [orderId, orders, dispatch, navigate]);

  // If no order is selected or found, show loading or redirect
  if (!selectedOrder) {
    return (
      <Container style={{ padding: '2px', minHeight: '100vh' }}>
        <Paper bg={"transparent"} style={{ maxWidth: '896px', borderRadius: '8px' }}>
          <Text>Loading order details...</Text>
        </Paper>
      </Container>
    );
  }

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

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
  };

  // Format shipping address
  const formatShippingAddress = (shippingAddress: OrderDetails['shippingAddress']) => {
    return `${shippingAddress.address}, ${shippingAddress.city}, ${shippingAddress.district}, ${shippingAddress.state}, ${shippingAddress.country} - ${shippingAddress.postalCode}`;
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return `PKR ${amount.toLocaleString()}`;
  };

  const ProductCard: React.FC<{ product: OrderedProduct }> = ({ product }) => (
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
          src={product.image || IMG} // Use product image or fallback
          alt={product.name}
          style={{
            width: '98px',
            height: '133px',
            objectFit: 'cover',
            borderRadius: '4px',
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
          {product.name}
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
        
        {/* Unit Price */}
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
            Unit Price:
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
            {formatCurrency(product.unitPrice)}
          </Text>
        </Group>

        {/* Total Price for this product */}
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
            Total:
          </Text>
          <Text
            style={{
              fontWeight: 600,
              fontSize: '16px',
              lineHeight: '1',
              letterSpacing: 'normal',
              color: '#0F783B',
              fontFamily: 'Poppins'
            }}
          >
            {formatCurrency(product.totalPrice)}
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
                {selectedOrder.orderId}
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
                {formatDate(selectedOrder.orderDate)}
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
                {formatCurrency(selectedOrder.totalAmount)}
              </Text>
            </Group>
          </Flex>
          
          {/* Second Row: Status, Customer Info */}
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
                  color: getStatusColor(selectedOrder.status),
                  fontFamily: 'Montserrat'
                }}
              >
                {selectedOrder.status}
              </Text>
            </Group>
            
            {/* Customer Info */}
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
                Customer
              </Text>
              <Text
                style={{
                  fontWeight: 600,
                  fontSize: '16px',
                  color: 'black',
                  fontFamily: 'Montserrat'
                }}
              >
                {selectedOrder.customerName}
              </Text>
            </Group>
          </Flex>

          {/* Third Row: Shipping Details */}
          <Flex align="flex-start" justify="flex-start" style={{ width: '100%' }}>
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
                Shipping Address
              </Text>
              <Text
                style={{
                  fontWeight: 600,
                  fontSize: '16px',
                  color: 'black',
                  fontFamily: 'Montserrat',
                  maxWidth: '600px',
                  lineHeight: '1.4'
                }}
              >
                {formatShippingAddress(selectedOrder.shippingAddress)}
              </Text>
            </Group>
          </Flex>

          {/* Contact Information */}
          <Flex align="center" justify="space-between">
            {/* Email */}
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
                Email
              </Text>
              <Text
                style={{
                  fontWeight: 600,
                  fontSize: '16px',
                  color: 'black',
                  fontFamily: 'Montserrat'
                }}
              >
                {selectedOrder.customerEmail}
              </Text>
            </Group>
            
            {/* Contact Number */}
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
                Contact
              </Text>
              <Text
                style={{
                  fontWeight: 600,
                  fontSize: '16px',
                  color: 'black',
                  fontFamily: 'Montserrat'
                }}
              >
                {selectedOrder.contactNumber}
              </Text>
            </Group>

            {selectedOrder.alternateNumber && (
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
                  Alternate
                </Text>
                <Text
                  style={{
                    fontWeight: 600,
                    fontSize: '16px',
                    color: 'black',
                    fontFamily: 'Montserrat'
                  }}
                >
                  {selectedOrder.alternateNumber}
                </Text>
              </Group>
            )}
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
              {selectedOrder.totalItems}
            </Text>
          </Group>
          
          {/* Products List */}
          <Stack gap={30}>
            {selectedOrder.orderedProducts.map((product) => (
              <ProductCard key={`${product.id}-${product.orderId}`} product={product} />
            ))}
          </Stack>
        </Stack>
      </Paper>
    </Container>
  );
};

export default ViewOrderDetails;