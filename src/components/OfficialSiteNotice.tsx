import { useEffect, useState } from "react";
import { ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export function OfficialSiteNotice() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-h-[85dvh] w-[calc(100%-2rem)] overflow-y-auto rounded-md sm:max-w-md">
        <DialogHeader className="text-left">
          <ShieldAlert className="mb-3 h-8 w-8 text-accent" aria-hidden="true" />
          <DialogTitle className="pr-6 font-display leading-snug">Official GL Biochem Peptide website</DialogTitle>
          <DialogDescription className="pt-3 leading-relaxed">
            Our official customer website is <strong className="break-all text-foreground">glbiochempeptid.org</strong>.
            Be alert to other websites claiming to represent GL Biochem Peptide — they may be impersonating our business.
          </DialogDescription>
        </DialogHeader>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Check the address carefully before sharing personal details or arranging payment. If you are unsure, contact us on WhatsApp at +852 9441 6934 or email <span className="break-all">jingyanglbiochempeptides@gmail.com</span>.
        </p>
        <Button onClick={() => setOpen(false)} className="mt-1 w-full">I understand — continue</Button>
      </DialogContent>
    </Dialog>
  );
}