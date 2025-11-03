'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { candidateSubmissionSchema, type CandidateSubmission } from '@/lib/validations';
import { submitCandidateAction } from '@/app/actions/candidates';
import { RegistrationStep } from '@/components/forms/RegistrationStep';
import { BasicSkillsStep } from '@/components/forms/BasicSkillsStep';
import { CrudStep } from '@/components/forms/CrudStep';
import { AuthenticationStep } from '@/components/forms/AuthenticationStep';
import { BackendStep } from '@/components/forms/BackendStep';
import { AdvancedStep } from '@/components/forms/AdvancedStep';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';

const STEPS = [
  { title: 'Registration', component: RegistrationStep },
  { title: 'Basic Skills', component: BasicSkillsStep },
  { title: 'CRUD & Database', component: CrudStep },
  { title: 'Authentication', component: AuthenticationStep },
  { title: 'Backend Frameworks', component: BackendStep },
  { title: 'Advanced (Golang)', component: AdvancedStep },
];

export default function RegisterPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CandidateSubmission>({
    resolver: zodResolver(candidateSubmissionSchema),
    defaultValues: {
      registration: {
        name: '',
        email: '',
        phone: '',
      },
      assessment: {
        knowsHtmlCssJs: false,
        knowsReactNextjs: false,
        canBuildCrud: false,
        crudFrameworks: [],
        canImplementAuth: false,
        canImplementGoogleAuth: false,
        knowsBackendFramework: false,
        backendFrameworks: [],
        canBuildAuthApi: false,
        canDocumentApi: false,
        knowsGolang: false,
        canBuildGoApi: false,
        canIntegrateGoWithFrontend: false,
      },
    },
  });

  const CurrentStepComponent = STEPS[currentStep].component;
  const progress = ((currentStep + 1) / STEPS.length) * 100;

  const handleNext = async () => {
    const fields = currentStep === 0 
      ? ['registration.name', 'registration.email', 'registration.phone'] as const
      : [];

    const isValid = fields.length > 0 
      ? await form.trigger(fields)
      : true;

    if (isValid && currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = async (data: CandidateSubmission) => {
    setIsSubmitting(true);
    try {
      const result = await submitCandidateAction(data);

      if (result.success && result.data) {
        router.push(`/results/${result.data.candidateId}`);
      } else {
        alert(result.error || 'Failed to submit assessment');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Candidate Assessment</h1>
        <p className="text-muted-foreground">
          Complete all steps to determine your skill tier
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>
            Step {currentStep + 1} of {STEPS.length}: {STEPS[currentStep].title}
          </CardTitle>
          <CardDescription>
            <Progress value={progress} className="mt-2" />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <CurrentStepComponent form={form} />

              <div className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentStep === 0 || isSubmitting}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>

                {currentStep < STEPS.length - 1 ? (
                  <Button type="button" onClick={handleNext} disabled={isSubmitting}>
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      'Submit Assessment'
                    )}
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
