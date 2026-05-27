import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, BookOpen, Youtube, Globe } from "lucide-react";

const resources = [
  {
    category: "Learning",
    icon: BookOpen,
    links: [
      { name: "Investopedia", url: "https://www.investopedia.com/", description: "Financial education encyclopedia" },
      { name: "Khan Academy Finance", url: "https://www.khanacademy.org/economics-finance-domain", description: "Free courses on investing basics" },
    ],
  },
  {
    category: "Brokerages",
    icon: Globe,
    links: [
      { name: "Fidelity", url: "https://www.fidelity.com/", description: "Zero-fee index funds, great research" },
      { name: "Vanguard", url: "https://www.vanguard.com/", description: "Pioneer of low-cost index investing" },
      { name: "Schwab", url: "https://www.schwab.com/", description: "Excellent all-around broker" },
    ],
  },
  {
    category: "Videos",
    icon: Youtube,
    links: [
      { name: "The Plain Bagel", url: "https://www.youtube.com/@ThePlainBagel", description: "Clear explanations of investing concepts" },
      { name: "Two Cents (PBS)", url: "https://www.youtube.com/@TwoCentsPBS", description: "Personal finance made simple" },
    ],
  },
];

export function Resources() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {resources.map((category) => (
        <Card key={category.category} className="border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-medium flex items-center gap-2">
              <category.icon className="h-4 w-4 text-muted-foreground" />
              {category.category}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {category.links.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-foreground text-sm">{link.name}</span>
                  <ExternalLink className="h-3 w-3 text-muted-foreground group-hover:text-foreground transition-colors" />
                </div>
                <p className="text-xs text-muted-foreground mt-1">{link.description}</p>
              </a>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
