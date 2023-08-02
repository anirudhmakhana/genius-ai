// Importing necessary dependencies and components
"use client";
import * as z from "zod";
import Heading from "@/components/ui/Heading";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { formSchema } from "./constants";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UserAvatar } from "@/components/ui/user-avatar";
// import { BotAvatar } from "@/components/ui/bot-avatar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ChatCompletionRequestMessage } from "openai";
import { useState } from "react";
import { Empty } from "@/components/ui/Empty";
import { cn } from "@/lib/utils";

// Defining the functional component "page"
const page = () => {
  // Initializing necessary state and utilities using React hooks
  const router = useRouter();
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]); // ["Hello", "How are you?"
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  // Handling form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Create a user message object
      const userMessage: ChatCompletionRequestMessage = {
        role: "user",
        content: values.prompt,
      };
      // Add the user message to the existing list of messages
      const newMessages = [...messages, userMessage];

      // Send the messages to the server for processing
      const response = await axios.post("/api/conversation", {
        messages: newMessages,
      });
      // Update the messages state with the response from the server
      setMessages((current) => [...current, userMessage, response.data]);

      // Reset the form after successful submission
      form.reset();
    } catch (error: any) {
      if (error?.response?.status === 403) {
        // If there's a 403 error (Forbidden), handle it in a specific way
        // proModal.onOpen();
        console.log("403");
      } else {
        // If there's any other error, handle it in a general way
        // toast.error("Something went wrong.");
        console.log("Something went wrong.");
      }
    } finally {
      // Regardless of success or error, refresh the router to update the page
      router.refresh();
    }
  };

  return (
    <div>
      {/* Rendering the "Heading" component with certain properties */}
      <Heading
        title="Conversation"
        description="This is the conversation page"
        icon={MessageSquare}
        iconColor="text-violet-500"
        bgColor="bg-purple-100"
      />
      <div className="px-4 lg:px-8">
        <div>
          <div>
            {/* Creating a form using the "Form" component */}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="
                rounded-lg 
                border 
                w-full 
                p-4 
                px-3 
                md:px-6 
                focus-within:shadow-sm
                grid
                grid-cols-12
                gap-2
              "
              >
                {/* Rendering the form field for the user's input */}
                <FormField
                  name="prompt"
                  render={({ field }) => (
                    <FormItem className="col-span-12 lg:col-span-10">
                      <FormControl className="m-0 p-0">
                        <Input
                          className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                          disabled={isLoading}
                          placeholder="Tell me a prayer for Ganesh Chaturthi"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                {/* Rendering the submit button */}
                <Button
                  className="col-span-12 lg:col-span-2 w-full"
                  type="submit"
                  disabled={isLoading}
                  size="icon"
                >
                  Generate
                </Button>
              </form>
            </Form>
          </div>
          <div className="space-y-4 mt-4">
            {/* Show a loading indicator while waiting for the server */}
            {isLoading && (
              <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
                {/* <Loader /> */}
                Loading...
              </div>
            )}
            {/* If there are no messages and not loading, display an "Empty" component */}
            {messages.length === 0 && !isLoading && (
              <Empty label="No conversation started." />
            )}
            {/* Render the messages */}
            <div className="flex flex-col-reverse gap-y-4">
              {messages.map((message) => (
                <div
                  key={message.content}
                  className={cn(
                    "p-8 w-full flex items-start gap-x-8 rounded-lg",
                    message.role === "user"
                      ? "bg-white border border-black/10"
                      : "bg-muted"
                  )}
                >
                  {/* Render the avatar based on the role of the message */}
                  {message.role === "user" ? <UserAvatar /> : <div>Robot</div>}
                  <p className="text-sm">{message.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
