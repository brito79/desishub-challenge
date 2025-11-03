'use client';

import { UseFormReturn } from 'react-hook-form';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import type { CandidateSubmission } from '@/lib/validations';

interface AuthenticationStepProps {
  form: UseFormReturn<CandidateSubmission>;
}

export function AuthenticationStep({ form }: AuthenticationStepProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Authentication Skills</h2>
        <p className="text-muted-foreground">
          Can you implement user authentication?
        </p>
      </div>

      <FormField
        control={form.control}
        name="assessment.canImplementAuth"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>Password Authentication</FormLabel>
              <FormDescription>
                I can implement password-based authentication in my applications
              </FormDescription>
            </div>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="assessment.canImplementGoogleAuth"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>Google OAuth</FormLabel>
              <FormDescription>
                I can implement Google Sign-In (OAuth) authentication
              </FormDescription>
            </div>
          </FormItem>
        )}
      />
    </div>
  );
}
