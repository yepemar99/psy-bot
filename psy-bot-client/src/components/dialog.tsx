import {
  Dialog as D,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

interface DialogProps {
  open: boolean;
  title?: string;
  description?: string;
  footer?: React.ReactNode;
  onOpenChange?: () => void;
}

const Dialog = ({
  open = false,
  title,
  description,
  footer,
  onOpenChange = () => {},
}: DialogProps) => {
  return (
    <D open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>{footer}</DialogFooter>
      </DialogContent>
    </D>
  );
};

export default Dialog;
