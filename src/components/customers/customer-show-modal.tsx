"use client";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import { Customer } from "@prisma/client";
import { AiOutlineEye } from "react-icons/ai";

interface CustomerShowModalProps {
  customer: Customer & {
    _count: {
      customerProduct: number;
    };
  };
}

export default function CustomerShowModal({ customer }: CustomerShowModalProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const dtStyle = "text-gray-400 text-sm";
  return (
    <>
      <AiOutlineEye className="text-xl cursor-pointer" onClick={onOpen} />
      <Modal size="xs" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">顧客情報</ModalHeader>
              <ModalBody>
                <div className="grid gap-6">
                  <div className="grid grid-cols-2">
                    <dl>
                      <dt className={`${dtStyle}`}>顧客コード</dt>
                      <dd>{customer.code}</dd>
                    </dl>
                    <dl>
                      <dt className={`${dtStyle}`}>EDIコード</dt>
                      <dd>{customer.ediCode}</dd>
                    </dl>
                  </div>
                  <dl>
                    <dt className={`${dtStyle}`}>顧客名</dt>
                    <dd>{customer.name}</dd>
                  </dl>
                  <dl>
                    <dt className={`${dtStyle}`}>住所</dt>
                    <dd>{customer.address}</dd>
                  </dl>
                  <dl>
                    <dt className={`${dtStyle}`}>Tel</dt>
                    <dd>{customer.tel}</dd>
                  </dl>
                  <dl>
                    <dt className={`${dtStyle}`}>備考</dt>
                    <dd>{customer.tel}</dd>
                  </dl>
                </div>
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
