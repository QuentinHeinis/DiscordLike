import { HashtagIcon } from "@heroicons/react/24/solid";

interface ChatWelcomeProps {
  name: string;
  type: "channel" | "conversation";
};

export const ChatWelcome = ({
  name,
  type
}: ChatWelcomeProps) => {
  return (
    <div className="space-y-2 px-4 mb-4">
      {type === "channel" && (
        <div className="h-[75px] w-[75px] rounded-full bg-neutral-500 dark:bg-neutral-700 flex items-center justify-center">
          <HashtagIcon className="h-12 w-12 text-white" />
        </div>
      )}
      <p className="text-xl md:text-3xl font-bold">
        {type === "channel" ? "Welcome to #" : ""}{name}
      </p>
      <p className="text-neutral-600 dark:text-neutral-400 text-sm">
        {type === "channel"
          ? `This is the start of the #${name} channel.`
          : `This is the start of your conversation with ${name}`
        }
      </p>
    </div>
  )
}