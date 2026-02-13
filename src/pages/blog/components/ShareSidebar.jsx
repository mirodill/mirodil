import { Button } from "@/components/ui/button";
import { ArrowLeft, Send, Facebook, Copy, Check } from "lucide-react";
import { FacebookShareButton, TelegramShareButton } from "react-share";

const ShareSidebar = ({ url, title, onCopy, copied, onBack }) => (
  <aside className="hidden lg:block lg:col-span-1">
    <div className="sticky top-24 flex flex-col items-center gap-5">
      <Button
        variant="outline"
        size="icon"
        onClick={onBack}
        className="rounded-full hover:bg-gray-50 border-gray-200 shadow-sm transition-all"
      >
        <ArrowLeft className="size-5 text-gray-600" />
      </Button>

      <div className="flex flex-col gap-4 items-center">
        <TelegramShareButton url={url} title={title}>
          <div className="flex items-center justify-center rounded-full border border-gray-200 h-10 w-10 hover:bg-sky-50 transition-colors cursor-pointer">
            <Send className="size-5 text-sky-600" />
          </div>
        </TelegramShareButton>

        <FacebookShareButton url={url} quote={title}>
          <div className="flex items-center justify-center rounded-full border border-gray-200 h-10 w-10 hover:bg-blue-50 transition-colors cursor-pointer">
            <Facebook className="size-5 text-blue-600" />
          </div>
        </FacebookShareButton>

        <Button
          variant="outline"
          size="icon"
          onClick={onCopy}
          className={`rounded-full transition-all duration-300 ${copied ? "bg-green-50 border-green-500" : "hover:bg-gray-100"}`}
        >
          {copied ? <Check className="size-5 text-green-600" /> : <Copy className="size-5 text-gray-600" />}
        </Button>
      </div>
    </div>
  </aside>
);

export default ShareSidebar;