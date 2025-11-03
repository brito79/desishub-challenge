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
import { BACKEND_FRAMEWORKS } from '@/lib/constants';

interface BackendStepProps {
  form: UseFormReturn<CandidateSubmission>;
}

export function BackendStep({ form }: BackendStepProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Backend Framework Skills</h2>
        <p className="text-muted-foreground">
          Do you know backend frameworks beyond Next.js?
        </p>
      </div>

      <FormField
        control={form.control}
        name="assessment.knowsBackendFramework"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>Backend Frameworks</FormLabel>
              <FormDescription>
                I know backend frameworks like Express, Hono, Laravel, etc.
              </FormDescription>
            </div>
          </FormItem>
        )}
      />

      {form.watch('assessment.knowsBackendFramework') && (
        <>
          <FormField
            control={form.control}
            name="assessment.backendFrameworks"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel>Which frameworks do you know?</FormLabel>
                  <FormDescription>Select all that apply</FormDescription>
                </div>
                {BACKEND_FRAMEWORKS.map((framework) => (
                  <FormField
                    key={framework}
                    control={form.control}
                    name="assessment.backendFrameworks"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={framework}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(framework)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, framework])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== framework
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {framework}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="assessment.canBuildAuthApi"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Authenticated CRUD APIs</FormLabel>
                  <FormDescription>
                    I can build authenticated CRUD APIs with these frameworks
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="assessment.canDocumentApi"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>API Documentation</FormLabel>
                  <FormDescription>
                    I can create proper API documentation (Swagger, OpenAPI, etc.)
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
