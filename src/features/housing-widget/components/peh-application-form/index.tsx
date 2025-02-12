import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/shared/components/ui/button';

import { Spinner } from '@/shared/components/spinner';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/ui/form';
import { Input } from '@/shared/components/ui/input';
import {
  useHousingApplicationListByHousingAndPeh,
  useHousingApplicationReviewListByHousing,
  useMutateHousing,
} from '@/shared/hooks';
import { Housing, HousingApplication, housingApplicationSchema } from '@/shared/types';

const useApplication = (realtimeHousing: Housing, pehPubkey: string) => {
  const { housingApplicationListByHousingAndPeh } = useHousingApplicationListByHousingAndPeh({
    housingEventAddress: realtimeHousing.housingEvent?.tagAddress().toString(),
    pehPubkey,
  });

  const application = useMemo(() => {
    if (housingApplicationListByHousingAndPeh === undefined) return undefined;

    if (housingApplicationListByHousingAndPeh === null) return null;

    if (housingApplicationListByHousingAndPeh.length === 0) return null;

    return housingApplicationListByHousingAndPeh[housingApplicationListByHousingAndPeh.length - 1];
  }, [housingApplicationListByHousingAndPeh]);

  return { application };
};

const useReview = (application: HousingApplication | null | undefined) => {
  const { housingApplicationReviewListByHousing } = useHousingApplicationReviewListByHousing({
    housingEventAddress: application?.housingEventAddress,
  });

  const review = useMemo(() => {
    if (housingApplicationReviewListByHousing === undefined) return undefined;

    if (housingApplicationReviewListByHousing === null) return 'Stalled';

    if (housingApplicationReviewListByHousing.length === 0) return null;

    return housingApplicationReviewListByHousing[housingApplicationReviewListByHousing.length - 1]
      .status;
  }, [housingApplicationReviewListByHousing]);

  return { review };
};

export const PehApplicationForm = ({
  realtimeHousing,
  pehPubkey,
}: {
  realtimeHousing: Housing;
  pehPubkey: string;
}) => {
  const { applyHousing, withdrawHousingApplication } = useMutateHousing();

  const { application } = useApplication(realtimeHousing, pehPubkey);
  const { review } = useReview(application);

  const form = useForm<HousingApplication>({
    resolver: zodResolver(housingApplicationSchema),
    defaultValues: {
      status: 'NotApplied',
      stayDuration: 0,
    },
  });

  const onSubmit = (values: HousingApplication) => {
    applyHousing({
      housing: realtimeHousing,
      stayDuration: values.stayDuration,
    });
  };

  if (application === undefined) return <Spinner />;

  if (application === null || application.status === 'NotApplied') {
    return (
      <>
        <div className="p-4 border rounded-md shadow-md bg-background space-y-4">
          <div className="font-bold">Application Form</div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="stayDuration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration of stay</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full"
                variant="default"
                size="sm"
                disabled={realtimeHousing.status !== 'Available'}
              >
                {realtimeHousing.status === 'Available' ? 'Apply' : 'Unavailable'}
              </Button>
            </form>
          </Form>
        </div>
      </>
    );
  }

  if (application.status === 'Applied' && review === 'Stalled') {
    return (
      <>
        <Button
          className="w-full"
          variant="destructive"
          size="sm"
          disabled={realtimeHousing.status !== 'Available'}
          onClick={() => withdrawHousingApplication(application)}
        >
          Withdraw your application
        </Button>
      </>
    );
  }

  if (review === undefined) return <Spinner />;

  if (review === 'Approved') {
    return (
      <>
        <div className="w-full font-bold text-primary">Approved</div>
      </>
    );
  }

  if (review === 'Rejected') {
    return (
      <>
        <div className="w-full font-bold text-destructive">Rejected</div>
      </>
    );
  }
};
