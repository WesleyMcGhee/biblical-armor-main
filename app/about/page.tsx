"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/lib/components/Header.component";
import { ArrowLeft, Eye, Target, ScrollText, Users } from "lucide-react";

type Tab = "mission" | "faith" | "team";

const teamMembers = [
  {
    name: "Collin Brickhouse",
    role: "Apologist & Co-Founder",
    bio: "Placeholder bio for Collin Brickhouse. Add your biography here.",
    image: null,
  },
  {
    name: "Wesley McGhee",
    role: "Apologist & Co-Founder",
    bio: "Placeholder bio for Wesley McGhee. Add your biography here.",
    image: null,
  },
];

const statementOfFaith = `
We believe in the inspired, infallible, and authoritative Word of God (2 Timothy 3:16-17).

We believe in the Trinity—Father, Son, and Holy Spirit (Matthew 28:19).

We believe in the deity of Jesus Christ, His virgin birth, sinless life, miracles, substitutionary death, bodily resurrection, ascension, and imminent return (John 1:1-14; Isaiah 7:14; Hebrews 4:15; Acts 2:32; 1 Corinthians 15:1-8; Acts 1:11; Revelation 19:11-16).

We believe that man was created in the image of God, but fell through sin, and that all people are sinners by nature and choice (Genesis 1:26-27; Romans 3:23; 5:12).

We believe that the shed blood of Jesus Christ provides the basis for salvation, and that salvation is by grace through faith, not by works (Ephesians 2:8-9; Titus 3:5).

We believe in the present ministry of the Holy Spirit, who indwells believers and empowers them for service and holy living (Romans 8:9-11; 1 Corinthians 12:13; Galatians 5:22-23).

We believe in the resurrection of the dead—both the believer to eternal life and the unbeliever to eternal judgment (John 5:28-29; Revelation 20:11-15).

We believe in the spiritual unity of all believers in Christ (Ephesians 4:1-6).

We believe that the local church is the body of Christ, tasked with making disciples, administering baptism and communion, and equipping saints for ministry (Matthew 28:18-20; 1 Corinthians 11:23-26; Ephesians 4:11-16).

We believe in the pretribulational rapture of the church and the subsequent millennial reign of Christ (1 Thessalonians 4:13-18; Revelation 20:1-6).
`.trim();

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState<Tab>("mission");

  const tabs = [
    { id: "mission" as Tab, label: "Mission & Vision", icon: Target },
    { id: "faith" as Tab, label: "Statement of Faith", icon: ScrollText },
    { id: "team" as Tab, label: "Our Team", icon: Users },
  ];

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
              About Us
            </h1>
            <p className="text-primary-foreground/90 text-lg max-w-2xl">
              Building a ministry dedicated to equipping believers with knowledge and confidence.
            </p>
          </div>
        </section>

        <section className="py-8 bg-secondary/30 border-b border-border">
          <div className="container mx-auto px-4 md:px-6">
            <nav className="flex flex-wrap gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-background text-muted-foreground hover:text-foreground hover:bg-background/80"
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            {activeTab === "mission" && (
              <div className="max-w-3xl mx-auto">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                    <Eye className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                    Our Vision
                  </h2>
                </div>
                <div className="bg-background border border-border rounded-lg p-8 mb-12">
                  <p className="text-lg text-foreground leading-relaxed">
                    To see students and student pastors clothed in the full armor of God, boldly advancing the Gospel in a skeptical world and discipling the next generation to stand for Christ with conviction and compassion.
                  </p>
                </div>

                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                    <Target className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                    Our Mission
                  </h2>
                </div>
                <div className="bg-background border border-border rounded-lg p-8">
                  <p className="text-lg text-foreground leading-relaxed">
                    Our mission is to strengthen the church by equipping students to articulate and defend the Christian faith with clarity and conviction, while empowering student pastors with robust apologetic training and teaching tools to effectively shepherd and disciple their ministries.
                  </p>
                </div>
              </div>
            )}

            {activeTab === "faith" && (
              <div className="max-w-3xl mx-auto">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                    <ScrollText className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                    Statement of Faith
                  </h2>
                </div>
                <div className="bg-background border border-border rounded-lg p-8">
                  <div className="prose prose-neutral max-w-none">
                    {statementOfFaith.split("\n\n").map((paragraph, index) => (
                      <p key={index} className="text-muted-foreground mb-4 last:mb-0">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "team" && (
              <div className="max-w-3xl mx-auto">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                    <Users className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                    Meet Our Team
                  </h2>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  {teamMembers.map((member) => (
                    <div
                      key={member.name}
                      className="bg-background border border-border rounded-lg overflow-hidden"
                    >
                      <div className="aspect-square bg-muted flex items-center justify-center">
                        {member.image ? (
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-center">
                            <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                              <span className="text-3xl font-bold text-primary">
                                {member.name.split(" ").map((n) => n[0]).join("")}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground">Add photo</p>
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-foreground mb-1">
                          {member.name}
                        </h3>
                        <p className="text-sm text-primary font-medium mb-4">
                          {member.role}
                        </p>
                        <p className="text-muted-foreground text-sm">
                          {member.bio}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
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
