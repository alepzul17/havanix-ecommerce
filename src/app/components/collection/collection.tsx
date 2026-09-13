import CollectionCard from "./CollectionCard";

export default function Collection() {
  return (
    <div className="w-full my-7 sm:my-14">
      <div className="flex gap-1 overflow-x-auto overflow-hidden">
        <CollectionCard title={"Ocean State Collection"} src={"/model5.jpg"} />
        <CollectionCard title={"Core Series Collection"} src={"/model6.jpg"} />
        <CollectionCard title={"Daily Wear Collection"} src={"/model18.jpg"} />
        <CollectionCard
          title={"Everyday Series Collection"}
          src={"/model12.jpg"}
        />
      </div>
    </div>
  );
}
