"use client";
import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import dynamic from "next/dynamic";
import { format } from "date-fns";
import { getTotalAmount } from "@/utils";

interface ShippingPDFProps {
  shipping: {
    id: number;
    orderId: number;
    shippingDate: Date;
    user: {
      name: string | null;
    };
    order: {
      id: number;
      customer: {
        name: string;
      };
    };
    shippingDetail: {
      id: number;
      price: number;
      quantity: number;
      orderDetail: {
        productCode: string | null;
        productNumber: string | null;
        productName: string | null;
        color: string | null;
        size: string | null;
      };
    }[];
  };
}

const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  {
    ssr: false,
  }
);

Font.register({
  family: "NotoSansJP",
  fonts: [
    {
      src: "../../fonts/NotoSansJP-Regular.ttf",
    },
    {
      src: "../../fonts/NotoSansJP-Bold.ttf",
      fontWeight: "bold",
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 11,
    fontFamily: "NotoSansJP",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    width: "100%",
    textAlign: "center",
    fontSize: 16,
  },
  dl: {
    display: "flex",
    flexDirection: "row",
    gap: 16,
    marginTop: 6,
  },
  dt: {
    width: 50,
  },
  dd: {
    flexGrow: 1,
  },
  table: {
    width: "100%",
    marginTop: 24,
  },
  tr: {
    display: "flex",
    flexDirection: "row",
  },
  productNumber: {
    width: 120,
  },
  productName: {
    width: 200,
  },
  size: {
    width: 100,
    textAlign: "center",
  },
  price: {
    width: 100,
    textAlign: "right",
  },
  quantity: {
    width: 100,
    textAlign: "right",
  },
  sum: {
    width: 100,
    textAlign: "right",
  },
});

export default function ShippingPDF({ shipping }: ShippingPDFProps) {
  const total = getTotalAmount(shipping.shippingDetail);
  return (
    <div
      style={{
        height: "100vh",
      }}
    >
      <PDFViewer width="100%" height="100%">
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.section}>
              <Text style={styles.title}>出荷伝票</Text>
              <View style={{ marginTop: 24 }}>
                <View style={styles.dl}>
                  <Text style={styles.dt}>得意先名</Text>
                  <Text style={styles.dd}>{shipping.order.customer.name}</Text>
                </View>
                <View style={styles.dl}>
                  <Text style={styles.dt}>出荷日</Text>
                  <Text style={styles.dd}>
                    {format(shipping.shippingDate, "yyyy-MM-dd")}
                  </Text>
                </View>
                <View style={styles.dl}>
                  <Text style={styles.dt}>担当者</Text>
                  <Text style={styles.dd}>{shipping.user.name}</Text>
                </View>
              </View>
              <View>
                <View style={styles.table}>
                  <View style={styles.tr}>
                    <Text style={styles.productNumber}>品番</Text>
                    <Text style={styles.productName}>品名</Text>
                    <Text style={styles.size}>サイズ</Text>
                    <Text style={styles.price}>単価　</Text>
                    <Text style={styles.quantity}>数量</Text>
                    <Text style={styles.sum}>合計　</Text>
                  </View>

                  {shipping.shippingDetail.map((detail) => (
                    <View key={detail.id} style={styles.tr}>
                      <Text style={styles.productNumber}>
                        {detail.orderDetail.productNumber}
                      </Text>
                      <Text style={styles.productName}>
                        {detail.orderDetail.productName}
                      </Text>
                      <Text style={styles.size}>{detail.orderDetail.size}</Text>
                      <Text style={styles.price}>
                        {detail.price.toLocaleString()}
                      </Text>
                      <Text style={styles.quantity}>{detail.quantity}</Text>
                      <Text style={styles.sum}>
                        {(detail.price * detail.quantity).toLocaleString()}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
              <Text
                style={{ width: "100%", marginTop: 12, textAlign: "right" }}
              >
                合計{total}
              </Text>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </div>
  );
}
