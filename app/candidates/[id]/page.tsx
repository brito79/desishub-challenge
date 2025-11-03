import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TierBadge } from '@/components/dashboard/TierBadge';
import { getCandidateAction } from '@/app/actions/candidates';
import { TIER_DESCRIPTIONS } from '@/types';
import { ArrowLeft, Mail, Phone, Calendar, CheckCircle2, XCircle } from 'lucide-react';
import { formatDate } from 'date-fns';

export default async function CandidateDetailPage({
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
    <div className="container mx-auto max-w-5xl px-4 py-12">
      <div className="mb-6">
        <Link href="/dashboard">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">{candidate.name}</h1>
        <div className="flex items-center gap-2">
          <TierBadge tier={candidate.tier} showName />
        </div>
      </div>

      {/* Contact Information */}
      <div className="mb-8 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{candidate.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-medium">{candidate.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Registered</p>
                <p className="font-medium">
                  {formatDate(new Date(candidate.createdAt), 'MMMM d, yyyy')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tier Assignment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <h3 className="mb-2 text-lg font-semibold">{tierInfo.name}</h3>
              <p className="text-sm text-muted-foreground">{tierInfo.description}</p>
            </div>
            <div className="rounded-lg bg-muted p-4">
              <h4 className="mb-2 font-semibold text-sm">Evaluation</h4>
              <p className="text-sm text-muted-foreground">{candidate.tierReason}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Assessment Results */}
      <Card>
        <CardHeader>
          <CardTitle>Assessment Results</CardTitle>
          <CardDescription>
            Detailed breakdown of technical skills
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            {/* Basic Skills */}
            <div>
              <h3 className="mb-3 font-semibold">Basic Skills</h3>
              <div className="space-y-2">
                <SkillItem
                  label="HTML, CSS, JavaScript"
                  value={candidate.assessment.knowsHtmlCssJs}
                />
                <SkillItem
                  label="React or Next.js"
                  value={candidate.assessment.knowsReactNextjs}
                />
              </div>
            </div>

            {/* CRUD & Database */}
            <div>
              <h3 className="mb-3 font-semibold">CRUD & Database</h3>
              <div className="space-y-2">
                <SkillItem
                  label="Can build CRUD applications"
                  value={candidate.assessment.canBuildCrud}
                />
                {candidate.assessment.crudFrameworks.length > 0 && (
                  <div className="ml-6 text-sm text-muted-foreground">
                    Frameworks: {candidate.assessment.crudFrameworks.join(', ')}
                  </div>
                )}
              </div>
            </div>

            {/* Authentication */}
            <div>
              <h3 className="mb-3 font-semibold">Authentication</h3>
              <div className="space-y-2">
                <SkillItem
                  label="Password authentication"
                  value={candidate.assessment.canImplementAuth}
                />
                <SkillItem
                  label="Google OAuth"
                  value={candidate.assessment.canImplementGoogleAuth}
                />
              </div>
            </div>

            {/* Backend Frameworks */}
            <div>
              <h3 className="mb-3 font-semibold">Backend Frameworks</h3>
              <div className="space-y-2">
                <SkillItem
                  label="Knows backend frameworks"
                  value={candidate.assessment.knowsBackendFramework}
                />
                {candidate.assessment.backendFrameworks.length > 0 && (
                  <div className="ml-6 text-sm text-muted-foreground">
                    Frameworks: {candidate.assessment.backendFrameworks.join(', ')}
                  </div>
                )}
                <SkillItem
                  label="Can build authenticated CRUD APIs"
                  value={candidate.assessment.canBuildAuthApi}
                />
                <SkillItem
                  label="Can document APIs"
                  value={candidate.assessment.canDocumentApi}
                />
              </div>
            </div>

            {/* Advanced (Golang) */}
            <div className="md:col-span-2">
              <h3 className="mb-3 font-semibold">Advanced Skills (Golang)</h3>
              <div className="grid gap-2 md:grid-cols-3">
                <SkillItem
                  label="Knows Golang"
                  value={candidate.assessment.knowsGolang}
                />
                <SkillItem
                  label="Can build Go APIs"
                  value={candidate.assessment.canBuildGoApi}
                />
                <SkillItem
                  label="Can integrate Go with frontend"
                  value={candidate.assessment.canIntegrateGoWithFrontend}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function SkillItem({ label, value }: { label: string; value: boolean }) {
  return (
    <div className="flex items-center gap-2">
      {value ? (
        <CheckCircle2 className="h-4 w-4 text-green-600" />
      ) : (
        <XCircle className="h-4 w-4 text-muted-foreground" />
      )}
      <span className={value ? 'text-foreground' : 'text-muted-foreground'}>
        {label}
      </span>
    </div>
  );
}
