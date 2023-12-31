import EventCard from "../components/Card/EventCard";
import { useGetAllEventsQuery } from "../store/API/EventsAPI";
import { IEventData } from "../types/interface";
import { gradientTextStyles } from "../components/Text/TextStyles";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useGetAllBookMarksQuery,
  useSaveToBookMarkMutation,
  useRemoveEventFromBookMarkMutation,
} from "../store/API/BookMarkAPI";
import { RootState } from "../store";
import { useSelector } from "react-redux";

const Events = () => {
  const userRole: string = useSelector((x: RootState) => x.user.userRole);
  const { data: bookmarksData, isLoading: isBookMarksLoading } =
    useGetAllBookMarksQuery(null);
  console.log(bookmarksData?.findUserBookMarks?.bookmarks);
  const [saveToBookMark] = useSaveToBookMarkMutation();
  const [removeEventFromBookMark] = useRemoveEventFromBookMarkMutation();

  const { data, error, isLoading, isFetching } = useGetAllEventsQuery(null);

  const navigate = useNavigate();

  const concerts = data?.filter((item) => item.type === "concert");
  const comedies = data?.filter((item) => item.type === "comedy");

  // Sort events by date
  const sortByDate = (events: IEventData[] | undefined) => {
    if (!events) return [];
    return events.slice().sort((a, b) => {
      const dateA: Date = new Date(a.date);
      const dateB: Date = new Date(b.date);
      return dateA.getTime() - dateB.getTime();
    });
  };

  const sortedConcerts = sortByDate(concerts);
  const sortedComedies = sortByDate(comedies);

  const handleSeeAllComedies = () => {
    navigate("/stand-up-comedies");
  };

  const handleSeeAllConcerts = () => {
    navigate("/musical-concerts");
  };

  if (isLoading || isFetching || isBookMarksLoading) {
    return <div>Loading events please wait...</div>;
  }

  if (error) {
    return <div>Something went wrong</div>;
  }

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

  return (
    <>
      <div className="text-center my-5">Card</div>
      <div className="flex divide-x divide-gray-300">
        <div className="flex-1 p-4 text-center">
          <h2
            className={`${gradientTextStyles} font-bold text-center text-2xl mb-3`}
          >
            Musical Concerts
          </h2>
          <button className="" onClick={handleSeeAllConcerts}>
            See All
          </button>
          {sortedConcerts?.map((item: IEventData) => {
            return (
              <EventCard
                key={item?._id}
                userRole={userRole}
                {...item}
                saveAnEventToBookMark={saveAnEventToBookMark}
                removeAnEventFromBookmark={removeAnEventFromBookmark}
                saved={bookmarksData?.findUserBookMarks?.bookmarks?.includes(
                  item?._id
                )}
              />
            );
          })}
        </div>
        <div className="flex-1 p-4 text-center">
          <h2
            className={`${gradientTextStyles} font-bold text-center text-2xl mb-3`}
          >
            Stand Up Comedies
          </h2>
          <button className="" onClick={handleSeeAllComedies}>
            See All
          </button>
          {sortedComedies?.map((item: IEventData) => {
            return (
              <EventCard
                key={item?._id}
                {...item}
                saveAnEventToBookMark={saveAnEventToBookMark}
                removeAnEventFromBookmark={removeAnEventFromBookmark}
                saved={bookmarksData?.findUserBookMarks?.bookmarks?.includes(
                  item?._id
                )}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Events;
