"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useState } from "react";
import axios from "axios";
import React from "react";

export default function page() {
  const [messages, setMessages] = useState<
    {
      message: {
        user: "ai" | "user";
        message: string;
      };
    }[]
  >([]);
  const [isPending, setIsPending] = useState(false);

  return (
    <Container>
      <Chat>
        {messages.map((m, index) => {
          if (m.message.user === "ai") {
            return <RobotMessage key={index}>{m.message.message}</RobotMessage>;
          }
          return (
            <React.Fragment key={index}>
              <UserMessage>{m.message.message}</UserMessage>
              {isPending ? (
                <RobotMessage isPending>
                  <BouncingAnimation />
                </RobotMessage>
              ) : null}
            </React.Fragment>
          );
        })}

        <TextField setMessage={setMessages} setPending={setIsPending} />
      </Chat>
    </Container>
  );
}

function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center h-screen w-full bg-black">
      <div className="max-w-[30em] flex flex-col items-start">{children}</div>
    </div>
  );
}

function TextField({
  setMessage,
  setPending,
}: {
  setPending: React.Dispatch<React.SetStateAction<boolean>>;
  setMessage: React.Dispatch<
    React.SetStateAction<
      { message: { user: "ai" | "user"; message: string } }[]
    >
  >;
}) {
  const [val, setVal] = useState("");

  return (
    <div className="fixed bottom-10 left-0 right-0 flex items-center justify-center">
      <div className="flex gap-2 w-full justify-center bg-black max-w-[25em] p-4 rounded-xl">
        <Input
          id="message"
          type="text"
          className=" bg-transparent text-white "
          placeholder="Ask a question"
          onChange={(e) => setVal(e.target.value)}
        />
        <Button
          variant="white"
          onClick={() => {
            setMessage((prev) => {
              return [
                ...prev,
                {
                  message: {
                    user: "user",
                    message: val,
                  },
                },
              ];
            });

            (async function () {
              setPending(true);
              const res = await axios.post("/api/message", {
                message: val,
              });
              setPending(false);

              setMessage((prev) => {
                return [
                  ...prev,
                  {
                    message: {
                      user: "ai",
                      message: res.data.answer as string,
                    },
                  },
                ];
              });
            })();
          }}
        >
          Send
        </Button>
      </div>
    </div>
  );
}

function Chat({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-2 border-slate-100 overflow-y-auto rounded-xl h-full w-[30em] my-2 px-3 pt-4 flex gap-2 flex-col">
      {children}
    </div>
  );
}

function RobotMessage({
  children,
  isPending,
}: {
  children: React.ReactNode;
  isPending?: boolean;
}) {
  return (
    <div className="w-full flex items-start gap-2.5">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      {isPending ? (
        children
      ) : (
        <div className="flex flex-col w-full max-w-[20em] leading-1.5 p-4 border-gray-200 bg-white rounded-e-xl rounded-es-xl dark:bg-gray-700">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              Ai
            </span>
          </div>
          <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
            {children}
          </p>
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            Delivered
          </span>
        </div>
      )}
    </div>
  );
}

function UserMessage({ children }: { children: string }) {
  return (
    <div className="flex w-full items-start justify-end gap-2.5 left-0">
      <div className="flex flex-col w-full max-w-[20em] leading-1.5 p-4 border-gray-200 bg-white rounded-b-xl rounded-l-xl dark:bg-gray-700">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            User
          </span>
        </div>
        <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
          {children}
        </p>
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
          Delivered
        </span>
      </div>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  );
}

function BouncingAnimation() {
  return (
    <div className="flex gap-1 h-12 items-center justify-center">
      <div className="size-2 rounded-full bg-neutral-800 animate-bounce duration-500" />
      <div className="size-2 rounded-full bg-neutral-800 animate-bounce duration-500" />
      <div className="size-2 rounded-full bg-neutral-800 animate-bounce duration-300" />
    </div>
  );
}
