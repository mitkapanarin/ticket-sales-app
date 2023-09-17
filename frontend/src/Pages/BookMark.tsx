import {
  useGetAllBookMarksQuery,
  useRemoveEventFromBookMarkMutation,
  useSaveToBookMarkMutation,
} from "../store/API/BookMarkAPI";
import ItemCard from "../components/Card/ItemCard";
import { gradientTextStyles } from "../components/Text/TextStyles";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { IEventData } from "../types/interface";

const BookMark = () => {
  const saved = false;
  const { data, isLoading, isError, isFetching } =
    useGetAllBookMarksQuery(null);
  console.log("Data from API:", data);

  console.log(data?.findUserBookMarks?.bookmarks);
  const [saveToBookMark] = useSaveToBookMarkMutation();
  const [removeEventFromBookMark] = useRemoveEventFromBookMarkMutation();
  const [isSaved, setIsSaved] = useState(saved); // Initialize directly with the saved prop

  useEffect(() => {
    // Set the initial saved state when the component mounts
    setIsSaved(saved);
  }, [saved]);

  const saveAnEventToBookMark = async ({ eventID }: { eventID: string }) => {
    await toast.promise(saveToBookMark({ eventID }).unwrap(), {
      pending: "Saving event to bookmark...",
      success: "Event saved to bookmark",
      error: "Failed to save event to bookmark",
    });
  };

  const removeAnEventFromBookmark = async ({
    eventID,
  }: {
    eventID: string;
  }) => {
    await toast.promise(removeEventFromBookMark({ eventID }).unwrap(), {
      pending: "Removing event from bookmark...",
      success: "Event removed from bookmark",
      error: "Failed to remove event from bookmark",
    });
  };

  const handleBookmarkClick = () => {
    if (isSaved) {
      removeAnEventFromBookmark({
        eventID: (data as IEventData)._id as string,
      });
    } else {
      saveAnEventToBookMark({ eventID: (data as IEventData)._id as string });
    }
    setIsSaved(!isSaved);
  };

  if (isLoading || isFetching) {
    return <div>Loading, please wait...</div>;
  }

  if (isError) {
    console.error("Error loading data:", data);
    return <div>Error: Unable to load data</div>;
  }

  return (
    <div className="flex flex-wrap justify-center">
      <h2
        className={`${gradientTextStyles} text-center mb-10 mt-10 text-4xl font-bold capitalize w-full`}
      >
        Bookmarked Events
      </h2>
      <div className="flex space-x-20">
        {data?.data?.map(
          (event: {
            _id: string;
            date: Date;
            image: string;
            location: string;
            title: string;
          }) => (
            <ItemCard
              key={event._id}
              date={event.date}
              image={event.image}
              location={event.location}
              title={event.title}
              handleBookmarkClick={handleBookmarkClick}
              isSaved={isSaved}
            />
          )
        )}
      </div>
    </div>
  );
};

export default BookMark;
