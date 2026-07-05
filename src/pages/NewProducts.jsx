import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, } from "@/components/ui/breadcrumb"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldDescription
} from "@/components/ui/field"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { products } from "@/components/Data/ProductData"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Bold, Italic, List, ListOrdered, Underline } from "lucide-react"
import { useState } from "react"


export function NewProductsHeader() {
  return (
    <>
      <div className="p-5 w-full flex items-center justify-between">
        <div>
          <h1 className="font-bold text-2xl pb-5">Add Products</h1>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/products">Products</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Add Product</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div>
          <button className="text-white bg-[#5A34FD] flex px-4 py-3 gap-2 rounded-lg cursor-pointer"><p>Publish Product</p></button>
        </div>
      </div>
    </>
  )
}







export default function NewProducts() {

  const [currentHeading, setCurrentHeading] = useState("paragraph");

  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
    onSelectionUpdate: ({ editor }) => {
      for (let i = 1; i <= 6; i++) {
        if (editor.isActive("heading", { level: i })) {
          setCurrentHeading(`h${i}`);
          return;
        }
      }

      setCurrentHeading("paragraph");
    },
  });

  const allCategory = [...new Set(products.map(item => item.collectionName))]


  return (
    <>
      <div className="bg-[#FAFBFD] px-5">
        <NewProductsHeader />

        <div className="grid md:grid-cols-2">
          <div className="flex flex-col gap-6">
            <div className="p-5 bg-white shadow-2xs border border-light-50 rounded-lg">
              <Card>
                <CardHeader>
                  <CardTitle className='font-bold capitalize' >Product Information </CardTitle>
                </CardHeader>

                <CardContent>
                  <FieldGroup className='grid grid-cols-2 pb-5'>
                    <Field >
                      <FieldLabel htmlFor="input-required">
                        Product Name <span className="text-destructive">*</span>
                      </FieldLabel>
                      <Input
                        id="input-required"
                        placeholder="Enter Product Name"
                        required
                      />

                    </Field>
                    <Field>
                      <FieldLabel >
                        Sku
                      </FieldLabel>
                      <Input
                        id="input-required"
                        placeholder="Enter Sku"
                        required
                      />
                    </Field>
                  </FieldGroup>
                  <FieldGroup className='pb-5'>
                    <Field >
                      <FieldLabel htmlFor="input-required">
                        Category <span className="text-destructive">*</span>
                      </FieldLabel>
                      <Select>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup >

                            {
                              allCategory.map((item) => {
                                return (

                                  <SelectItem key={item} value={item}>
                                    {item}
                                  </SelectItem>

                                )
                              })
                            }

                          </SelectGroup>

                        </SelectContent>
                      </Select>
                      <Field>
                        <FieldLabel htmlFor="block-start-textarea">Short Description </FieldLabel>
                        <InputGroup>
                          <InputGroupTextarea
                            id="block-start-textarea"
                            placeholder="Enter short description"
                            className="text-sm"
                          />
                        </InputGroup>

                      </Field>
                    </Field>

                  </FieldGroup>
                  <FieldGroup>
                    <Field>
                      <FieldLabel>
                        Product Description
                      </FieldLabel>
                      <div className="border rounded-lg overflow-hidden min-h-[250px]">

                        <div className="flex gap-2 border-b p-2">
                          <Select
                            value={currentHeading}
                            onValueChange={(value) => {
                              if (value === "paragraph") {
                                editor?.chain().focus().setParagraph().run();
                              } else {
                                editor?.chain().focus().toggleHeading({
                                  level: Number(value.replace("h", "")),
                                }).run();
                              }
                            }}
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue />
                            </SelectTrigger>

                            <SelectContent>
                              <SelectItem value="paragraph">Paragraph</SelectItem>
                              <SelectItem value="h1">Heading 1</SelectItem>
                              <SelectItem value="h2">Heading 2</SelectItem>
                              <SelectItem value="h3">Heading 3</SelectItem>
                              <SelectItem value="h4">Heading 4</SelectItem>
                              <SelectItem value="h5">Heading 5</SelectItem>
                              <SelectItem value="h6">Heading 6</SelectItem>
                            </SelectContent>
                          </Select>
                          <button
                            type="button"
                            className="cursor-pointer"
                            onClick={() => editor?.chain().focus().toggleBold().run()}
                          >
                            <Bold size={18} />
                          </button>

                          <button
                            type="button"
                            className="cursor-pointer uppercase"
                            onClick={() => editor?.chain().focus().toggleItalic().run()}
                          >
                            <Italic size={18} />
                          </button>

                          <button
                            type="button"
                            className="cursor-pointer uppercase"
                            onClick={() => editor?.chain().focus().toggleUnderline().run()}
                          >
                            <Underline size={18} />
                          </button>
                          <button
                            type="button"
                            className={editor.isActive("bulletList") ? "bg-gray-200 cursor-pointer" : "cursor-pointer"}
                            onClick={() => editor.chain().focus().toggleBulletList().run()}
                          >
                            <List size={18} />
                          </button>
                          <button
                            type="button"
                            className={editor.isActive("bulletList") ? "bg-gray-200 cursor-pointer" : "cursor-pointer"}
                            onClick={() => editor.chain().focus().toggleOrderedList().run()}
                          >
                            <ListOrdered size={18} />
                          </button>
                        </div>

                        <EditorContent
                          editor={editor}
                          className="w-full p-3 [&_.ProseMirror]:w-full [&_.ProseMirror]:min-h-[200px] [&_.ProseMirror]:outline-none [&_.ProseMirror_h1]:text-4xl [&_.ProseMirror_h1]:font-bold [&_.ProseMirror_h2]:text-3xl [&_.ProseMirror_h2]:font-bold  [&_.ProseMirror_h3]:text-2xl [&_.ProseMirror_h3]:font-semibold [&_.ProseMirror_h4]:text-xl [&_.ProseMirror_h4]:font-semibold [&_.ProseMirror_ul]:list-disc &_.ProseMirror_ul]:pl-6 [&_.ProseMirror_ol]:list-decimal [&_.ProseMirror_ol]:pl-6 "
                        />
                      </div>
                    </Field>
                  </FieldGroup>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

    </>

  )
}
