import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TierBadge } from '@/components/dashboard/TierBadge';
import { getCandidateAction } from '@/app/actions/candidates';
import { TIER_DESCRIPTIONS } from '@/types';
import { CheckCircle2, ArrowRight, Home } from 'lucide-react';

export default async function ResultsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = await getCandidateAction(id);

  if (!result.success || !result.data) {
    notFound();
  }

  const candidate = result.data;
  const tierInfo = TIER_DESCRIPTIONS[candidate.tier as keyof typeof TIER_DESCRIPTIONS];

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="mb-8 text-center">
        <CheckCircle2 className="mx-auto mb-4 h-16 w-16 text-green-500" />
        <h1 className="mb-2 text-4xl font-bold">Assessment Complete!</h1>
        <p className="text-muted-foreground">
          Thank you, {candidate.name}. Your skill tier has been assigned.
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader className="text-center">
          <CardTitle className="mb-4 text-3xl">Your Tier Assignment</CardTitle>
          <div className="flex justify-center">
            <TierBadge tier={candidate.tier} showName className="text-2xl px-6 py-3" />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="mb-2 text-lg font-semibold">{tierInfo.name}</h3>
            <p className="text-muted-foreground">{tierInfo.description}</p>
          </div>

          <div className="rounded-lg bg-muted p-4">
            <h4 className="mb-2 font-semibold">Why this tier?</h4>
            <p className="text-sm text-muted-foreground">{candidate.tierReason}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Assessment Summary</CardTitle>
          <CardDescription>Here's what you indicated you can do</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="mb-2 font-semibold">Basic Skills</h4>
              <ul className="space-y-1 text-sm">
                <li className={candidate.assessment.knowsHtmlCssJs ? 'text-green-600' : 'text-muted-foreground'}>
                  {candidate.assessment.knowsHtmlCssJs ? '✓' : '✗'} HTML, CSS, JavaScript
                </li>
                <li className={candidate.assessment.knowsReactNextjs ? 'text-green-600' : 'text-muted-foreground'}>
                  {candidate.assessment.knowsReactNextjs ? '✓' : '✗'} React/Next.js
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-2 font-semibold">CRUD & Database</h4>
              <ul className="space-y-1 text-sm">
                <li className={candidate.assessment.canBuildCrud ? 'text-green-600' : 'text-muted-foreground'}>
                  {candidate.assessment.canBuildCrud ? '✓' : '✗'} Can build CRUD apps
                </li>
                {candidate.assessment.crudFrameworks.length > 0 && (
                  <li className="text-sm text-muted-foreground">
                    Frameworks: {candidate.assessment.crudFrameworks.join(', ')}
                  </li>
                )}
              </ul>
            </div>

            <div>
              <h4 className="mb-2 font-semibold">Authentication</h4>
              <ul className="space-y-1 text-sm">
                <li className={candidate.assessment.canImplementAuth ? 'text-green-600' : 'text-muted-foreground'}>
                  {candidate.assessment.canImplementAuth ? '✓' : '✗'} Password authentication
                </li>
                <li className={candidate.assessment.canImplementGoogleAuth ? 'text-green-600' : 'text-muted-foreground'}>
                  {candidate.assessment.canImplementGoogleAuth ? '✓' : '✗'} Google OAuth
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-2 font-semibold">Backend Frameworks</h4>
              <ul className="space-y-1 text-sm">
                <li className={candidate.assessment.knowsBackendFramework ? 'text-green-600' : 'text-muted-foreground'}>
                  {candidate.assessment.knowsBackendFramework ? '✓' : '✗'} Knows backend frameworks
                </li>
                {candidate.assessment.backendFrameworks.length > 0 && (
                  <li className="text-sm text-muted-foreground">
                    Frameworks: {candidate.assessment.backendFrameworks.join(', ')}
                  </li>
                )}
              </ul>
            </div>

            <div>
              <h4 className="mb-2 font-semibold">Advanced (Golang)</h4>
              <ul className="space-y-1 text-sm">
                <li className={candidate.assessment.knowsGolang ? 'text-green-600' : 'text-muted-foreground'}>
                  {candidate.assessment.knowsGolang ? '✓' : '✗'} Knows Golang
                </li>
                <li className={candidate.assessment.canBuildGoApi ? 'text-green-600' : 'text-muted-foreground'}>
                  {candidate.assessment.canBuildGoApi ? '✓' : '✗'} Can build Go APIs
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
        <Link href="/">
          <Button variant="outline" className="gap-2">
            <Home className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
        <Link href="/dashboard">
          <Button className="gap-2">
            View All Candidates
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
