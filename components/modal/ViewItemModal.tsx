import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog"; // Assurez-vous que le chemin d'importation est correct

import { PhonePreview } from "../elements/PhonePreview";

interface ModalProps {
  show: boolean;
  onClose: () => void;
  item: any;
}

const ViewItemModal: React.FC<ModalProps> = ({ show, item, onClose }) => {
  return (
    <Dialog open={show} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Prévisualisation</DialogTitle>
          <DialogDescription>
            Ceci est uniquement un example, le rendu final dépendra du support{" "}
          </DialogDescription>
        </DialogHeader>
        <PhonePreview
          entity={item}
          // title={item?.title}
          // content={item?.contentRTE}
          // cover={item?.cover?.url}
          // startDate={item?.startDate}
        />
        {/* <DialogClose asChild>
          <button onClick={onClose}>Close</button>
        </DialogClose> */}
      </DialogContent>
    </Dialog>
  );
};

export default ViewItemModal;
