import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TIER_DESCRIPTIONS } from '@/types';
import { ArrowRight, CheckCircle, Users, Target } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-linear-to-b from-muted/50 to-background py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl">
            Welcome to Desishub
            <span className="block text-primary">Candidate Assessment Platform</span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
            Discover your technical skill level and join our growing community of developers.
            Get categorized into one of five tiers based on your proficiency.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/register">
              <Button size="lg" className="gap-2">
                Start Assessment <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline">
                View Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-3">
            <Card>
              <CardHeader>
                <Target className="mb-2 h-10 w-10 text-primary" />
                <CardTitle>Accurate Assessment</CardTitle>
                <CardDescription>
                  Algorithm-based evaluation of your technical skills across multiple frameworks
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Users className="mb-2 h-10 w-10 text-primary" />
                <CardTitle>5 Skill Tiers</CardTitle>
                <CardDescription>
                  From Beginner to Advanced Full-Stack Developer - find where you fit
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CheckCircle className="mb-2 h-10 w-10 text-primary" />
                <CardTitle>Instant Results</CardTitle>
                <CardDescription>
                  Get your tier assignment immediately after completing the assessment
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Tier System Overview */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">Our Tier System</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              We categorize candidates into 5 tiers based on their technical proficiency
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Object.entries(TIER_DESCRIPTIONS).map(([tier, info]) => (
              <Card key={tier}>
                <CardHeader>
                  <div className="mb-2 flex items-center justify-between">
                    <Badge variant="outline" className="text-base">
                      Tier {tier}
                    </Badge>
                  </div>
                  <CardTitle>{info.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{info.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold">Ready to Get Started?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-muted-foreground">
            Complete our assessment to discover your tier and join the Desishub community
          </p>
          <Link href="/register">
            <Button size="lg" className="gap-2">
              Take the Assessment <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
