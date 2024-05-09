import { TIMELINE_ITEM_HEIGHT } from "../../../../Timeline.constants";

import { twJoin } from "tailwind-merge";

interface TimeStampProps {
  children: React.ReactNode;
}

const TimeStamp = ({ children }: TimeStampProps) => {
  return (
    <div className={twJoin("flex w-[5rem] items-center justify-center", TIMELINE_ITEM_HEIGHT)}>
      <p className="flex h-[1.8rem] w-[3.5rem] items-center justify-center rounded-[0.5rem] text-size12 shadow-example_shadow">
        {children}
      </p>
    </div>
  );
};

export default TimeStamp;
