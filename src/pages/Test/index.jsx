import React from "react";
import {
  Button,
  Dialog,
  DialogBody,
} from "@material-tailwind/react";
 
export default function Test() {
  const [open, setOpen] = React.useState(false);
 
  const handleOpen = () => setOpen(!open);
 
  return (
    <>
      <Button onClick={handleOpen}>Notification</Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogBody divider className="">
          
        </DialogBody>

      </Dialog>
    </>
  );
}