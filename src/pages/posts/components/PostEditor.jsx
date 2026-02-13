import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PenLine, Eye } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const PostEditor = ({ formData, handleTitleChange, setFormData }) => (
  <Card className="border-none shadow-md overflow-hidden">
    <CardContent className="pt-6 space-y-6">
      {/* Sarlavha */}
      <div className="space-y-2">
        <Label className="text-sm font-bold">Sarlavha *</Label>
        <Input 
          className="h-12 text-lg font-medium focus:ring-2 focus:ring-blue-500"
          value={formData.title} 
          onChange={handleTitleChange} 
          placeholder="Maqola sarlavhasini kiriting..." 
        />
        <p className="text-[11px] text-slate-400 font-mono italic">URL: {formData.slug}</p>
      </div>

      {/* Markdown Editor */}
      <div className="space-y-2">
        <Label className="text-sm font-bold">Maqola matni *</Label>
        <Tabs defaultValue="edit" className="w-full border rounded-xl overflow-hidden">
          <div className="border-b px-4 py-2 flex justify-between items-center">
            <TabsList className="bg-slate-200/50">
              <TabsTrigger value="edit" className="flex items-center gap-2 text-xs">
                <PenLine size={14} /> Yozish
              </TabsTrigger>
              <TabsTrigger value="preview" className="flex items-center gap-2 text-xs">
                <Eye size={14} /> Preview
              </TabsTrigger>
            </TabsList>
            <span className="text-[10px] text-slate-400 font-mono italic">Markdown qo'llab-quvvatlanadi</span>
          </div>

          <TabsContent value="edit" className="m-0 p-0">
            <Textarea 
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              placeholder="Maqolangizni markdown formatida yozing..."
              className="min-h-[500px] border-none focus-visible:ring-0 text-base font-mono resize-none p-6 leading-relaxed"
            />
          </TabsContent>

          <TabsContent value="preview" className="m-0 p-0">
            <div className="min-h-[500px] p-8 overflow-y-auto">
              <article className="prose prose-blue prose-slate max-w-none">
                {formData.content ? (
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {formData.content}
                  </ReactMarkdown>
                ) : (
                  <p className="text-slate-400 italic text-center py-20">Ko'rish uchun matn kiriting...</p>
                )}
              </article>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </CardContent>
  </Card>
);

export default PostEditor;