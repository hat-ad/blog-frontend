/* eslint-disable react/jsx-key */
"use client";
import React, { useState, useEffect } from "react";
import { Button, Empty, Pagination, message } from "antd";
import { LeftOutlined, RightOutlined, PlusOutlined } from "@ant-design/icons";
import BlogCard from "@/components/BlogCard";
import CreateBlogForm from "@/components/CreateBlogForm";
import withAuth from "@/components/AuthGuards/withAuth";
import { IBlog, IBlogsData, QueryParamsType } from "@/types";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  updateBlog,
} from "@/requests/blog.requests";
import { useRouter } from "next/navigation";

const PAGE_LIMIT = 5;

const BlogListing: React.FC = () => {
  const [isOpen, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const [blogsData, setBlogsData] = useState<IBlogsData>({
    blogs: [],
    page: 1,
    limit: PAGE_LIMIT,
    total: 0,
  });

  const [params, setParams] = useState<QueryParamsType>({
    limit: PAGE_LIMIT,
    page: 1,
  });
  const [total, setTotal] = useState(0);

  useEffect(() => {
    getBlogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const getBlogs = async () => {
    setLoading(true);
    const payload = {
      limit: params.limit,
      page: params.page,
    };
    const response: IBlogsData | string = await getAllBlogs(payload);
    if (typeof response === "string") {
      messageApi.open({
        type: "error",
        content: response,
      });
    } else {
      setBlogsData(response);
      setTotal(response.total);
    }
    setLoading(false);
  };

  const handleEdit = (slug: string) => {
    setOpen(true);
    const blog = blogsData.blogs.find((item) => item.slug === slug);
    if (blog) {
      router.push(`/blog?editing=true&slug=${slug}`);
    }
  };

  const handleDelete = async (slug: string) => {
    setLoading(true);
    const payload = {
      limit: params.limit,
      page: params.page,
    };
    const response: string = await deleteBlog({ slug });
    if (response !== "File deleted successfully!") {
      messageApi.open({
        type: "error",
        content: response,
      });
    } else {
      getBlogs();
    }
    setLoading(false);
  };
  const onCreate = async (values: any) => {
    setLoading(true);
    const payload = {
      title: values.title,
      content: values.content,
      readTime: values.readTime,
    };
    let response: { blog: IBlog } | string;
    if (values.editing && values.slug) {
      response = await updateBlog(values);
    } else {
      response = await createBlog(payload);
    }
    if (typeof response === "string") {
      messageApi.open({
        type: "error",
        content: response,
      });
    } else {
      getBlogs();
      messageApi.open({
        type: "success",
        content:
          values.editing && values.slug
            ? "Blog updated successfully!"
            : "Blog created successfully!",
      });
    }
    setLoading(false);
    setOpen(false);
  };

  return (
    <>
      {contextHolder}
      <div className="h-screen bg-gray-900 text-gray-50">
        <div className="py-8">
          <div className="container mx-auto">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center"></div>
              <Button
                type="primary"
                onClick={() => {
                  router.push(`/blog`);
                  setOpen(true);
                }}
                icon={<PlusOutlined />}
              >
                Create Blog
              </Button>
            </div>

            <div className="space-y-8">
              {blogsData.blogs.map((blog) => (
                <BlogCard
                  key={blog._id}
                  blog={blog}
                  handleDelete={handleDelete}
                  handleEdit={handleEdit}
                />
              ))}

              {!blogsData.blogs.length && <Empty />}
            </div>
          </div>
        </div>

        <div className="bg-gray-900">
          <div className="text-center py-6">
            <Pagination
              total={total}
              current={params.page}
              pageSize={params.limit}
              size="small"
              onChange={(page: number, pageSize: number) => {
                setParams({ ...params, page });
              }}
              prevIcon={<LeftOutlined style={{ color: "white" }} />}
              nextIcon={<RightOutlined style={{ color: "white" }} />}
            />
          </div>
        </div>

        <CreateBlogForm
          visible={isOpen}
          onCancel={() => {
            setOpen(false);
          }}
          onCreate={onCreate}
        />
      </div>
    </>
  );
};

export default withAuth(BlogListing);
