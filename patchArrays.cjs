const fs = require('fs');

const files = [
  'src/pages/DebatesGD.tsx',
  'src/pages/IndustrialVisits.tsx',
  'src/pages/GuestLectures.tsx'
];

files.forEach(f => {
  if (fs.existsSync(f)) {
    let content = fs.readFileSync(f, 'utf8');
    
    // For DebatesGD.tsx
    content = content.replace(
      'points.map((p: string, i: number) => (\n                    <li key={i} className="flex items-center gap-2 text-sm text-foreground/70"><Users className="w-4 h-4 text-gold" /> {p}</li>\n                  ))',
      'points.map((p: any, i: number) => {\n                    const text = typeof p === "string" ? p : p.text || "";\n                    return <li key={i} className="flex items-center gap-2 text-sm text-foreground/70"><Users className="w-4 h-4 text-gold" /> {text}</li>;\n                  })'
    );
    
    // For IndustrialVisits.tsx (whyVisitsMatter array)
    content = content.replace(
      'whyMatters.map((w: string, i: number) => (\n                    <li key={i} className="flex items-center gap-3 text-foreground/80">\n                      <div className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" /> {w}\n                    </li>\n                  ))',
      'whyMatters.map((w: any, i: number) => {\n                    const text = typeof w === "string" ? w : w.text || "";\n                    return <li key={i} className="flex items-center gap-3 text-foreground/80">\n                      <div className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" /> {text}\n                    </li>;\n                  })'
    );

    // Let's also do generic replacements for mapping page data
    content = content.replace('title="Debates & Group Discussions"', 'title={debates?.pageTitle || "Debates & Group Discussions"}');
    content = content.replace('title="Industrial Visits"', 'title={visitsData?.pageTitle || "Industrial Visits"}');
    content = content.replace('title="Guest Lectures & Seminars"', 'title={guestLectures?.pageTitle || "Guest Lectures & Seminars"}');

    fs.writeFileSync(f, content);
  }
});

console.log("Patched array mappings");
