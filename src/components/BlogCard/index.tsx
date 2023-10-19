import React from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";
import Link from "next/link";
import { IBlog } from "@/types";

const BlogCard: React.FC<{
  blog: IBlog;
  handleDelete: Function;
  handleEdit: Function;
}> = ({ blog, handleDelete, handleEdit }) => {
  return (
    <div
      key={blog._id}
      className="dark:bg-gray-800 dark:text-gray-50 container grid grid-cols-12 mx-auto"
    >
      <div
        className="bg-no-repeat bg-cover dark:bg-gray-700 col-span-full lg:col-span-4"
        style={{
          backgroundImage: `url(${blog.image})`,
          backgroundPosition: "center center",
          backgroundBlendMode: "multiply",
          backgroundSize: "cover",
        }}
      ></div>
      <div className="flex flex-col p-6 col-span-full row-span-full lg:col-span-8 lg:p-10">
        <div className="flex justify-start space-x-2 items-center">
          <h1 className="text-3xl font-semibold">{blog.title}</h1>
          <Button
            type="text"
            onClick={() => handleEdit(blog.slug)}
            icon={<EditOutlined style={{ color: "white" }} />}
          />
          <Popconfirm
            title="Are you sure you want to delete?"
            onConfirm={() => handleDelete(blog.slug)}
          >
            <Button
              type="text"
              icon={<DeleteOutlined style={{ color: "red" }} />}
            />
          </Popconfirm>
        </div>
        <p className="flex-1 pt-2">{blog.content}</p>
        <Link
          rel="noopener noreferrer"
          href={`/blog/${blog.slug}`}
          className="inline-flex items-center pt-2 pb-6 space-x-2 text-sm dark:text-violet-400"
        >
          <span>Read more</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-4 h-4"
          >
            <path
              fill-rule="evenodd"
              d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </Link>
        <div className="flex items-center justify-between pt-2">
          <div className="flex space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5 dark:text-gray-400"
            >
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span className="self-center text-sm">by {blog.author}</span>
          </div>
          <span className="text-xs">{blog.readTime} min</span>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
