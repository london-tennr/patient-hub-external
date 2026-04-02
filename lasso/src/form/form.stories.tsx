import type { Meta, StoryObj } from "@storybook/react";
import { Resolver, useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "../button/button.js";
import { Input } from "../input/input.js";
import { Textarea } from "../textarea/textarea.js";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";

type FormValues = {
  username: string;
  email: string;
  bio?: string;
};

type LoginFormValues = {
  email: string;
  password: string;
};
const FormWrapper = () => {
  const formSchema = z.object({
    username: z
      .string()
      .min(2, {
        message: "Username must be at least 2 characters.",
      })
      .max(30, {
        message: "Username must not be longer than 30 characters.",
      }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    bio: z
      .string()
      .max(160, {
        message: "Bio must not be longer than 160 characters.",
      })
      .optional(),
  });

  const resolver: Resolver<FormValues> = async (values) => {
    try {
      const validatedData = formSchema.parse(values);
      return {
        values: validatedData,
        errors: {},
      };
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Record<string, { type: string; message: string }> = {};
        error.issues.forEach((issue) => {
          const field = issue.path[0];
          if (field != null) {
            errors[String(field)] = {
              type: issue.code,
              message: issue.message,
            };
          }
        });
        return {
          values: {},
          errors,
        };
      }
      return {
        values: {},
        errors: {},
      };
    }
  };

  const form = useForm<FormValues>({
    resolver,
    defaultValues: {
      username: "",
      email: "",
      bio: "",
    },
  });

  function onSubmit(values: FormValues) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter your username" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter your email" {...field} />
              </FormControl>
              <FormDescription>
                We'll never share your email with anyone else.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Brief description for your profile.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

const LoginFormWrapper = () => {
  const loginSchema = z.object({
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
  });

  const resolver: Resolver<LoginFormValues> = async (values) => {
    try {
      const validatedData = loginSchema.parse(values);
      return {
        values: validatedData,
        errors: {},
      };
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Record<string, { type: string; message: string }> = {};
        error.issues.forEach((issue) => {
          const field = issue.path[0];
          if (field != null) {
            errors[String(field)] = {
              type: issue.code,
              message: issue.message,
            };
          }
        });
        return {
          values: {},
          errors,
        };
      }
      return {
        values: {},
        errors: {},
      };
    }
  };

  const form = useForm<LoginFormValues>({
    resolver,
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: LoginFormValues) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Sign In</Button>
      </form>
    </Form>
  );
};

const meta = {
  title: "Components/Form",
  component: FormWrapper,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof FormWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <FormWrapper />,
};

export const LoginForm: Story = {
  render: () => <LoginFormWrapper />,
};
