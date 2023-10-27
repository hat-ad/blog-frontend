import React, { useState, useEffect } from "react";
import { Modal, Form, Input, InputNumber, message, Tag } from "antd";
import { CloudUploadOutlined } from "@ant-design/icons";
import * as yup from "yup";
import { CreateBlogFormProps, IBlog } from "@/types";
import { upload } from "@/requests/upload.requests";
import { useSearchParams } from "next/navigation";
import { getBlog } from "@/requests/blog.requests";

const CreateBlogForm: React.FC<CreateBlogFormProps> = ({
  visible,
  onCreate,
  onCancel,
}) => {
  const searchParams = useSearchParams();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<any[]>([]);
  const [file, setFile] = useState<any>(null);
  const [messageApi, contextHolder] = message.useMessage();

  const editing = searchParams.get("editing");
  const slug = searchParams.get("slug");
  useEffect(() => {
    if (editing && slug) {
      _getBlogs(slug);
    } else {
      form.resetFields();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editing, slug]);

  const _getBlogs = async (slug: string) => {
    const payload = {
      slug,
    };
    const response: { blog: IBlog } | string = await getBlog(payload);
    if (typeof response === "string") {
      messageApi.open({
        type: "error",
        content: response,
      });
    } else {
      form.setFieldsValue({
        ...response.blog,
      });
    }
  };

  const validationSchema = yup.object().shape({
    title: yup.string().required("Title is required"),
    content: yup.string().required("Content is required"),
    readTime: yup
      .number()
      .typeError("Read Time must be a number")
      .positive("Read Time must be a positive number")
      .required("Read Time is required"),
    // image: yup.mixed().required("Image is required"),
  });

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        if (!fileList.length && !file) {
          messageApi.open({
            type: "error",
            content: "Please upload an image!",
          });
        } else {
          const blogData = {
            ...values,
            image: file || null,
          };
          console.log(blogData);

          onCreate({ ...blogData, slug, editing });
          form.resetFields();
          setFileList([]);
          setFile(null);
        }
      })
      .catch((error) => {
        const customErrors: { [key: string]: string } = {};
        error.errorFields.forEach((field: any) => {
          customErrors[field.name[0]] = field.errors[0];
        });

        // Use form.setFields to set field errors individually
        Object.keys(customErrors).forEach((fieldName) => {
          form.setFields([
            {
              name: fieldName,
              errors: [customErrors[fieldName]],
            },
          ]);
        });
      });
  };
  console.log(file);
  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files[0];
    setFileList([selectedFile]);
    if (selectedFile) {
      messageApi.open({
        type: "info",
        content: "File uploading!",
      });
      const body = new FormData();
      body.append("file", selectedFile);
      const response = await upload(body);
      if (typeof response === "string") {
        messageApi.open({
          type: "error",
          content: response,
        });
      } else {
        messageApi.open({
          type: "success",
          content: "File uploaded!",
        });
        setFile(response.location);
      }
    }
  };

  return (
    <>
      {contextHolder}
      <Modal
        open={visible}
        title={slug && editing ? "Update Blog" : "Create Blog"}
        onOk={handleOk}
        onCancel={onCancel}
        okText={slug && editing ? "Update" : "Create"}
        cancelText="Cancel"
        className="dark"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label="Title"
            rules={[
              {
                validator: async (rule, value) => {
                  try {
                    await validationSchema.validateAt("title", {
                      title: value,
                    });
                  } catch (error: any) {
                    throw new Error(error.errors[0]);
                  }
                },
              },
            ]}
          >
            <Input className="dark" />
          </Form.Item>
          <Form.Item
            name="content"
            label="Content"
            rules={[
              {
                validator: async (rule, value) => {
                  try {
                    await validationSchema.validateAt("content", {
                      content: value,
                    });
                  } catch (error: any) {
                    throw new Error(error.errors[0]);
                  }
                },
              },
            ]}
          >
            <Input.TextArea rows={4} className="dark" />
          </Form.Item>
          <Form.Item
            name="readTime"
            label="Read Time (minutes)"
            rules={[
              {
                validator: async (rule, value) => {
                  try {
                    await validationSchema.validateAt("readTime", {
                      readTime: value,
                    });
                  } catch (error: any) {
                    throw new Error(error.errors[0]);
                  }
                },
              },
            ]}
          >
            <InputNumber min={1} className="dark" />
          </Form.Item>

          {/* <Form.Item
          name="image"
          label="Image"
          rules={[
            {
              validator: async (rule, value) => {
                try {
                  console.log(!fileList.length);
                  if (!fileList.length)
                    return Promise.reject("Please upload an image!");
                  else
                    await validationSchema.validateAt("image", {
                      image: fileList[0],
                    });
                } catch (error: any) {
                  throw new Error(error.errors[0]);
                }
              },
            },
          ]}
        > */}
          <label className="bg-gray-100 text-gray-100 border border-gray-600 rounded p-6 text-center cursor-pointer block w-full">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              style={{ display: "none" }}
              onChange={handleFileUpload}
            />
            <div className="text-gray-400">
              <CloudUploadOutlined style={{ fontSize: "2rem" }} />
              <p className="text-lg mt-2">Click or drag an image here</p>
            </div>
          </label>
          {/* </Form.Item> */}
          {fileList.length ? <Tag>{fileList[0].name}</Tag> : ""}
        </Form>
      </Modal>
    </>
  );
};

export default CreateBlogForm;
