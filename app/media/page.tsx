import Link from "next/link";
import { Header } from "@/lib/components/Header.component";
import { ArrowLeft, Play, Mic, FileText, Youtube, Podcast } from "lucide-react";

const videos = [
  {
    id: 1,
    title: "Introduction to Christian Apologetics",
    description: "A foundational video explaining what apologetics is and why it matters.",
    duration: "15:30",
  },
  {
    id: 2,
    title: "Evidence for the Resurrection",
    description: "Exploring the historical and archaeological evidence for Jesus' resurrection.",
    duration: "22:45",
  },
  {
    id: 3,
    title: "Answering Common Objections",
    description: "Practical responses to the most frequently asked questions about Christianity.",
    duration: "18:20",
  },
];

const podcasts = [
  {
    id: 1,
    title: "Faith and Reason",
    description: "Weekly discussions on faith, philosophy, and Christian worldview.",
    episodes: 48,
  },
  {
    id: 2,
    title: "The Armor of God",
    description: "Deep dives into Ephesians 6 and what it means for modern believers.",
    episodes: 24,
  },
  {
    id: 3,
    title: "Ask an Apologist",
    description: "Listener questions answered with research and care.",
    episodes: 36,
  },
];

export default function MediaPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="bg-primary py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground mb-6 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              Media
            </h1>
            <p className="text-primary-foreground/90 text-lg max-w-2xl">
              Videos, podcasts, and downloadable resources for your apologetics journey.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                <Play className="h-5 w-5 text-foreground" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Videos</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {videos.map((video) => (
                <div
                  key={video.id}
                  className="bg-background border border-border rounded-lg overflow-hidden hover:border-accent transition-colors group"
                >
                  <div className="relative aspect-video bg-muted flex items-center justify-center">
                    <div className="w-16 h-16 bg-primary/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="h-6 w-6 text-primary-foreground ml-1" />
                    </div>
                    <span className="absolute bottom-2 right-2 text-xs bg-black/70 text-white px-2 py-1 rounded">
                      {video.duration}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground mb-2">{video.title}</h3>
                    <p className="text-sm text-muted-foreground">{video.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                <Mic className="h-5 w-5 text-foreground" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Podcasts</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {podcasts.map((podcast) => (
                <div
                  key={podcast.id}
                  className="bg-background border border-border rounded-lg p-6 hover:border-accent transition-colors group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center shrink-0">
                      <Podcast className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{podcast.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{podcast.description}</p>
                      <span className="text-xs bg-secondary px-2 py-1 rounded text-muted-foreground">
                        {podcast.episodes} episodes
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                <FileText className="h-5 w-5 text-foreground" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Resources</h2>
            </div>

            <div className="bg-secondary/30 rounded-lg p-8 text-center">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Coming Soon</h3>
              <p className="text-muted-foreground text-sm max-w-md mx-auto">
                Downloadable study guides, infographics, and reference materials will be 
                available soon. Subscribe to our newsletter to be notified when new 
                resources are released.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-primary">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-2xl font-bold text-primary-foreground mb-4">
              Subscribe to Our YouTube Channel
            </h2>
            <p className="text-primary-foreground/80 mb-6 max-w-2xl mx-auto">
              Never miss a new video. Subscribe and join our growing community of believers.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-foreground font-semibold rounded hover:bg-accent/90 transition-colors"
            >
              <Youtube className="h-5 w-5" />
              Subscribe on YouTube
            </a>
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
