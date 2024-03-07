import {
  Button,
  Chip,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@nextui-org/react";
import OrderCreateProductQuantityInput from "./order-create-product-quantity-Input";
import { useStore } from "@/store";

interface OrderCreateProductModalProps {
  product: {
    id: string;
    productNumber: string;
    productName: string;
    color: {
      name: string;
    };
    skus: {
      id: string;
      productId: string;
      productCode: string | null;
      janCode: string | null;
      price: number;
      size: {
        name: string;
      };
      displayOrder: number;
    }[];
  };
}

export default function OrderProductModal({
  product,
}: OrderCreateProductModalProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const cart = useStore((state) => state.cart);

  const cartArea = (productId: string) => {
    const newCart = cart
      .filter((item) => item.productId === productId)
      .sort((a: { displayOrder: number }, b: { displayOrder: number }) => {
        return a.displayOrder - b.displayOrder;
      });

    return newCart.map((item) => (
      <Chip key={item.skuId} variant="bordered">
        {item.size}/{item.quantity}
      </Chip>
    ));
  };

  return (
    <>
      <div
        color="primary"
        className="px-3 py-1 text-sm cursor-pointer hover:bg-gray-100"
        onClick={onOpen}
      >
        <div>{`${product.productNumber} ${product.productName}`}</div>
        <div className="mt-1 flex gap-1">{cartArea(product.id)}</div>
      </div>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior="outside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                発注入力
              </ModalHeader>
              <ModalBody>
                <div>{`${product.productNumber} ${product.productName}`}</div>
                <Table shadow="none" aria-label="order product table">
                  <TableHeader>
                    <TableColumn className="text-center">サイズ</TableColumn>
                    <TableColumn className="text-center">数量入力</TableColumn>
                    <TableColumn className="text-center">価格</TableColumn>
                    <TableColumn className="text-center">在庫数</TableColumn>
                    <TableColumn className="text-center">
                      入荷予定数
                    </TableColumn>
                  </TableHeader>
                  <TableBody>
                    {product.skus.map((sku) => (
                      <TableRow key={sku.id}>
                        <TableCell className="text-center">
                          <div>{sku.size.name}</div>
                        </TableCell>
                        <TableCell className="flex justify-center">
                          <OrderCreateProductQuantityInput
                            product={{
                              productName: product.productName,
                              productNumber: product.productNumber,
                              color: product.color.name,
                            }}
                            sku={sku}
                          />
                        </TableCell>
                        <TableCell className="text-right">
                          {sku.price}
                        </TableCell>
                        <TableCell className="text-right">1</TableCell>
                        <TableCell className="text-right">1</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={onClose}>
                  閉じる
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
