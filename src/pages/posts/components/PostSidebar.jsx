import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import CreatableSelect from 'react-select/creatable';

const PostSidebar = ({ formData, setFormData, categories, handleImageChange }) => (
  <div className="space-y-6">
    {/* Nashr sozlamalari */}
    <Card>
      <CardHeader><CardTitle className="text-sm font-semibold">Nashr sozlamalari</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Holati</Label>
          <Select value={formData.status} onValueChange={v => setFormData({...formData, status: v})}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Qoralama</SelectItem>
              <SelectItem value="published">Nashr etish</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Kategoriya</Label>
          <Select value={formData.category} onValueChange={v => setFormData({...formData, category: v})}>
            <SelectTrigger><SelectValue placeholder="Tanlang" /></SelectTrigger>
            <SelectContent>
              {categories.map(c => <SelectItem key={c.id} value={String(c.id)}>{c.name}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>

    {/* Teglar */}
    <Card>
      <CardHeader><CardTitle className="text-sm font-semibold">Teglar</CardTitle></CardHeader>
      <CardContent>
        <CreatableSelect
          isMulti
          placeholder="Teglar..."
          value={formData.tags}
          onChange={(tags) => setFormData({ ...formData, tags })}
          styles={{ control: (base) => ({ ...base, borderRadius: '0.6rem' }) }}
        />
      </CardContent>
    </Card>

    {/* Rasm yuklash */}
    <Card>
      <CardHeader><CardTitle className="text-sm font-semibold">Muqova rasmi</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <Input type="file" accept="image/*" onChange={handleImageChange} className="cursor-pointer" />
        {formData.cover_image && (
          <div className="relative group rounded-lg overflow-hidden border">
            <img src={formData.cover_image} alt="Preview" className="w-full h-auto" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Button variant="destructive" size="icon" onClick={() => setFormData({...formData, cover_image: ''})}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  </div>
);

export default PostSidebar;