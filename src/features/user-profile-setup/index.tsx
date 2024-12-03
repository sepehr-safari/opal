import { zodResolver } from '@hookform/resolvers/zod';
import { NDKUser } from '@nostr-dev-kit/ndk';
import { UploadIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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
import { useToast } from '@/shared/components/ui/use-toast';

import { Spinner } from '@/shared/components/spinner';

import { useUpdateUserProfile } from '@/shared/hooks';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters',
  }),
  about: z.string().optional(),
  image: z.string().optional(),
  nip05: z.string().optional(),
});

export const UserProfileSetup = ({ user }: { user: NDKUser }) => {
  const [isUploadingMedia, setisUploadingMedia] = useState(false);

  const { toast } = useToast();

  const { updateUserProfile } = useUpdateUserProfile({ user });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      about: '',
      image: '',
      nip05: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => updateUserProfile(values);

  const openUploadMediaDialog = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*,video/*';

    input.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (!file) return;

      const formData = new FormData();
      formData.append('fileToUpload', file);

      setisUploadingMedia(true);

      fetch(import.meta.env.VITE_NOSTR_BUILD_UPLOAD_API_ENDPOINT, {
        method: 'POST',
        body: formData,
      })
        .then((res) => res.json())
        .then(({ status, data }) => {
          if (status === 'success' && data?.[0]?.url) {
            form.setValue('image', data[0].url);
          } else {
            toast({
              title: 'Error',
              description: 'Failed to upload media',
              variant: 'destructive',
            });
          }
        })
        .catch(() => {
          toast({ title: 'Error', description: 'Failed to upload media', variant: 'destructive' });
        })
        .finally(() => {
          setisUploadingMedia(false);
        });
    };

    input.click();
  };

  return (
    <div className="m-4 flex flex-col gap-4">
      <h3>Set up your profile</h3>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="about"
            render={({ field }) => (
              <FormItem>
                <FormLabel>About</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <div className="flex items-center space-x-2">
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <Button
                    type="button"
                    variant="secondary"
                    size="icon"
                    className="w-12"
                    onClick={openUploadMediaDialog}
                    disabled={isUploadingMedia}
                  >
                    {isUploadingMedia ? <Spinner /> : <UploadIcon />}
                  </Button>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="nip05"
            render={({ field }) => (
              <FormItem>
                <FormLabel>NIP-05</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Save
          </Button>
        </form>
      </Form>
    </div>
  );
};
