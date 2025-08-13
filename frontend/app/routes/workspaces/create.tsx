import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";

const createWorkspaceSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  description: z.string().optional(),
  color: z.string().min(1, "Color is required"),
});

type CreateWorkspaceFormData = z.infer<typeof createWorkspaceSchema>;

const CreateWorkspace = () => {
  const navigate = useNavigate();
  const [isPending, setIsPending] = useState(false);

  const form = useForm<CreateWorkspaceFormData>({
    resolver: zodResolver(createWorkspaceSchema),
    defaultValues: {
      name: "",
      description: "",
      color: "#3B82F6", // Default blue color
    },
  });

  const onSubmit = async (values: CreateWorkspaceFormData) => {
    setIsPending(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Workspace created successfully!");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Failed to create workspace");
    } finally {
      setIsPending(false);
    }
  };

  const colorOptions = [
    { name: "Blue", value: "#3B82F6" },
    { name: "Green", value: "#10B981" },
    { name: "Purple", value: "#8B5CF6" },
    { name: "Red", value: "#EF4444" },
    { name: "Yellow", value: "#F59E0B" },
    { name: "Pink", value: "#EC4899" },
    { name: "Indigo", value: "#6366F1" },
    { name: "Gray", value: "#6B7280" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Create New Workspace</CardTitle>
            <CardDescription>
              Fill in the details below to create a new workspace
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Workspace Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter workspace name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter workspace description"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="color"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Workspace Color</FormLabel>
                      <div className="grid grid-cols-4 gap-3">
                        {colorOptions.map((color) => (
                          <div
                            key={color.value}
                            className={`w-12 h-12 rounded-lg border-2 cursor-pointer flex items-center justify-center ${
                              field.value === color.value
                                ? "border-gray-900"
                                : "border-gray-300"
                            }`}
                            style={{ backgroundColor: color.value }}
                            onClick={() => field.onChange(color.value)}
                          >
                            {field.value === color.value && (
                              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                                <div className="w-3 h-3 bg-gray-900 rounded-full"></div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-4">
                  <Button
                    type="submit"
                    disabled={isPending}
                    className="flex-1"
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Creating Workspace...
                      </>
                    ) : (
                      "Create Workspace"
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/dashboard")}
                    disabled={isPending}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateWorkspace; 