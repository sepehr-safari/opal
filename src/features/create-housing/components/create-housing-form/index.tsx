import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/shared/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/ui/form';
import { Input } from '@/shared/components/ui/input';
// import { Switch } from '@/shared/components/ui/switch';

import { Housing, housingSchema } from '@/shared/types';

export const CreateHousingForm = ({
  defaultValues,
  onSubmit,
  submitLabel = 'Submit',
}: {
  defaultValues?: Housing;
  onSubmit: (values: Housing) => void;
  submitLabel?: string;
}) => {
  const form = useForm<Housing>({
    resolver: zodResolver(housingSchema),
    defaultValues: defaultValues || {
      status: 'Enabled',
      name: '',
      description: '',
      location: '',
      totalUnits: 0,
      availableUnits: 0,
      maxStay: 0,
      contactPhone: '',
      contactFullname: '',
      contactEmail: '',
      contactPosition: '',
    },
  });

  useEffect(() => {
    form.reset();
  }, [form.formState.isSubmitSuccessful, form.reset]);

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Shelter" {...field} />
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
                  <Input placeholder="A place to stay" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="Somewhere nearby" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="totalUnits"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total Units (Beds)</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="availableUnits"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Available Units (Beds)</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="maxStay"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Maximum Stay Allowed (days)</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contactPhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Phone</FormLabel>
                <FormControl>
                  <Input placeholder="+123456789" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contactFullname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contactEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Email</FormLabel>
                <FormControl>
                  <Input placeholder="email@domain.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contactPosition"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Position</FormLabel>
                <FormControl>
                  <Input placeholder="Manager" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <FormLabel>Available</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value === 'Enabled'}
                    onCheckedChange={(checked) => {
                      form.setValue('status', checked ? 'Enabled' : 'Disabled');
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}

          <Button type="submit" className="w-full">
            {submitLabel}
          </Button>
        </form>
      </Form>
    </>
  );
};
