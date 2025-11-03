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
import { CRUD_FRAMEWORKS } from '@/lib/constants';

interface CrudStepProps {
  form: UseFormReturn<CandidateSubmission>;
}

export function CrudStep({ form }: CrudStepProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">CRUD & Database Skills</h2>
        <p className="text-muted-foreground">
          Can you build applications with database integration?
        </p>
      </div>

      <FormField
        control={form.control}
        name="assessment.canBuildCrud"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>CRUD Applications</FormLabel>
              <FormDescription>
                I can build CRUD (Create, Read, Update, Delete) applications with a database
              </FormDescription>
            </div>
          </FormItem>
        )}
      />

      {form.watch('assessment.canBuildCrud') && (
        <FormField
          control={form.control}
          name="assessment.crudFrameworks"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel>Which frameworks can you use?</FormLabel>
                <FormDescription>
                  Select all that apply
                </FormDescription>
              </div>
              {CRUD_FRAMEWORKS.map((framework) => (
                <FormField
                  key={framework}
                  control={form.control}
                  name="assessment.crudFrameworks"
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
      )}
    </div>
  );
}
