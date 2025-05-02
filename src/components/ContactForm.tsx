"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import emailjs from "@emailjs/browser";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Zod Schema
const formSchema = z.object({
    name: z.string().min(2, {message: "Username must be at least 2 characters.",}),
    message: z.string().max(200, {message: "Message must be less than 200 characters."}),
});

type ProfileFormValues = z.infer<typeof formSchema>;

export function ContactForm() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      message: "",
    },
  });

  // ✉️ EmailJS constants
  const SERVICE_ID = import.meta.env.VITE_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;
  const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;

  // ⏎ Submit Handler
  async function onSubmit(values: ProfileFormValues) {
    try {
      const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
        name: values.name,
        message: values.message,
      }, PUBLIC_KEY);

      console.log("SUCCESS!", response.status, response.text);
      alert("Feedback sent successfully!");
      form.reset();
    } catch (error) {
      console.error("FAILED...", error);
      alert("Failed to send feedback.");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Feedback</FormLabel>
              <FormControl>
                <Input placeholder="Your feedback" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormDescription>
            Thanks for using SerpenType!
        </FormDescription>
        <Button type="submit">Send Feedback</Button>
      </form>
    </Form>
  );
}