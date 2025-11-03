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

interface BasicSkillsStepProps {
  form: UseFormReturn<CandidateSubmission>;
}

export function BasicSkillsStep({ form }: BasicSkillsStepProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Basic Technical Skills</h2>
        <p className="text-muted-foreground">
          Tell us about your foundational knowledge
        </p>
      </div>

      <FormField
        control={form.control}
        name="assessment.knowsHtmlCssJs"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>HTML, CSS, and JavaScript</FormLabel>
              <FormDescription>
                I have a solid understanding of HTML, CSS, and JavaScript fundamentals
              </FormDescription>
            </div>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="assessment.knowsReactNextjs"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>React or Next.js</FormLabel>
              <FormDescription>
                I know the basics of React or Next.js and can build simple components
              </FormDescription>
            </div>
          </FormItem>
        )}
      />
    </div>
  );
}
