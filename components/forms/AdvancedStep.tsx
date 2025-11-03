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

interface AdvancedStepProps {
  form: UseFormReturn<CandidateSubmission>;
}

export function AdvancedStep({ form }: AdvancedStepProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Advanced Skills (Golang)</h2>
        <p className="text-muted-foreground">
          Do you have experience with Golang?
        </p>
      </div>

      <FormField
        control={form.control}
        name="assessment.knowsGolang"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>Golang Knowledge</FormLabel>
              <FormDescription>
                I know the Golang programming language
              </FormDescription>
            </div>
          </FormItem>
        )}
      />

      {form.watch('assessment.knowsGolang') && (
        <>
          <FormField
            control={form.control}
            name="assessment.canBuildGoApi"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Build APIs with Go</FormLabel>
                  <FormDescription>
                    I can build simple APIs using Golang
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="assessment.canIntegrateGoWithFrontend"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Integrate Go APIs with Frontend</FormLabel>
                  <FormDescription>
                    I can integrate Go APIs with a frontend application (React, Next.js, etc.)
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
        </>
      )}
    </div>
  );
}
