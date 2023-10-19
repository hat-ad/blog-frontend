import React, { useState, useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  InputNumber,
  // Upload,
  // Button,
  //   Dragger,
  message,
} from "antd";
// import { CloudUploadOutlined } from "@ant-design/icons";
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
        const blogData = {
          ...values,
          image: fileList[0]?.originFileObj || null,
        };
        onCreate({ ...blogData, slug, editing });
        form.resetFields();
        setFileList([]);
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

  const uploadProps = {
    onRemove: (file: any) => {
      setFileList([]);
    },
    beforeUpload: async (file: any) => {
      setFileList([file]);
      const body = new FormData();
      body.append("file", file);

      const response = await upload(body);
      if (typeof response === "string") {
        messageApi.open({
          type: "error",
          content: response,
        });
      } else {
        form.setFieldsValue([{ image: response.location }]);
      }
      return true;
    },
    fileList,
  };

  return (
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
                  await validationSchema.validateAt("title", { title: value });
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
                  await validationSchema.validateAt("image", {
                    image: fileList[0],
                  });
                } catch (error: any) {
                  throw new Error(error.errors[0]);
                }
              },
            },
          ]}
        >
          <Upload {...uploadProps} accept="image/*" showUploadList={true}>
            <div className="dark  border rounded p-6 text-center cursor-pointer w-full">
              <div className="text-gray-400">
                <CloudUploadOutlined style={{ fontSize: "2rem" }} />
                <p className="text-lg mt-2">Click or drag an image here</p>
              </div>
            </div>
          </Upload>
        </Form.Item> */}
      </Form>
    </Modal>
  );
};

export default CreateBlogForm;
