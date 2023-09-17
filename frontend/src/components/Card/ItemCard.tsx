import React from "react";
import dayjs from "dayjs";
import { BookmarkIcon as BookmarkIconSolid } from "@heroicons/react/24/solid";
import { BookmarkIcon } from "@heroicons/react/24/outline";

interface ItemCardProps {
  date: Date;
  image: string;
  location: string;
  title: string;
  type?: string;
  _id?: string;
  id?: string;
  isSaved: boolean;
  handleBookmarkClick: () => void;
}

const ItemCard: React.FC<ItemCardProps> = ({
  date,
  image,
  location,
  title,
  isSaved,
  handleBookmarkClick,
}) => {
  console.log("isSaved:", isSaved);
  return (
    <div className="mb-10">
      <div>
        <img
          className="rounded-t-lg"
          src={
            image ||
            "https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ehfzal2gmtz3gj35nwr4.png"
          }
          alt={title}
          style={{ width: "250px", height: "200px" }}
        />
        <div className="p-5">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mt-0">
            {title}
          </h5>
          <p className="mb-2 text-gray-400 text-sm">
            {dayjs(date).format("dddd, MMMM D, YYYY")}
          </p>
          <div className="flex flex-wrap items-center">
            {" "}
            {/* Use flex-wrap to wrap them in the same line */}
            <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 my-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">
              {location}
            </span>
            <button
              type="button"
              className="flex py-2 px-2 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              onClick={handleBookmarkClick}
            >
              {isSaved ? (
                <BookmarkIconSolid className="h-6 cursor-pointer" />
              ) : (
                <BookmarkIcon className="h-6 cursor-pointer" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
