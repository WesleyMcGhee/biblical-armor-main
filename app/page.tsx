import Link from "next/link";
import { Header } from "@/lib/components/Header.component";
import { Shield, BookOpen, Video, MessageCircle } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Defend Your Faith",
    description: "Equip yourself with solid arguments and evidence to confidently share the Gospel.",
  },
  {
    icon: BookOpen,
    title: "Deep Resources",
    description: "Access in-depth articles, studies, and theological materials for deeper understanding.",
  },
  {
    icon: Video,
    title: "Media Content",
    description: "Watch engaging videos and podcasts that make complex topics accessible.",
  },
  {
    icon: MessageCircle,
    title: "Community",
    description: "Join a community of believers committed to truth and intellectual rigor.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-[#1a2744] opacity-95" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/20 via-transparent to-transparent" />
          
          <div className="relative container mx-auto px-4 md:px-6 py-24 md:py-32">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground tracking-tight mb-6">
                Put on the{" "}
                <span className="text-accent">Armor of God</span>
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-2xl">
                Apologetics for the modern believer. Equip yourself with knowledge 
                to defend your faith and share the truth of Scripture with confidence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/articles"
                  className="inline-flex items-center justify-center px-6 py-3 bg-accent text-foreground font-semibold rounded hover:bg-accent/90 transition-colors"
                >
                  Explore Articles
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center px-6 py-3 border border-primary-foreground/30 text-primary-foreground font-semibold rounded hover:bg-primary-foreground/10 transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
          
          <div className="absolute -bottom-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
        </section>

        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                What We Offer
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Building a foundation of faith through education, community, and practical tools.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="bg-background p-6 rounded-lg border border-border hover:border-accent transition-colors group"
                >
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent transition-colors">
                    <feature.icon className="h-6 w-6 text-primary-foreground group-hover:text-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Your Logo Here
                </h2>
                <p className="text-muted-foreground mb-6">
                  Replace this placeholder with your ministry logo. Simply add your 
                  image to the public folder and update the Header component.
                </p>
                <p className="text-sm text-muted-foreground">
                  Recommended: Add a logo file named <code className="bg-muted px-2 py-1 rounded">logo.png</code> or{" "}
                  <code className="bg-muted px-2 py-1 rounded">logo.svg</code> to the public folder.
                </p>
              </div>
              <div className="bg-muted rounded-lg p-12 flex items-center justify-center min-h-[200px] border-2 border-dashed border-border">
                <div className="text-center">
                  <div className="w-20 h-20 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl font-bold text-primary">BA</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Logo Placeholder</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Deepen Your Faith?
            </h2>
            <p className="text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Join our community and start your journey into Christian apologetics today.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center justify-center px-6 py-3 bg-accent text-foreground font-semibold rounded hover:bg-accent/90 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-8 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              Biblical Armor Apologetics. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/articles" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Articles
              </Link>
              <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
              <Link href="/media" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Media
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
