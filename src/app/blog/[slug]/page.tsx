"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { IBlog } from "@/types";
import { getBlog } from "@/requests/blog.requests";
import { message } from "antd";
import Loader from "@/components/Loader";
import withAuth from "@/components/AuthGuards/withAuth";

const BlogDetails = () => {
  const params = useParams();
  const router = useRouter();
  const [isLoading, setLoading] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();
  const [blogsData, setBlogsData] = useState<IBlog | null>(null);

  useEffect(() => {
    if (params.slug && typeof params.slug === "string") {
      _getBlogs(params.slug);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const _getBlogs = async (slug: string) => {
    const payload = {
      slug,
    };
    const response: { blog: IBlog } | string = await getBlog(payload);
    if (typeof response === "string") {
      router.replace("/blog");
      messageApi.open({
        type: "error",
        content: response,
      });
    } else {
      setBlogsData(response.blog);
      setLoading(false);
    }
  };

  if (isLoading) return <Loader />;

  return (
    <>
      {contextHolder}
      <div className="h-screen p-5 mx-auto sm:p-10 md:p-16 bg-gray-900 text-gray-100 flex items-center justify-center">
        <div className="flex flex-col max-w-3xl mx-auto overflow-hidden rounded">
          {blogsData?.image && (
            <Image
              loading="lazy"
              layout="responsive"
              width={50}
              height={50}
              src={blogsData?.image || " "}
              alt=""
              className="w-full h-60 sm:h-96 bg-gray-500"
            />
          )}
          <div className="p-6 pb-12 m-4 mx-auto -mt-16 space-y-6 lg:max-w-2xl sm:px-10 sm:mx-12 lg:rounded-md">
            <div className="space-y-2">
              <a
                rel="noopener noreferrer"
                href="#"
                className="inline-block text-2xl font-semibold sm:text-3xl text-gray-900"
              >
                {blogsData?.title}
              </a>
              <p className="text-xs text-gray-400">
                By{" "}
                <a
                  rel="noopener noreferrer"
                  href="#"
                  className="text-xs hover:underline text-white"
                >
                  {blogsData?.authorInfo?.name}
                </a>
              </p>
            </div>
            <div className="text-gray-100">
              <p>{blogsData?.content}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withAuth(BlogDetails);
