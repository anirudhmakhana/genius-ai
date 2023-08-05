import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "./dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useProModal } from "@/hooks/useProModal";
import { Badge } from "./badge";
import { tools } from "@/constants";
import { Card } from "./card";
import { cn } from "@/lib/utils";
import { Check, Zap } from "lucide-react";
import { Butterfly_Kids } from "next/font/google";
import { Button } from "./button";
import axios from "axios";
import { set } from "zod";

const ProModal = () => {
  const proModel = useProModal();
  const [loading, setLoading] = useState(false);

  const onSubscribe = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/stripe");
      window.location.href = response.data.url;
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={proModel.isOpen} onOpenChange={proModel.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
            <div className="flex items-center gap-x-2 font-bold py-1">
              Upgrade to Genius
              <Badge className="uppercase text-sm py-1">Pro</Badge>
            </div>
          </DialogTitle>
          <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
            {tools.map((tool) => (
              <Card
                key={tool.label}
                className="p-3 border-black/5 flex iterms-cetner justify-between"
              >
                <div className="flex items-center gap-x-4">
                  <div className={cn("p-2 w-fit rounded--md", tool.bgColor)}>
                    <tool.icon className={cn("w-6 h-6", tool.color)} />
                  </div>
                  <div>{tool.label}</div>
                </div>
                <Check />
              </Card>
            ))}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            size="lg"
            variant="premium"
            className="w-full"
            onClick={onSubscribe}
          >
            Upgrade
            <Zap className="w-6 h-6 ml-2 fill-white" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProModal;
