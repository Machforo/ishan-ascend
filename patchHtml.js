const fs = require('fs');

const fixContent = (file, oldText, newText) => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes(oldText)) {
      content = content.replace(oldText, newText);
      fs.writeFileSync(file, content);
      console.log('Fixed', file);
    }
  }
};

// Sports.tsx
fixContent(
  'src/pages/Sports.tsx',
  '<p className="text-foreground/70 leading-relaxed whitespace-pre-wrap">\n              {content || "IIMT promotes physical fitness and sportsmanship through a comprehensive sports program. The campus features facilities for cricket, basketball, badminton, volleyball, table tennis, and athletics. The annual sports meet is a highlight of the academic calendar, bringing together students from all departments in a spirit of healthy competition."}\n            </p>',
  `{content ? (
              <div 
                className="text-foreground/70 leading-relaxed [&>p]:mb-4" 
                dangerouslySetInnerHTML={{ __html: content }} 
              />
            ) : (
              <p className="text-foreground/70 leading-relaxed whitespace-pre-wrap">
                IIMT promotes physical fitness and sportsmanship through a comprehensive sports program. The campus features facilities for cricket, basketball, badminton, volleyball, table tennis, and athletics. The annual sports meet is a highlight of the academic calendar, bringing together students from all departments in a spirit of healthy competition.
              </p>
            )}`
);

// ITLab.tsx
fixContent(
  'src/pages/ITLab.tsx',
  '<p className="text-foreground/70 leading-relaxed whitespace-pre-wrap">{content}</p>',
  '<div className="text-foreground/70 leading-relaxed [&>p]:mb-4" dangerouslySetInnerHTML={{ __html: content }} />'
);

// Hostel.tsx
fixContent(
  'src/pages/Hostel.tsx',
  '<p className="text-foreground/70 leading-relaxed whitespace-pre-wrap">\n              {content || "IIMT provides comfortable hostel accommodation for both boys and girls in separate residential blocks located within 200 metres of the main campus. The hostel offers a home-away-from-home experience with furnished rooms, nutritious mess meals, and 24/7 security — allowing students to focus on their academics in a safe environment."}\n            </p>',
  `{content ? (
              <div 
                className="text-foreground/70 leading-relaxed [&>p]:mb-4" 
                dangerouslySetInnerHTML={{ __html: content }} 
              />
            ) : (
              <p className="text-foreground/70 leading-relaxed whitespace-pre-wrap">
                IIMT provides comfortable hostel accommodation for both boys and girls in separate residential blocks located within 200 metres of the main campus. The hostel offers a home-away-from-home experience with furnished rooms, nutritious mess meals, and 24/7 security — allowing students to focus on their academics in a safe environment.
              </p>
            )}`
);

// Library.tsx
fixContent(
  'src/pages/Library.tsx',
  '<p className="text-foreground/70 leading-relaxed whitespace-pre-wrap">\n              {content || "The IIMT Central Library is a hub of academic resources and quiet study spaces. It houses an extensive collection of over 15,000 text and reference books covering Management, Commerce, IT, Law, and general reading. We maintain active subscriptions to leading national and international journals, periodicals, and magazines."}\n            </p>',
  `{content ? (
              <div 
                className="text-foreground/70 leading-relaxed [&>p]:mb-4" 
                dangerouslySetInnerHTML={{ __html: content }} 
              />
            ) : (
              <p className="text-foreground/70 leading-relaxed whitespace-pre-wrap">
                The IIMT Central Library is a hub of academic resources and quiet study spaces. It houses an extensive collection of over 15,000 text and reference books covering Management, Commerce, IT, Law, and general reading. We maintain active subscriptions to leading national and international journals, periodicals, and magazines.
              </p>
            )}`
);

// Auditorium.tsx
fixContent(
  'src/pages/Auditorium.tsx',
  '<p className="text-foreground/70 leading-relaxed whitespace-pre-wrap">\n              {content || "The IIMT Auditorium is a state-of-the-art facility designed to host academic, cultural, and corporate events. It serves as the primary venue for national seminars, guest lectures by industry experts, alumni meets, and our grand annual cultural festival, Kshitiz."}\n            </p>',
  `{content ? (
              <div 
                className="text-foreground/70 leading-relaxed [&>p]:mb-4" 
                dangerouslySetInnerHTML={{ __html: content }} 
              />
            ) : (
              <p className="text-foreground/70 leading-relaxed whitespace-pre-wrap">
                The IIMT Auditorium is a state-of-the-art facility designed to host academic, cultural, and corporate events. It serves as the primary venue for national seminars, guest lectures by industry experts, alumni meets, and our grand annual cultural festival, Kshitiz.
              </p>
            )}`
);

// CulturalActivities.tsx
fixContent(
  'src/pages/CulturalActivities.tsx',
  '<p className="text-foreground/70 leading-relaxed whitespace-pre-wrap">\n              {content || "IIMT believes in holistic development. Our annual cultural fest, Kshitiz, and various year-round events provide students with a platform to showcase their talents in music, dance, drama, and fine arts. These activities foster creativity, teamwork, and cultural appreciation among students from diverse backgrounds."}\n            </p>',
  `{content ? (
              <div 
                className="text-foreground/70 leading-relaxed [&>p]:mb-4" 
                dangerouslySetInnerHTML={{ __html: content }} 
              />
            ) : (
              <p className="text-foreground/70 leading-relaxed whitespace-pre-wrap">
                IIMT believes in holistic development. Our annual cultural fest, Kshitiz, and various year-round events provide students with a platform to showcase their talents in music, dance, drama, and fine arts. These activities foster creativity, teamwork, and cultural appreciation among students from diverse backgrounds.
              </p>
            )}`
);
