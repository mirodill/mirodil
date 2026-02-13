import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { User, Calendar } from "lucide-react";
import ReactMarkdown from 'react-markdown';

const LivePreview = ({ isOpen, setIsOpen, formData, categoryName }) => (
  <Dialog open={isOpen} onOpenChange={setIsOpen}>
    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 border-none shadow-2xl">
      <DialogHeader className="p-6 bg-muted/50 border-b">
        <DialogTitle className="flex justify-between items-center">
          <span>Post ko'rinishi</span>
          <Badge variant="outline">{formData.status}</Badge>
        </DialogTitle>
      </DialogHeader>
      
      <div className="p-8 space-y-8">
        {formData.cover_image && (
          <img src={formData.cover_image} className="w-full h-[400px] object-cover rounded-2xl shadow-lg" alt="Cover" />
        )}

        <div className="max-w-3xl mx-auto space-y-6">
          {categoryName && <Badge className="bg-blue-600 px-4 py-1">{categoryName}</Badge>}
          <h1 className="text-5xl font-black leading-tight text-gray-900">{formData.title || "Sarlavha yo'q"}</h1>

          <div className="flex items-center gap-6 text-sm text-muted-foreground border-y py-4">
            <div className="flex items-center gap-2"><User className="h-4 w-4" /> Admin</div>
            <div className="flex items-center gap-2"><Calendar className="h-4 w-4" /> {new Date().toLocaleDateString()}</div>
          </div>

          <div className="prose prose-lg max-w-none prose-headings:font-bold">
            {formData.content ? <ReactMarkdown>{formData.content}</ReactMarkdown> : <p className="italic">Kontent yo'q...</p>}
          </div>
        </div>
      </div>
    </DialogContent>
  </Dialog>
);

export default LivePreview;